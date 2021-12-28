import express from 'express';
import {createSnack, edit, getAll, getById, remove} from "../Controller/snackController.js";
import {isAuth} from "../middleware/auth.js";


const snackRouter = express.Router();

snackRouter.post('/insert', isAuth, createSnack)
snackRouter.get('/get', getAll)
snackRouter.get('/get/:id', isAuth, getById)
snackRouter.put("/edit/:id", isAuth, edit)
snackRouter.delete("/delete/:id", isAuth,remove)


export default snackRouter;