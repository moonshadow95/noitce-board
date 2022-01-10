import {db} from "../db/database.js";


const SELECT_JOIN = 'SELECT sn.id, sn.title, sn.text, sn.userId, sn.date, users.username FROM snack as sn JOIN users ON sn.userId=users.id'
const ORDER_DESC = 'ORDER BY sn.date DESC'
export async function getSnackAll(){
    return db
        .execute(`${SELECT_JOIN} ${ORDER_DESC}`)
        .then(result=>result[0])
}

export async function getSnackById(id){
    return db
        .execute(`${SELECT_JOIN} WHERE sn.id=${id}`)
        .then(result => result[0][0])
}

export async function update(id, title, text) {
    return db
        .execute('UPDATE snack SET title=?,text=? WHERE snack.id=?', [title, text, id])
        .then(()=> getSnackById(id))
}

export async function create(title, text, userId){
    return db
        .execute("INSERT INTO snack (title, text, userId) VALUES (?,?,?)", [title, text, userId])
        .then(result => getSnackById(result[0].insertId))
}

export async function remove(id) {
    return db.execute("DELETE FROM snack WHERE sn.id=?", [id])
}