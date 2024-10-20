const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });

    socket.on('offer', (data) => {
        console.log('Received offer from:', socket.id);
        socket.broadcast.emit('offer', data);
    });

    socket.on('answer', (data) => {
        console.log('Received answer from:', socket.id);
        socket.broadcast.emit('answer', data);
    });

    socket.on('ice-candidate', (data) => {
        console.log('Received ICE candidate from:', socket.id);
        socket.broadcast.emit('ice-candidate', data);
    });
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
