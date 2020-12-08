const socketio = require("socket.io");  
var express = require('express');
var app = express();

const Game = require("./Games/Air_Hockey/game");   // game class
const router = require("./routes/gameRouter")
var PORT = 2000;

const server = app.listen(PORT, () => console.log(`Game server started on port ${PORT}`));
var io = socketio(server);

app.set('view engine', 'ejs');
app.use('/media', express.static('media'));
app.use('/', router);

var room = 1; // This is the current room number that gets incremented each time a new room is created
var users = {}; // To store all connected users
var userQueue = []; // Stores users that are currently waiting for an opponent. If queue length is more than 2, a new match is created
var ongoingGames = [];

function createMatch(){
    var roomName = "Room" + room;
    room++;
    userQueue[0].roomName = userQueue[1].roomName = roomName; 
    userQueue[0].join(roomName);
    userQueue[1].join(roomName);
    var game = new Game(roomName, io, userQueue[0], userQueue[1]); // Creating new game instance
    ongoingGames.push(game);	
	userQueue.splice(0, 2); // Clearing those two users from the queue
}

function cleanGames(){ // To delete games that have been completed
	for(var i = 0; i < ongoingGames.length; ++i) if(ongoingGames[i].completed) ongoingGames.splice(i, 1);
}

var onJoined = (socket) => {	
	socket.on("join", (data) => {	
		socket.name = data.name; // Storing socket's username on the socket for future use
		users[data.name] = socket.name; // Storing the user in the database for future reference
		userQueue.push(socket); // Add user to user queue
		socket.emit("message", {message:"Matchmaking in process......."}); 
		socket.emit("joinSuccess"); // Telling the client that the registration went through
		if(userQueue.length >= 2) createMatch(); // Create new game if there are more than 2 players in the queue
	});
};

var onDisconnect = (socket) => {
	socket.on("disconnect", (data) => { // Listen for disconnection events
		delete users[socket.name];      // Delete disconnected user from the users list
		delete userQueue[socket.name];  // Delete disconnected user from the queue
	});
};

io.sockets.on("connection", (socket) => {	
	onJoined(socket);
	onDisconnect(socket);
});

setInterval(cleanGames, 1000); // A loop to clear empty games every second