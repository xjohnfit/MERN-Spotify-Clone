import { clerkClient } from "@clerk/express";

export const protectRoute = async (req, res, next) => {
    
    const userId = req.auth.userId;
    
    if(!userId) {
        return res.status(401).json({message: "Unauthorized"});
    }

    next();
};

export const requireAdmin = async (req, res, next) => {
    try {
        const currentUser = await clerkClient.users.getUser(req.auth.userId);
        const isAdmin = process.env.ADMIN_EMAIL === currentUser.emailAddresses.emailAddress;

        if(!isAdmin) {
            return res.status(403).json({message: "Forbidden"});
        }

        next();
    } catch (error) {
        next(error);
    }
};