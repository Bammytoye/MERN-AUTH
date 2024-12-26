import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utilis/error.js";
import jwt from 'jsonwebtoken'

export const SignUp = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = bcryptjs.hashSync(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        next(error);
    }
};


export const Signin = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const realUser = await User.findOne({ email });
        if (!realUser) return next(errorHandler(401, 'User not found'))

        const isPasswordValid = bcryptjs.compareSync(password, realUser.password);
        if (!isPasswordValid) return next(errorHandler(401, 'Wrong Password - Please try again!!!'))
        
        const token = jwt.sign({ id: realUser._id}, process.env.JWT_SECRET, ) 
        const { password: hashedPassword, ...rest } = realUser._doc;
        const expireDate = new Date(Date.now() + 3600000); //1 hour
        res
            .cookie('access_token', token, { httpOnly: true, expires: expireDate})
            .status(200)
            .json(rest)
    } catch (error) {
        next(error); 
    }
}