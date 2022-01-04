import {db} from "../db/database.js";

export async function getShopsAll(){
    return db
        .execute("SELECT * FROM Shops ORDER BY date DESC")
        .then(result=>result[0])
}

export async function getShopsById(id){
    return db
        .execute(`SELECT * FROM Shops id WHERE id=${id}`)
        .then(result => result[0][0])
}

export async function update(id, title,rate, text, coords) {
    return db
        .execute(`UPDATE Shops SET title=?,rate=?,text=?,coords=? WHERE id=?`, [title, rate, text, coords, id])
        .then(()=> getShopsById(id))
}

export async function create(id,title,address,phone,coords,owner,rate,url){
    return db
        .execute("INSERT INTO Shops (id,title,address,phone,coords,owner,rate,url) VALUES (?,?,?,?,?,?,?,?)", [id,title,address,phone,coords,owner,rate,url])
        .then(result => getShopsById(result[0].insertId))
}

export async function remove(id) {
    return db.execute("DELETE FROM Shops WHERE id=?", [id])
}