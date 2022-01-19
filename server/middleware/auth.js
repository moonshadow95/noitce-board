import jwt from 'jsonwebtoken';
import * as userRepository from '../data/auth.js';

const AUTH_ERROR = {message: '로그인 후 이용할 수 있습니다.'}

export const isAuth = async (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!(authHeader && authHeader.startsWith('Bearer'))) {
        return res.status(401).json(AUTH_ERROR)
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        '3E793A85B4612E59DFDFB7B924FFF',
        async (error, decoded) => {
            if (error) {
                return res.status(401).json(AUTH_ERROR);
            }
            const user = await userRepository.findById(decoded.id)
            if (!user) {
                return res.status(401).json(AUTH_ERROR);
            }
            req.userId = user.id;
            next();
        }
    )
}