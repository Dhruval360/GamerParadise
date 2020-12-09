const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false); // Needed?
mongoose.Promise = global.Promise;
const session = require('express-session');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Connecting to the MongoDB database
mongoose.connect(process.env.MONGO,{useNewUrlParser: true ,useUnifiedTopology: true, useCreateIndex: true})
  .then(() => console.log('Database mongodb connected'))
  .catch(err => console.log(err));

app.use(cors());

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(session({secret: 'secret', resave: true, saveUninitialized: true}));

// Routes
app.use('/users', require('./routes/users.js'));

// Chat start
var users = [];
const addUser = ({ id, name, room}) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();
    const existingUser = users.find((user) => user.room === room && user.name === name);
    if(existingUser) return { error: 'Username is taken'};
    const user = {id, name, room};
    users.push(user);
    return {user};
};
const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
    if (index != -1) return users.splice(index, 1)[0];
};
const getUser = (id) => users.find((user) => user.id === id);
const getUsersInRoom = (room) => users.filter((user) => user.room === room);

const server = app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
const options = {cors:true, origins:"https://example.com"};
const io = require('socket.io')(server, options);


io.on('connection', (socket) => {
  socket.on('join', ({name, room}, callback) => {
      const {error , user} = addUser({id: socket.id, name, room });      
      if(error) return callback(error);      
      socket.emit('message', {user : 'admin', text: `${user.name}, welcome to the room ${user.room}`});
      socket.broadcast.to(user.room).emit('message', {user : 'admin', text: `${user.name}, has joined`});
      socket.join(user.room);
      io.to(user.room).emit('roomData', { room : user.room, users : getUsersInRoom(user.room)})
      callback();
  });

  socket.on('sendMessage', (message, callback)=> {
      const user = getUser(socket.id);
      io.to(user.room).emit('message', { user : user.name, text : message})
      io.to(user.room).emit('roomData', { room : user.room, users : getUsersInRoom(user.room)})
      callback();
  })

  socket.on('disconnect', () => {
      const user = removeUser(socket.id);
      if(user){
          io.to(user.room).emit('message', { user : 'admin', text : `${user.name} has left `})
          io.to(user.room).emit('roomData', { room : user.room, users : getUsersInRoom(user.room)})
      }
  })
})