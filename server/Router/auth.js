import express from 'express';
import {body} from 'express-validator';
import {validate} from '../middleware/validator.js';
import {signup, login} from '../Controller/authController.js'

const authRouter = express.Router();
//
// const validateSignup = [
//     body('username')
//         .trim()
//         .notEmpty()
//         .withMessage('아이디를 입력해주세요.'),
//     body('password')
//         .trim()
//         .isLength({min:4})
//         .withMessage('비밀번호를 4글자 이상 입력하세요.'),
//     validate
// ];
// authRouter.post('/signup', validateSignup, signup)
// authRouter.post('/login', validateSignup, login)

authRouter.post('/signup', signup)
export default authRouter;