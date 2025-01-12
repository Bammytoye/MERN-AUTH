import express from 'express';
import { test, updateUser, updateDelete } from '../controller/user.controller.js';
import { verifyToken } from '../utilis/vertifyUser.js';

const router = express.Router();

router.get('/', test);
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, updateDelete)

export default router;