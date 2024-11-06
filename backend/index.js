import express from 'express';
import mongoose from 'mongoose'; 
import dotenv from 'dotenv';


dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URI, {})
.then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.log('Error connecting to MongoDB', error);
})


app.listen(4010, () => {
    console.log('Server is running on port 4010');
})