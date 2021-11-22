import {db} from "../db/database.js";
import * as boardRepository from '../data/board.js';

// Create
export const createBoard = (req, res)=>{
    const {title, text} = req.body
    const sqlQuery = "INSERT INTO Board (title, text) VALUES (?,?)";
    db.execute(sqlQuery, [title, text],(err,result)=>{
        res.status(201).send(result)
    })
}

// Read
// Get all
export async function getAll(req,res){
    const boards = await boardRepository.getBoardAll();
    res.status(200).send(boards)
}

// Update
export async function edit(req, res){
    const id = parseInt(req.params.id);
    const {title, text} = req.body
    console.log(title, text)
    const board = await boardRepository.getBoardById(id);
    if(!board){
        return res.sendStatus(404).json({message:`${id}번 게시물이 없습니다.`})
    }
    // 로그인된 유저가 작성자인지 확인
    // if(board.userId !== req.userId){
    //     return res.sendStatus(403)
    // }
    const updated = await boardRepository.update(id, title, text);
    res.status(200).json(updated)
}

// Delete
export const remove = (req,res)=>{
    const {params:{id}} = req;
    const sqlQuery = "DELETE FROM Board WHERE id=?";
    db.execute(sqlQuery,[id], (err, result)=>{
        res.send(result)
    });
}