import {db} from "../db/database.js";

export async function getBoardAll(){
    return db
        .execute("SELECT * FROM Board ORDER BY date DESC;")
        .then(result=>result[0])
}

export async function getBoardById(id){
    return db
        .execute(`SELECT * FROM Board id WHERE id=${id}`)
        .then(result => result[0][0])
}

export async function update(id, title, text) {
    return db
        .execute(`UPDATE Board SET title=?,text=? WHERE id=?`, [title, text, id])
        .then(()=> getBoardById(id))
}

export async function create(title, text, userId){
    return db
        .execute("INSERT INTO Board (title, text, userId) VALUES (?,?,?)", [title, text, userId])
        .then(result => getBoardById(result[0].insertId))
}

export async function remove(id) {
    return db.execute("DELETE FROM Board WHERE id=?", [id])
}