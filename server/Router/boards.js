import express from 'express';
import {createBoard, edit, getAll, getById, remove} from "../Controller/boardController.js";
import {isAuth} from "../middleware/auth.js";


const boardRouter = express.Router();

boardRouter.post('/insert', isAuth, createBoard)
boardRouter.get('/get', getAll)
boardRouter.get('/get/:id', isAuth, getById)
boardRouter.put("/edit/:id", isAuth, edit)
boardRouter.delete("/delete/:id", isAuth,remove)


export default boardRouter;