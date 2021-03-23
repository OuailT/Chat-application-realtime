const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const PORT = process.env.PORT || 5000;

//We called a router 
const router = require('./router');
const { disconnect } = require('process');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//Method to run when we have a user connected or disconnected with socket.on 
io.on('connection', (socket) => {

  socket.on('join', ({name , room}, callback)=> {
    const { error, user} = addUser({id: socket.id, name, room});

    if(error) return callback(error);

    socket.join(user.room);

    //telling to the user that he is welcome to the Chat 
    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
    //telling to everyone connected that this user has joined the room
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
    //if the user passes the error we got room
    
  
    callback();
    
});

  // Messages coming from the front-end
    socket.on('sendMessage', (message, callback) => {
       const user = addUser(socket.id);

       io.to(user.room).emit('message',{user: user.name, text: message});

       callback();
    });

    socket.on('disconnect', () => {
    console.log('User Had Left !!!');

})

});

//We Used a router 
app.use(router);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));






