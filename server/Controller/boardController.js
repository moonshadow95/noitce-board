import {db} from "../db/database.js";
import * as boardRepository from '../data/board.js';

// Create
export async function createBoard(req, res){
    const {title, text} = req.body
    const board = await boardRepository.create(title, text, req.userId)
    res.status(201).json(board)
}

// Read
export async function getAll(req,res){
    const boards = await boardRepository.getBoardAll();
    res.status(200).send(boards)
}

export async function getById(req,res){
    const {params:{id}} = req
    const board = await boardRepository.getBoardById(id)
    res.status(200).send(board)
}

// Update
export async function edit(req, res){
    const id = parseInt(req.params.id);
    const {title, text} = req.body
    const board = await boardRepository.getBoardById(id);
    if(!board){
        return res.send(404).json({message:`${id}번 게시물이 없습니다.`})
    }
    // 로그인된 유저가 작성자인지 확인
    if(board.userId !== req.userId){
        return res.sendStatus(403)
    }
    const updated = await boardRepository.update(id, title, text);
    res.status(200).json(updated)
}

// Delete
export async function remove(req,res){
    const {params:{id}} = req;
    const board = await boardRepository.getBoardById(id);
    if(!board){
        return res.status(404).json({message: `${id}번 게시물을 찾지 못했습니다.`})
    }
    if(board.userId !== req.userId){
        return res.sendStatus(403)
    }
    await boardRepository.remove(id)
    res.sendStatus(204);
}