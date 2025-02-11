import User from "../models/userModel.js";

export const getAllUsers = async (req, res, next) => {
    try {
        const currentUserId = req.auth.userId;
        const user = await User.find({clerkId: {$ne: currentUserId}}).select("-password").sort({ createdAt: -1 });
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};