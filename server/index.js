import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import helmet from "helmet";
import morgan  from 'morgan';
import boardRouter from './Router/boards.js';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(helmet())
app.use(cors());
app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({extended: true}));

app.use('/boards', boardRouter)

app.use((req, res,next)=>{
    res.sendStatus(404);
})
app.use((error,req,res,next)=>{
    console.error(error);
    res.sendStatus(500);
})

app.listen(PORT, () => {
    console.log(`✅ Running on port ${PORT}`)
})