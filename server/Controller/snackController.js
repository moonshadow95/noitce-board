import {db} from "../db/database.js";
import * as snackRepository from '../data/snack.js';

// Create
export async function createSnack(req, res) {
    const {title, text} = req.body
    const snack = await snackRepository.create(title, text, req.userId)
    res.status(201).json(snack)
}

// Read
export async function getAll(req, res) {
    const snacks = await snackRepository.getSnackAll();
    res.status(200).send(snacks)
}

export async function getById(req, res) {
    const {params: {id}} = req
    let snack = await snackRepository.getSnackById(id)
    if (snack.userId === req.userId) {
        snack['isOwner'] = true
        return res.status(200).send(snack)
    }
    res.status(200).send(snack)
}

// Update
export async function edit(req, res) {
    const id = parseInt(req.params.id);
    const {title, text} = req.body
    const snack = await snackRepository.getSnackById(id);
    if (!snack) {
        return res.send(404)
    }
    // 로그인된 유저가 작성자인지 확인
    if (snack.userId !== req.userId) {
        return res.sendStatus(403)
    }
    const updated = await snackRepository.update(id, title, text);
    res.status(200).json(updated)
}

// Delete
export async function remove(req, res) {
    const {params: {id}} = req;
    const snack = await snackRepository.getSnackById(id);
    if (!snack) {
        return res.status(404)
    }
    if (snack.userId !== req.userId) {
        return res.sendStatus(403)
    }
    await snackRepository.remove(id)
    res.sendStatus(204);
}

// Add Like
// export async function addLike(req,res){
//     const {params:id}=req
//     const snack = await snackRepository.getSnackById(id)
//     if(!snack){
//         return res.status(404)
//     }
//     if(snack.userId === req.userId){
//         return res.status(403).json({message:'자신의 글은 추천할 수 없습니다.'})
//     }
//     if()
// }
