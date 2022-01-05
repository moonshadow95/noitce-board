import {db} from "../db/database.js";

const SELECT_JOIN = 'SELECT shops.id, shops.title, shops.text, shops.rate ,shops.address, shops.date,shops.coords, shops.phone, shops.url, shops.userId FROM shops JOIN users ON shops.userId=users.id'
const ORDER_DESC = 'ORDER BY shops.date DESC'
export async function getShopsAll(){
    return db
        .execute(`${SELECT_JOIN} ${ORDER_DESC}`)
        .then(result=>result[0])
}

export async function getShopsById(id){
    return db
        .execute(`${SELECT_JOIN} WHERE id=${id}`)
        .then(result => result[0][0])
}

export async function update(id, title,rate, text, coords) {
    return db
        .execute(`UPDATE Shops SET title=?,rate=?,text=?,coords=? WHERE id=?`, [title, rate, text, coords, id])
        .then(()=> getShopsById(id))
}

export async function create(id,title,address,phone,coords,userId,rate,url){
    return db
        .execute("INSERT INTO Shops (id,title,address,phone,coords,userId,rate,url) VALUES (?,?,?,?,?,?,?,?)", [id,title,address,phone,coords,userId,rate,url])
        .then(result => getShopsById(result[0].insertId))
}

export async function remove(id) {
    return db.execute("DELETE FROM Shops WHERE id=?", [id])
}