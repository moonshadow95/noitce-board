import mysql from 'mysql2';

export const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database:'test',
    password: '0503',

})
