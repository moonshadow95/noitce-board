import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {db} from '../db/database.js';

const jwtSecretKey = '3E793A85B4612E59DFDFB7B924FFF'
const jwtExpiresInDays = '2d'
const bcryptSaltRounds = 12

// Sign Up
export async function signup(req,res){
    const {username, password} = req.body;
    const sqlQueryInsert = `INSERT INTO Users (username, password) VALUES (?,?)`;
    const sqlQuerySelect = `SELECT * FROM Users username WHERE username=?;`
    const found = await db.execute(sqlQuerySelect,[username], (result)=>{
        console.log(result)
    })
    console.log(found)
    if(found){
        return res.status(409).json({message:`${username}은(는) 이미 사용중입니다.`})
    }
    const hashedPassword = await bcrypt.hash(password, bcryptSaltRounds)
    const userId = db.execute(sqlQueryInsert, [username,hashedPassword], (err,result)=>{
        res.status(201).send(result)
    })
    const token = await createJwtToken(userId);
    res.status(201).json({ token, username });
}

// Login
export async function login(req,res){
    const {username, password} = req.body;
    const sqlQuery = `SELECT * FROM users username WHERE username=${username};`;
    const user = await db.execute(sqlQuery)
    if(!user){
        return res.sendStatus(401)
    }
    const isValidPassword = await bcrypt.compare(password, user.password)
    if(!isValidPassword){
        return res.sendStatus(401)
    }
    const token = createJwtToken(user.id)
    res.sendStatus(200)
}

// Create JWT
function createJwtToken(id){
    return jwt.sign({id}, jwtSecretKey, {expiresIn: jwtExpiresInDays} )
}