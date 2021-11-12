import React, {useState} from 'react';
import ReactHtmlParser from "html-react-parser";
import Axios from "axios";

const Board = ({content:{id, title, text, createdAt}, }) => {
    const [editing, setEditing] = useState(true);

    // Edit
    const onEditClick = (event) => {
        setEditing(prev => !prev)
        console.log(editing)
    }

    // Delete
    const onDeleteClick =(event)=>{
        const ok = window.confirm("삭제하시겠습니까?");
        if(ok){
            const {target:{id}} = event;
            Axios.post(`http://localhost:8080/api/delete/${id}`).then(() => alert('삭제되었습니다.')
            )
        }
    }

    // Time Formatter
    const timeFormatter = (createdAt) => {
        const milliSeconds = new Date() - createdAt;
        const seconds = milliSeconds / 1000;
        if (seconds < 60) return `방금 전`;
        const minutes = seconds / 60;
        if (minutes < 60) return `${Math.floor(minutes)}분 전`;
        const hours = minutes / 60;
        if (hours < 24) return `${Math.floor(hours)}시간 전`;
        const days = hours / 24;
        if (days < 2) return `${Math.floor(days)}일 전`;
        if (days >= 2) {
            const dateObj = new Date(createdAt);
            const year = dateObj.getFullYear();
            const month = dateObj.getMonth() + 1;
            const date = dateObj.getDate();
            return `${year}년 ${month}월 ${date}일`;
        }
    };

    return(
        <>
            <td style={{width:'100%'}} >
                <span>{id}</span>
            </td>
            <td>
                <span>{title}</span>
            </td>
            <td>
                <span>{timeFormatter(new Date(createdAt))}</span>
            </td>
            {/*<div style={{display:'flex',flexDirection:'column',}}>*/}
            {/*    <button id={id} onClick={onDeleteClick}>Delete</button>*/}
            {/*    <button onClick={onEditClick}>Edit</button>*/}
            {/*</div>*/}
        </>
    )
};

export default Board;