import User from "../models/user.model.js";
import { errorHandler } from "../utilis/error.js";
import bcryptjs from "bcryptjs";

export const test = (req, res) => {
    res.json({
        message: "Hello World, API is working",
    });
};

export const updateUser = async (req, res, next) => {
    try {
        // Check if the user is authorized to update
        if (req.user.id !== req.params.id) {
            return next(errorHandler(401, "You can only update your account!"));
        }

        // Handle password hashing if it’s being updated
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 12);
        }

        // Update user
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { 
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    profilePicture: req.body.profilePicture,
                } 
            },
            { new: true } // Return the updated user
        );

        const { password, ...rest } = updatedUser._doc; // Exclude the password
        res.status(200).json(rest);
    } catch (err) {
        next(err); // Handle errors
    }
};