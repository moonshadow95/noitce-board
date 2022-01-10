import express from 'express';
import {
    createReview,
    createShops,
    edit,
    getAll, getAllReviews,
    getById,
    getReviewsById,
    remove
} from "../Controller/shopsController.js";
import {isAuth} from "../middleware/auth.js";


const shopsRouter = express.Router();

shopsRouter.post('/insert', isAuth, createShops)
shopsRouter.post('/insert/:id', isAuth, createReview)
shopsRouter.get('/reviews/get/:id', isAuth, getReviewsById)
shopsRouter.get('/get', isAuth, getAll)
shopsRouter.get('/reviews/get', isAuth, getAllReviews)
shopsRouter.get('/get/:id', isAuth, getById)
shopsRouter.put("/edit/:id", isAuth, edit)
shopsRouter.delete("/delete/:id", isAuth,remove)


export default shopsRouter;