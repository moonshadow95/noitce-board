import React, {useEffect, useState} from 'react';
import Board from "../components/Board";
import {useParams} from "react-router-dom";

const Read = ({viewContent}) => {
    const [content, setContent] = useState(viewContent)
    const [selected, setSelected] = useState();
    const {id} = useParams();

    useEffect(()=>{
        setSelected(viewContent.find((item)=>item.id = id))
        console.log(viewContent)
        console.log('selected?', selected)
    },[id])
    return (
        <Board content={{id: '31', title: '일곱번째 글', text: '<p>일곱ㅂㅈㄷㅂㅈㄷ</p>', createdAt: '2021-11-12T05:31:29.000Z'}}/>
    );
}

export default Read;