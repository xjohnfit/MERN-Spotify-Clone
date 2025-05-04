import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
    {
        senderId: { type: String, required: true }, // Clerk user ID
        receiverId: { type: String, required: true }, // Clerk user ID
        content: { type: String, required: true },
    },
    { timestamps: true }
);

const Message = mongoose.model('Message', messageSchema);

export default Message;
