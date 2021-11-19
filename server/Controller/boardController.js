import {db} from "../db/database.js";

// Create
export const createBoard = (req, res)=>{
    const {title, text} = req.body
    const sqlQuery = "INSERT INTO Board (title, text) VALUES (?,?)";
    db.execute(sqlQuery, [title, text],(err,result)=>{
        res.status(201).send(result)
    })
}

// Read
// Get all
export const getAll = (req,res)=>{
    const sqlQuery = "SELECT * FROM Board ORDER BY date DESC;";
    db.execute(sqlQuery, (err,result)=>{
        res.status(200).send(result)
    })
}
// Get By id
export const getById = (req, res)=>{
    const {id} = req.params
    const sqlQuery = `SELECT * FROM Board id WHERE id=${id}`;
    const content =  db.execute(sqlQuery)
    if(content){
        res.sendStatus(200);
    }else{
        res.sendStatus(404);
    }
}

// Update
export const edit = (req, res)=>{
    const {id} = req.params
    const {title, text} = req.body
    const sqlQuery = `UPDATE Board SET title=?,text=? WHERE id=?`
    db.execute(sqlQuery, [title, text, id], (err, result) => {
        res.sendStatus(200)
    })
}

// Delete
export const remove = (req,res)=>{
    const {params:{id}} = req;
    const sqlQuery = "DELETE FROM Board WHERE id=?";
    db.execute(sqlQuery,[id], (err, result)=>{
        res.send(result)
    });
}