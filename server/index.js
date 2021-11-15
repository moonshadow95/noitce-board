import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import {db} from "./db/database.js";

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

// Create
app.post("/api/insert", (req, res)=>{
    const {title, text} = req.body
    const sqlQuery = "INSERT INTO Board (title, text) VALUES (?,?)";
    db.execute(sqlQuery, [title, text],(err,result)=>{
        res.send(result)
    })
})

// Read
app.get("/api/get",(req,res)=>{
    const sqlQuery = "SELECT * FROM Board ORDER BY date DESC;";
    db.execute(sqlQuery, (err,result)=>{
        res.send(result)
    })
})

app.get('/api/get/:id', (req, res)=>{
    const {id} = req.params
    const sqlQuery = `SELECT * FROM board id WHERE id=${id}`;
    db.execute(sqlQuery, (err, result)=>{
        res.send(result)
    })
})

// Update
// UPDATE Board SET title='HELLO',text='<p>안녕하십니까</p>' WHERE id=32
app.post("/api/edit/:id", (req, res)=>{
    const {id} = req.params
    const {title, text} = req.body
    const sqlQuery = `UPDATE board SET title=?,text=? WHERE id=?`
    db.execute(sqlQuery, [title, text, id], (err, result) => {
        res.send(result)
    })
})

// Delete
app.post("/api/delete/:id",(req,res)=>{
    const {params:{id}} = req;
    const sqlQuery = "DELETE FROM Board WHERE id=?";
    db.execute(sqlQuery,[id], (err, result)=>{
        res.send(result)
    });
})

app.listen(PORT, () => {
    console.log(`✅ Running on port ${PORT}`)
})