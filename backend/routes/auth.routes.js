import express from 'express';
import { Signin, SignUp, Google, SignOut } from '../controller/auth.controller.js';

const router = express.Router();

router.post('/signup', SignUp)
router.post('/signin', Signin)
router.post('/google', Google)
router.post('/signOut', SignOut)


export default router