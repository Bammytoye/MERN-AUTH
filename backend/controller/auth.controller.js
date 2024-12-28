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

export const Google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password: hashedPassword, ...rest } = user._doc;
            const expireDate = new Date(Date.now() + 3600000); // 1 hour
            
            // Set the cookie
            res.cookie('access_token', token, { httpOnly: true, expires: expireDate }).status(200).json(rest);
        } else {
            // Generate a username
            const baseUsername = req.body.name ? req.body.name.toLowerCase().replace(/\s+/g, '') : 'user';
            const randomSuffix = Math.floor(Math.random() * 10000); // Generate a random number between 0 and 9999
            const username = `${baseUsername}_${randomSuffix}`; // Create a username with a random numeric suffix

            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8); 
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser  = new User({ 
                username, // Use the generated username
                email: req.body.email, 
                password: hashedPassword,
                profilePicture: req.body.photo, 
            }); 
            await newUser .save();
            const token = jwt.sign({ id: newUser ._id }, process.env.JWT_SECRET);
            const { password: hashedPassword2, ...rest } = newUser ._doc;
            const expireDate = new Date(Date.now() + 3600000);
            res.cookie('access_token', token, { httpOnly: true, expires: expireDate }).status(200).json(rest);
        }
    } catch (error) {
        next(error);
    }
};