import express from 'express';
import {createBoard, edit, getAll, remove} from "../Controller/boardController.js";


const boardRouter = express.Router();

boardRouter.post('/insert', createBoard)
boardRouter.get('/get', getAll)
boardRouter.post("/edit/:id", edit)
boardRouter.post("/delete/:id",remove)


export default boardRouter;