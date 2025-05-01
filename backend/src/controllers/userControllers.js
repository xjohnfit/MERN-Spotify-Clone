import Message from "../models/messageModel.js";
import User from "../models/userModel.js";

export const getAllUsers = async (req, res, next) => {
    try {
        const currentUserId = req.auth.userId;
        const user = await User.find().select("-password").sort({ createdAt: -1 });
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

export const getMessages = async (req, res, next) => {
    try {
        const myId = req.auth.userId;
        const { userId } = req.params;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userId },
                { senderId: userId, receiverId: myId },
            ],
        }).sort({ createdAt: 1 });

        res.status(200).json(messages);

    } catch (error) {
        next(error);
    }
};