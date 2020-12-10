const User = require('../../models/User.js');
const fetch = require("node-fetch");
class game{ 
    constructor(room, sockets, player1, player2){
        this.room = room;
        this.sock = sockets;
        this.p1 = player1;
        this.p2 = player2;

        this.boardWidth = 1280; // The board's width
        this.boardHeight = 800; // The board's height

        this.completed = false; // Used to know when the game has been completed
        this.physics = false; // Used for deactivating the physiscs of the game when needed

        this.puck = { // Generating the puck
            position: {x:this.boardWidth/2, y:this.boardHeight/2},
            velocity: {x:0, y:0},
            radius: 25
        }

        // Players' initialization
        this.p1.radius = this.p2.radius = 50; // Players' paddles
        this.p1.score = this.p2.score = 0; // Initialising their scores to 0
        // Initializing their positions on the board
        this.p1.position = {x:this.boardWidth*0.25, y:this.boardHeight/2};
        this.p2.position = {x:this.boardWidth*0.75, y:this.boardHeight/2};
        // Passing both the players to the main update callback
        this.onUpdate(this.p1);
        this.onUpdate(this.p2);

        this.sock.sockets.in(this.room).emit("Start Match"); // Signalling the start of a game to the players

        // Sending information of the other player to both the players
        this.p1.emit("infoUpdate", {object:"contender", name:this.p2.name});
        this.p2.emit("infoUpdate", {object:"contender", name:this.p1.name});
        this.p1.emit("message", {message:"Match making complete. You will now be playing against " + this.p2.name + "."});
        this.p2.emit("message", {message:"Match making complete. You will now be playing against " + this.p1.name + "."});
        this.p1.side = 0;
        this.p2.side = 1;
        this.p2.emit("infoUpdate", {object:"user", side:1});

        // Start sequence of the game
        this.multiNotification(["First to score 5 goals wins", "Good luck!!", "Game starting in 3....", "2....", "1....", "Go!"], 1000);
        this.activatePhysics(6000);
    }

    onUpdate(socket){ // A callback for player update
        socket.on("update", (data) => {
            if(socket.position) socket.prevPosition = socket.position;
            else socket.prevPosition = data.position;
            socket.position = data.position;
            // Broadcasting to all the players
            socket.broadcast.to(socket.roomName).emit("infoUpdate", {object:"contender", position:data.position, time:new Date().getTime()});
        });
    }

    notification(message, duration){ // Used for sending a single notification to both the players in the room
        this.sock.sockets.in(this.room).emit("notification", {message:message, duration:duration});
    }

    multiNotification(messages, duration){ // Used for sending multiple notifications to both the players in the room
        for(var i = 0; i < messages.length; i++) setTimeout(this.notification.bind(this), i*duration, messages[i], duration);
    }

    activatePhysics(delay){ // For activating the game's physics
        setTimeout(function(){
            setInterval(this.update.bind(this), 1000/120); // For updating the game at 120 hertz
            this.physics = true; 
        }.bind(this), delay);
    }

    deactivatePhysics(){ // For deactivating the game's physics
        this.physics = false;
    }

    euclideanDistance(point1, point2){ // Returns the euclidean distance between two points
        return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
    }

    unitVector(obj1, obj2){ // Returns the unit vector from obj1 to obj2
        var vector = {x: obj2.position.x - obj1.position.x, y: obj2.position.y - obj1.position.y}; // Creating a vector between the given objects
        var distance = this.euclideanDistance(obj1.position, obj2.position);
        vector.x /= distance;
        vector.y /= distance;
        return vector; 
    }

    puckNotInGoalLevel(){ // Returns true if the puck is not in the goal's level
        return this.puck.position.y < this.boardHeight*0.35 || this.puck.position.y > this.boardHeight*0.65;
    }

    puckBounce(){ // Used to bounce the puck off the walls of the board
        if((this.puck.position.x - this.puck.radius < 0) || (this.puck.position.x + this.puck.radius > this.boardWidth))
            if(this.puckNotInGoalLevel()) this.puck.velocity.x *= -1;
        if((this.puck.position.y - this.puck.radius < 0) || (this.puck.position.y + this.puck.radius > this.boardHeight))
            this.puck.velocity.y *= -1;
    }

    constrain(value, minimum, maximum){ // Used to constrain the value between minimum and maximum
        return Math.min(Math.max(value, minimum), maximum);
    }

    resetPuck(){ // Resetting the puck's position
        this.puck.velocity = {x:0, y:0};
        this.puck.position = {x:this.boardWidth/2, y:this.boardHeight/2};
    }

    emitPuckInfo(){ // To broadcast the puck's info to both the players in the room
        this.sock.sockets.in(this.room).emit("infoUpdate", 
            {object:"puck", position:this.puck.position, velocity:this.puck.velocity, time:new Date().getTime()});
    }

