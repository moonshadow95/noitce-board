import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import {db} from "./db/database.js";

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

// Read
app.get("/api/get",(req,res)=>{
    const sqlQuery = "SELECT * FROM board ORDER BY createdAt DESC;";
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

// Create
app.post("/api/insert", (req, res)=>{
    const title = req.body.title;
    const text = req.body.text;
    const createdAt = new Date();
    const sqlQuery = "INSERT INTO board (title, text) VALUES (?,?)";
    db.execute(sqlQuery, [title, text],(err,result)=>{
        res.send(result)
    })
})

// Delete
app.post("/api/delete/:id",(req,res)=>{
    const {params:{id}} = req;
    const sqlQuery = "DELETE FROM board WHERE id=?";
    db.execute(sqlQuery,[id]);
})

app.listen(PORT, () => {
    console.log(`✅ Running on port ${PORT}`)
})