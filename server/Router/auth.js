import express from 'express';
import {} from 'express-async-errors';
import {body} from 'express-validator';
import {validate} from '../middleware/validator.js';
import {signup, login, me} from '../Controller/authController.js'
import {isAuth} from "../middleware/auth.js";

const authRouter = express.Router();

const validation = [
    body('username')
        .trim()
        .notEmpty()
        .withMessage('아이디를 입력해주세요.'),
    body('password')
        .trim()
        .isLength({min:4})
        .withMessage('비밀번호를 4글자 이상 입력하세요.'),
    validate
];
authRouter.post('/signup', validation, signup)
authRouter.post('/login', validation, login)
authRouter.post('/me', isAuth, me)

export default authRouter;