    goalCheck(){ // To check if a goal was scored
        if((this.puck.position.x < 0) || (this.puck.position.x + this.puck.radius > this.boardWidth)){ // Meaning a goal has been scored
            var scorer;
            if(this.puck.position.x <= 0){ // Player 2 has scored a goal
                scorer = 1;
                this.p1.score++;
            }
            else{ // Player 1 has scored a goal
                scorer = 0;
                this.p2.score++;
            }
            this.deactivatePhysics(); // Deactivating the game's physics for sometime
            this.sock.sockets.in(this.room).emit("goalScored", {side:scorer});
            this.resetPuck();
            this.emitPuckInfo();

            // Checking if any player has won the game
            if(this.p1.score >= 5 || this.p2.score >= 5){
                this.notification("Game Over", -1);
                let winner = scorer?(this.p2.name) : (this.p1.name);

                 fetch("http://localhost:5000/users/leaderboard", { 
                    method: 'POST', 
                    headers: { 
                      'Content-type': 'application/json'
                    }, 
                    body: JSON.stringify({ "name" : winner}),
                }).then( () => {}).catch(err => console.log(err)); 

                this.notification(scorer?(this.p2.name + " wins the game!!") : (this.p1.name + " wins the game!!"), -1);
                this.completed = true;
            }
            else{
                this.multiNotification(
                    [scorer?(this.p2.name + " gets a point!!") : (this.p1.name + " gets a point!!"), "Game Resuming in 3...", "2...", "1...", "Go!"], 
                    500);
                this.activatePhysics(2500);
            }
        }
    }

    applyFriction(obj, fraction){ // Applying friction to the obj by multiplying its velocity by the given fraction
        obj.velocity.x *= fraction;
        obj.velocity.y *= fraction;
        // If the object's speed in either direction is less than 0.001, it is brought to a standstill
        if(Math.abs(obj.velocity.x) < 0.001) obj.velocity.x = 0;
        if(Math.abs(obj.velocity.y) < 0.001) obj.velocity.y = 0;
    }

    update(){ // Main function that updates the game state
        if(this.physics){
            var puckVelocity = {x:0, y:0}; // Used to store changes to puck velocity if needed
            var I1, I2; // Impulses from the paddles of player 1 and 2 respectively
            var speed;
            var distance1 = this.euclideanDistance(this.p1.position, this.puck.position);
            var distance2 = this.euclideanDistance(this.p2.position, this.puck.position);
            if(distance1 < this.p1.radius + this.puck.radius){ // Player 1 has hit the puck
                speed = this.euclideanDistance(this.p1.prevPosition, this.p1.position); // Speed with which the user hit the puck
                I1 = this.unitVector(this.p1, this.puck); // For calculating the direction in which the puck should move after being hit
                I1.x *= Math.min(1.75, 1 + Math.pow(speed, 1/5)); // To limit the speed to max of 1.75
                I1.y *= Math.min(1.75, 1 + Math.pow(speed, 1/5)); // To limit the speed to max of 1.75
                // Adding changes to the puckVelocity variable
                puckVelocity.x += I1.x;
                puckVelocity.y += I1.y;
            }
            if(distance2 < this.p2.radius + this.puck.radius){ // Player 2 has hit the puck
                speed = this.euclideanDistance(this.p2.prevPosition, this.p2.position); // Speed with which the user hit the puck
                I2 = this.unitVector(this.p2, this.puck); // For calculating the direction in which the puck should move after being hit
                I2.x *= Math.min(1.75, 1 + Math.pow(speed, 1/5)); // To limit the speed to max of 1.75
                I2.y *= Math.min(1.75, 1 + Math.pow(speed, 1/5)); // To limit the speed to max of 1.75
                // Adding changes to the puckVelocity variable
                puckVelocity.x += I2.x;
                puckVelocity.y += I2.y;
            }
            if(I1 || I2){ // Adding changes to the puck's velocity if a hit has occured
                this.puck.velocity.x += puckVelocity.x;
                this.puck.velocity.x += puckVelocity.x;
            }
            // Moving the puck according to its velocity
            this.puck.position.x += this.puck.velocity.x; 
            this.puck.position.y += this.puck.velocity.y; 
            this.puckBounce(); // Bouncing the puck off the walls of the board if necessary
            if(this.puckNotInGoalLevel()) // Constraining the x position of the puck within the board if it is not in goal level
                this.puck.position.x = this.constrain(this.puck.position.x, this.puck.radius, this.boardWidth - this.puck.radius);
            this.goalCheck(); // Checking if a goal has been scored
            this.puck.position.y = this.constrain(this.puck.position.y, this.puck.radius, this.boardHeight - this.puck.radius); // Constraining y position of the puck within the board

            this.applyFriction(this.puck, 0.9950); // Applying friction to the puck
        }
        else this.resetPuck();
        this.emitPuckInfo();
    }
}

module.exports = game; // Exporting this class as a module