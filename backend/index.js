import express from 'express';

const app = express();

app.listen(4010, () => {
    console.log('Server is running on port 4010');
})