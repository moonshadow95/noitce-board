import express from 'express';
import {createBoard, edit, getAll, remove} from "../Controller/boardController.js";
import {isAuth} from "../middleware/auth.js";


const boardRouter = express.Router();

boardRouter.post('/insert', isAuth, createBoard)
boardRouter.get('/get', getAll)
boardRouter.post("/edit/:id", isAuth, edit)
boardRouter.post("/delete/:id", isAuth,remove)


export default boardRouter;