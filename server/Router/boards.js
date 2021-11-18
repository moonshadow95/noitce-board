import express from 'express';
import {db} from "../db/database.js";

const router = express.Router();

// Create
router.post("/insert", (req, res)=>{
    const {title, text} = req.body
    const sqlQuery = "INSERT INTO Board (title, text) VALUES (?,?)";
    db.execute(sqlQuery, [title, text],(err,result)=>{
        res.send(result)
    })
})

// Read
// Get all
router.get("/get",(req,res)=>{
    const sqlQuery = "SELECT * FROM Board ORDER BY date DESC;";
    db.execute(sqlQuery, (err,result)=>{
        res.status(200).send(result)
    })
})

// Get by id
router.get('/get/:id',  (req, res)=>{
    const {id} = req.params
    const sqlQuery = `SELECT * FROM board id WHERE id=${id}`;
    const content =  db.execute(sqlQuery)
    if(content){
        res.sendStatus(200);
    }else{
        res.sendStatus(404);
    }
})

// Update
router.post("/edit/:id", (req, res)=>{
    const {id} = req.params
    const {title, text} = req.body
    const sqlQuery = `UPDATE board SET title=?,text=? WHERE id=?`
    db.execute(sqlQuery, [title, text, id], (err, result) => {
        res.sendStatus(200)
    })
})

// Delete
router.post("/delete/:id",(req,res)=>{
    const {params:{id}} = req;
    const sqlQuery = "DELETE FROM Board WHERE id=?";
    db.execute(sqlQuery,[id], (err, result)=>{
        res.send(result)
    });
})


export default router;