import User from "../models/userModel.js"

export const authCallback = async (req, res, next) => {
    try {
        const { id, firstName, lastName, imageUrl } = req.body;

        //Check if the user already exists in the database
        const user = await User.findOne({ clerkId: id });

        if (!user) {
            //If not, create a new user
            const newUser = await User.create({
                clerkId: id,
                fullName: `${firstName || ""} ${lastName || ""}`.trim(),
                imageUrl,
            });
            return res.status(201).json(newUser);
        }
        res.status(200).json({ message: 'User created successfully', user });
    } catch (error) {
        next(error);
    }
};
