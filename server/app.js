import express from 'express';
import {db} from "./db/database.js";

const app = express();
const PORT = 8080;


app.listen(PORT, ()=>{
    console.log(`✅ Running on port ${PORT}`)
})