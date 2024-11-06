import express from 'express';
import mongoose from 'mongoose'; 
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'

dotenv.config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {})
.then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.log('Error connecting to MongoDB', error);
})

// middleware to user routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    })
});

app.listen(4010, () => {
    console.log('Server is running on port 4010');
})