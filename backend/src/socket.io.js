import { Server } from 'socket.io';
import Message from './models/messageModel.js';

export const initializeSocketIO = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: process.env.CLIENT_URL,
            credentials: true,
        },
    });

    const userSockets = new Map(); // Store user sockets by userId { userId: socketId }
    const userActivities = new Map(); // Store user activities by userId { userId: activity }

    io.on('connection', (socket) => {
        socket.on('userConnected', (userId) => {
            // Store the socket ID for the user
            userSockets.set(userId, socket.id);
            userActivities.set(userId, 'idle'); // Initialize user activity as idle

            io.emit('userConnected', userId); // Notify all clients that a new user connected

            socket.emit('onlineUsers', Array.from(userSockets.keys())); // Send the list of online users to the newly connected user

            io.emit('userActivity', Array.from(userActivities.entries())); // Broadcast the user activities to all clients
        });

        socket.on('updateActivity', (userId, activity) => {
            console.log('Activity updated:', userId, activity);
            userActivities.set(userId, activity); // Update the user's activity
            io.emit('userActivity', Array.from(userActivities.entries())); // Broadcast the user activities to all clients
        });

        socket.on('sendMessage', async (message) => {
            try {
                const {senderId, receiverId, content } = message; // Destructure the message object to extract properties
                const newMessage = await Message.create({
                    senderId,
                    receiverId,
                    content,
                }); // Save the message to the database

                const receiverSocketId = userSockets.get(receiverId); // Get the socket ID of the receiver

                if(receiverSocketId) {
                    io.to(receiverSocketId).emit('messageReceived', newMessage); // Emit the message to the receiver
                } // If the receiver is online, emit the message to them

                socket.emit('messageReceived', newMessage); // Emit the message to all clients
            } catch (error) {
                console.error('Error saving message:', error);
                socket.emit('error', 'Error saving message'); // Emit an error event to the client
            }
        });

        socket.on('disconnect', () => {

            let disconnectedUserId = null; // Initialize a variable to store the disconnected user ID

            // Remove the user from the online users list
            for (const [userId, socketId] of userSockets.entries()) {
                if (socketId === socket.id) {
                    disconnectedUserId = userId; // Store the disconnected user ID
                    userSockets.delete(userId); // Remove the user from the online users list
                    userActivities.delete(userId); // Remove the user's activity
                    break;
                }
            }
            if (disconnectedUserId) {
                io.emit('userDisconnected', disconnectedUserId); 
            }
        });
    });
};