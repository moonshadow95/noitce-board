import * as shopsRepository from '../data/shops.js';

// Create
export async function createShops(req, res){
    const {
        id,
        place_name:title,
        road_address_name:address,
        phone,
        place_url:url,
    } = req.body
    const userId = req.userId
    const coords = `${req.body.x},${req.body.y}`
    const review = await shopsRepository.create(id,title,address,phone,coords,userId,url)
    res.status(201).json(review)
}

export async function createReview(req, res){
    const {params:{id}} = req
    const {text, rate} = req.body
    const userId = req.userId
    const review = await shopsRepository.createReview(text, userId, id, rate)
    res.status(201).json(review)
}

// Read
export async function getAll(req,res){
    const reviews = await shopsRepository.getShopsAll();
    res.status(200).send(reviews)
}

export async function getAllReviews(req,res){
    const reviews = await shopsRepository.getReviewsAll();
    let addOwner =[]
    await reviews.map(review=>{
        if(review.userId === req.userId){
            review['isOwner'] = true
        }
        addOwner.push(review)
    })
    return res.status(200).send(addOwner)
}

export async function getReviewsById(req,res){
    const {params:{id}} = req
    const reviews = await shopsRepository.getReviewsAll(id)
    let addOwner =[]
    await reviews.map(review=>{
        if(review.userId === req.userId){
            review['isOwner'] = true
        }
        addOwner.push(review)
    })
    return res.status(200).send(addOwner)
}

export async function getById(req,res){
    const {params:{id}} = req
    const review = await shopsRepository.getShopsById(id)
    if(review.userId === req.userId){
        review['isOwner'] = true
        return res.status(200).send(review)
    }
    res.status(200).send(review)
}

// Update
export async function edit(req, res){
    const id = parseInt(req.params.id);
    const {title, coords} = req.body
    const review = await shopsRepository.getShopsById(id);
    if(!review){
        return res.send(404).json({message:`${id}번 게시물이 없습니다.`})
    }
    // 로그인된 유저가 작성자인지 확인
    if(review.userId !== req.userId){
        return res.sendStatus(403)
    }
    const updated = await shopsRepository.update(id, title, coords);
    res.status(200).json(updated)
}

// Delete
export async function remove(req,res){
    const {params:{id}} = req;
    const shop = await shopsRepository.getShopsById(id);
    const review = await shopsRepository.getReviewById(id)
    // TODO shop, review 둘 다 있는 경우??
    // shop review 둘 다 없는 경우
    if(!shop && !review){
        return res.status(404).json({message: `${id}번 게시물을 찾지 못했습니다.`})
    }
    // shop 있는 경우
    if(shop){
        // 권한
        if(shop.userId !== req.userId){
            return res.sendStatus(403)
        }
        // 가게의 리뷰들 삭제
        await shopsRepository.removeReviewByShopId(id)
        // 가게 삭제
        await shopsRepository.remove(id)
    }
    // review 있는 경우
    if(review){
        // 권한
        if(review.userId !== req.userId){
            return res.sendStatus(403)
        }
        await shopsRepository.removeReview(id)
    }
    return res.sendStatus(204);
}