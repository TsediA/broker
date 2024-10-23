// socket.js
const socketIo = require('socket.io');

let io; // Declare a variable to hold the Socket.IO instance

// Function to initialize the Socket.IO server
const initSocket = (server) => {
    io = socketIo(server, {
        cors: {
            origin: '*', // Allow all origins (adjust as needed)
            methods: ['GET', 'POST'],
        },
    });

    // Handle socket events
    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        socket.on('joinRoom', (userId) => {
            socket.join(userId); // Join a room based on user ID
            console.log(`User ${userId} has joined the room`);
        });

        socket.on('sendMessage', async(data) => {
            const { senderId, receiverId, content } = data;

            // Save the message to the database (assuming you have a Message model)
            const message = new Message({ senderId, receiverId, content });
            await message.save();

            // Emit the message to the receiver
            io.to(receiverId).emit('receiveMessage', message);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
};

// Function to get the Socket.IO instance
const getSocket = () => {
    if (!io) {
        throw new Error('Socket.io not initialized. Please call initSocket(server) first.');
    }
    return io;
};

// Export the functions
module.exports = { initSocket, getSocket };