import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';

export const SignUp = async (req, res, next) => {
    const { firstname, lastname, username, email, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = User({ firstname, lastname, username, email, password: hashedPassword});
    try {
        await newUser.save()
        res.status(201).json({message: 'User created successfully'})
    } catch (error) {
        next(error);
    }
}