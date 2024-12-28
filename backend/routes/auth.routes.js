import express from 'express';
import { Signin, SignUp, Google } from '../controller/auth.controller.js';

const router = express.Router();

router.post('/signup', SignUp)
router.post('/signin', Signin)
router.post('/google', Google)


export default router