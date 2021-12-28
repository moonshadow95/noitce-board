import express from 'express';
import {createReview, edit, getAll, getById, remove} from "../Controller/reviewController.js";
import {isAuth} from "../middleware/auth.js";


const reviewRouter = express.Router();

reviewRouter.post('/insert', isAuth, createReview)
reviewRouter.get('/get', getAll)
reviewRouter.get('/get/:id', isAuth, getById)
reviewRouter.put("/edit/:id", isAuth, edit)
reviewRouter.delete("/delete/:id", isAuth,remove)


export default reviewRouter;