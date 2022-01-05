import {db} from "../db/database.js";
import * as shopsRepository from '../data/shops.js';
import * as userRepository from '../data/auth.js'

// Create
export async function createShops(req, res){
    const {
        id,
        place_name:title,
        road_address_name:address,
        phone,
        rate,
        place_url:url,
    } = req.body
    const userId = req.userId
    const coords = `${req.body.x},${req.body.y}`
    const review = await shopsRepository.create(id,title,address,phone,coords,userId,rate,url)
    res.status(201).json(review)
}

// Read
export async function getAll(req,res){
    const reviews = await shopsRepository.getShopsAll();
    res.status(200).send(reviews)
}

export async function getById(req,res){
    const {params:{id}} = req
    let review = await shopsRepository.getShopsById(id)
    if(review.userId === req.userId){
        review['isOwner'] = true
        return res.status(200).send(review)
    }
    res.status(200).send(review)
}

// Update
export async function edit(req, res){
    const id = parseInt(req.params.id);
    const {title, rate, text, coords} = req.body
    const review = await shopsRepository.getShopsById(id);
    if(!review){
        return res.send(404).json({message:`${id}번 게시물이 없습니다.`})
    }
    // 로그인된 유저가 작성자인지 확인
    if(review.userId !== req.userId){
        return res.sendStatus(403)
    }
    const updated = await shopsRepository.update(id, title, rate, text, coords);
    res.status(200).json(updated)
}

// Delete
export async function remove(req,res){
    const {params:{id}} = req;
    const review = await shopsRepository.getShopsById(id);
    if(!review){
        return res.status(404).json({message: `${id}번 게시물을 찾지 못했습니다.`})
    }
    if(review.userId !== req.userId){
        return res.sendStatus(403)
    }
    await shopsRepository.remove(id)
    res.sendStatus(204);
}