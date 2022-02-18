import mysql from 'mysql2';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database:'board',
    password: '0503',

})

export const db = pool.promise()