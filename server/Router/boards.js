import express from 'express';
import {db} from "../db/database.js";
import {createBoard, edit, getAll, getById, remove} from "../Controller/boardController.js";


const boardRouter = express.Router();

boardRouter.post('/insert', createBoard)
boardRouter.get('/get', getAll)
boardRouter.get('/get/:id',getById)
boardRouter.post("/edit/:id", edit)
boardRouter.post("/delete/:id",remove)


export default boardRouter;