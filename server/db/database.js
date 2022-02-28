import mysql from 'mysql2'
import {config} from '../config.js'

const pool = mysql.createPool({
    host: config.db.host,
    user: 'root',
    database: 'board',
    password: config.db.password,

})

export const db = pool.promise()