import {db} from "../db/database.js";

export async function getSnackAll(){
    return db
        .execute("SELECT * FROM Snack ORDER BY date DESC")
        .then(result=>result[0])
}

export async function getSnackById(id){
    return db
        .execute(`SELECT * FROM Snack id WHERE id=${id}`)
        .then(result => result[0][0])
}

export async function update(id, title, text) {
    return db
        .execute(`UPDATE Snack SET title=?,text=? WHERE id=?`, [title, text, id])
        .then(()=> getSnackById(id))
}

export async function create(title, text, userId, owner){
    return db
        .execute("INSERT INTO Snack (title, text, userId, owner) VALUES (?,?,?,?)", [title, text, userId, owner])
        .then(result => getSnackById(result[0].insertId))
}

export async function remove(id) {
    return db.execute("DELETE FROM Snack WHERE id=?", [id])
}