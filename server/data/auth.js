import {db} from '../db/database.js';

export async function findByUsername(username){
    return db
        .execute('SELECT * FROM Users WHERE username=?', [username])
        .then(result=>result[0][0]);
}

export async function createUser(user){
    const {username, password} = user;
    return db
        .execute('INSERT INTO Users (username, password) VALUES (?,?)', [username, password])
        .then(result=>result[0].insertId)
}