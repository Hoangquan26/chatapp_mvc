const roomModel = require('../models/room.model');

const initEvents = (io) => {
    io.of('/rooms').on('connection', (roomSocket) => {
        console.log('A user connected to rooms namespace');

        roomSocket.on('createRoom', ({title}) => {
            console.log('Creating room:', title);
            roomModel.findOne({title: new RegExp(`^${title}$`, 'i')}).then((existingRoom) => {
                if (existingRoom) {
                    roomSocket.emit('updateRoomsList', { error: 'Room already exists' });
                } else {
                    const newRoom = new roomModel({ title: title });
                    newRoom.save().then(() => {
                        roomSocket.emit('updateRoomsList', newRoom);
                        roomSocket.broadcast.emit('updateRoomsList', newRoom);
                    }).catch((err) => {
                        roomSocket.emit('updateRoomsList', { error: 'Error creating room' });
                    });
                }
            })
        });

        roomSocket.on('disconnect', () => {
            console.log('A user disconnected from rooms namespace');
        });
    });

    io.of('/chats').on('connection', (chatSocket) => {
        console.log('A user connected to chats namespace');

    })
}

const initSocket = (expressApp) => {
    const server = require('http').createServer(expressApp);
    const socket = require('socket.io')
    const io = socket(server);
    // io.set('transports', ['websocket']);
    initEvents(io);
    return server;
}

module.exports = initSocket;
// This module initializes a Socket.IO server and sets up event listeners for user connections and disconnections.