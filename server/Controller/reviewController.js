import {db} from "../db/database.js";
import * as reviewRepository from '../data/review.js';
import * as userRepository from '../data/auth.js'

// Create
export async function createReview(req, res){
    const {title, text, rate, coords} = req.body
    const owner = await userRepository.findById(req.userId)
    const review = await reviewRepository.create(title, text, rate, coords, req.userId, owner.username)
    res.status(201).json(review)
}

// Read
export async function getAll(req,res){
    const reviews = await reviewRepository.getReviewAll();
    res.status(200).send(reviews)
}

export async function getById(req,res){
    const {params:{id}} = req
    let review = await reviewRepository.getReviewById(id)
    if(review.userId === req.userId){
        review['isOwner'] = true
        return res.status(200).send(review)
    }
    res.status(200).send(review)
}

// Update
export async function edit(req, res){
    const id = parseInt(req.params.id);
    const {title, text} = req.body
    const review = await reviewRepository.getReviewById(id);
    if(!review){
        return res.send(404).json({message:`${id}번 게시물이 없습니다.`})
    }
    // 로그인된 유저가 작성자인지 확인
    if(review.userId !== req.userId){
        return res.sendStatus(403)
    }
    const updated = await reviewRepository.update(id, title, text);
    res.status(200).json(updated)
}

// Delete
export async function remove(req,res){
    const {params:{id}} = req;
    const review = await reviewRepository.getReviewById(id);
    if(!review){
        return res.status(404).json({message: `${id}번 게시물을 찾지 못했습니다.`})
    }
    if(review.userId !== req.userId){
        return res.sendStatus(403)
    }
    await reviewRepository.remove(id)
    res.sendStatus(204);
}