import {db} from "../db/database.js";

export async function getReviewAll(){
    return db
        .execute("SELECT * FROM Review ORDER BY date DESC")
        .then(result=>result[0])
}

export async function getReviewById(id){
    return db
        .execute(`SELECT * FROM Review id WHERE id=${id}`)
        .then(result => result[0][0])
}

export async function update(id, title,rate, text, coords) {
    return db
        .execute(`UPDATE Review SET title=?,rate=?,text=?,coords=? WHERE id=?`, [title, rate, text, coords, id])
        .then(()=> getReviewById(id))
}

export async function create(title, text, rate, coords, userId, owner){
    return db
        .execute("INSERT INTO Review (title, text, rate, coords, userId, owner) VALUES (?,?,?,?,?,?)", [title, text, rate, coords, userId, owner])
        .then(result => getReviewById(result[0].insertId))
}

export async function remove(id) {
    return db.execute("DELETE FROM Review WHERE id=?", [id])
}