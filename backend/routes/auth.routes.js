import express from 'express';
import { Signin, SignUp } from '../controller/auth.controller.js';

const router = express.Router();

router.post('/signup', SignUp)
router.post('/signin', Signin)
//router.post('/google', Signin)


export default router