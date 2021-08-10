const express = require("express");
const http = require("http");
const socket = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socket(server, {
    pingTimeout: 1000,
    pingInterval: 5000
});

const users = [{}];           // Returns the users from a room
const socketToRoom = {};    // Returns the room of a user

const initialPosition = {};     // Returns the initial position of a user

io.on('connection', socket => {

    socket.on('join room', (roomID, me) => {

        console.log(`User connected: ${socket.id}:${me} to room: ${roomID}`);

        // If room exists update
        if(users[roomID]){
            users[roomID].push({
                id: socket.id,
                name: me
            });
        } // If not create
        else {
            users[roomID] = [{
                id: socket.id,
                name: me
            }];
        }

        socketToRoom[socket.id] = roomID;

        initialPosition[socket.id] = {
            x: 0,
            y: 0
        }

        console.log(initialPosition);

        // Sends all users already in the room
        const usersInThisRoom = users[roomID].filter(user => user.id !== socket.id);
        socket.emit("all users", usersInThisRoom, initialPosition);
    
        // Redirecting positions from clients in the room
        socket.on('internal position incoming', (payload) => {
            const usersInThisRoom = users[roomID].filter(user => user.id !== socket.id);
            usersInThisRoom.forEach(user => {
                io.to(user.id).emit('external position incoming', (payload));
            });

            initialPosition[payload.id] = {
                x: payload.position.x,
                y: payload.position.y
            }

        });

        // Sending Video 
        socket.on("sending signal", payload => {
            io.to(payload.userToSignal).emit('user-joined', { signal: payload.signal, callerID: payload.callerID, name: payload.name});
        });

        // Returning Video
        socket.on("returning signal", payload => {
            io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
        });

        socket.on('disconnect', () => {

            // Update the users in the room
            const roomID = socketToRoom[socket.id];
            let room = users[roomID];
            if (room) {
                room = room.filter(user => user.id !== socket.id);
                users[roomID] = room;
            }

            // Erase initial position ....
    
            // Send that someone disconnected
            const usersInThisRoom = users[roomID].filter(user => user.id !== socket.id);
            usersInThisRoom.forEach(user => {
                io.to(user.id).emit('user-left', socket.id);
            });
    
            console.log(`User disconnected: ${socket.id}`);
        })

    })

});

server.listen(process.env.PORT || 8000, () => console.log('server is running on port 8000'));