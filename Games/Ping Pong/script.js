const canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');

//ctx.font ='30px Game';
//ctx.fillText('Player 1', 400, 100);

function update(){ // updating the screen
    //Clearing the screen
    ctx.clearRect(0,0,canvas.width, canvas.height);

    p1.pos_update();
    p2.pos_update();
    puc.pos_update();
    requestAnimationFrame(update);
}

class player{
    constructor(name, x, y){
        this.name = name
        this.score = 0;
        this.x = x; // x,y coordinates of the player
        this.y = y;
        this.speed = 10; // Player speed
        this.width = 100;
        this.height = 25;
        this.l = false; // Move left 
        this.r = false; // Move right
        this.score = 0;
        this.draw_rect();
    }    
    draw_rect(x=this.x,y=this.y,width=this.width,height=this.height){ // Drawing the player
        ctx.fillStyle = 'grey';
        ctx.strokeStyle = '#000000';
        ctx.strokeRect(x, y, width, height);
        ctx.fillRect(x+1, y+1, width-2, height-2);
    }
    pos_update(){
    	if(this.r) this.x += this.speed;
    	else if(this.l) this.x -= this.speed;
        this.x = this.x < 0 ? 0:this.x;
        this.x = this.x + 100 > ctx.canvas.width ? ctx.canvas.width - 100 : this.x; 
        this.draw_rect();
        
        ctx.font = "25px Comic Sans MS";
        ctx.fillStyle = "red";
        ctx.textAlign = "center"; 
        ctx.fillText("Score: " + this.score, canvas.width - 75, this.y - 20); 
    }
}

class puck{
    constructor(radius = 10){
        this.radius = radius;
        this.velocity_x = 5;
        this.velocity_y = 5;
        this.x = canvas.width/2;
        this.y = canvas.height/2;
        this.draw_circle();
    }
    draw_circle(x=this.x,y=this.y,radius=this.radius){ // Drawing the player
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fillStyle = "red";
        ctx.fill();
    }
    reset(){
        this.x = canvas.width/2;
        this.y = canvas.height/2;
        this.velocity_x = -this.velocity_x;
        this.velocity_y = -this.velocity_y;
    }
    pos_update(){
        if(
            (this.x == this.radius) || (this.x + this.radius == canvas.width ) ||
            ((this.y >= p2.y) && (this.y <= p2.y + p2.height) && ((this.x + this.radius == p2.x) || (this.x == p2.x + p2.width + this.radius))) ||
            ((this.y >= p1.y) && (this.y <= p1.y + p1.height) && ((this.x + this.radius == p1.x) || (this.x == p1.x + p1.width + this.radius)))
          )
            this.velocity_x = -this.velocity_x;
        if(
            ((p2.x - this.radius <= this.x) && (this.x <= p2.x + p2.width + this.radius) &&  (this.y == p2.y - this.radius)) ||
            ((p1.x - this.radius <= this.x) && (this.x <= p1.x + p1.width + this.radius) &&  (this.y == p1.y + this.radius + p1.height))
          )    
            this.velocity_y = -this.velocity_y;
        if(this.y <= this.radius){
            p2.score++;
            this.reset();
        }
        if(this.y + this.radius >= canvas.height){
            p1.score++;
            this.reset();
        }
        this.x += this.velocity_x;
        this.y += this.velocity_y; 
        this.draw_circle();
    }
}

let puc = new puck();
let p1 = new player('Player 1', 250, 50);
let p2 = new player("Player 2", 250, 450)

update();

function keyDown(e){
    if(e.key === 'ArrowRight' || e.key === 'Right') p1.r = true;
    if(e.key === 'ArrowLeft' || e.key === 'Left') p1.l = true;
   
    if(e.key === 'a'){
        p2.l = true;
    }
    else if(e.key === 'd'){
        p2.r = true;
    }
}

function keyUp(e){
    if(e.key === 'ArrowRight' || e.key === 'Right') p1.r = false;
    if(e.key === 'ArrowLeft' || e.key === 'Left') p1.l = false;
    
    if(e.key === 'a') p2.l = false;
    if(e.key === 'd') p2.r = false;
}

document.addEventListener("keydown", keyDown, false); // Keyboard input
document.addEventListener("keyup", keyUp, false); // Keyboard input



