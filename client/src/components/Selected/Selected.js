import React, {useState} from 'react';
import Axios from "axios";
import HTMLReactParser from "html-react-parser";
import TextEditor from "../TextEditor/TextEditor";
import { useNavigate } from "react-router-dom";
import styles from './selected.module.css';

const Selected = ({selected, isOwner, setBanner, setIsAlert}) => {
    const [editing, setEditing] = useState(false);
    const navigate = useNavigate();
    // Get Headers
    const getHeaders = () => {
        const token = localStorage.getItem('token')
        return {
            Authorization: `Bearer ${token}`
        }
    }
    // Edit
    const onEditClick = (event) => {
        if(isOwner){
            setEditing(prev => !prev)
        }
    }
    // Delete
    async function deleteBoard(id){
        await Axios({
            method: "DELETE",
            url:`http://localhost:8080/boards/delete/${id}`,
            headers: getHeaders(),
        })
    }

    const onDeleteClick =(event)=>{
        const ok = window.confirm("삭제하시겠습니까?");
        if(ok){
            const {target:{id}} = event;
            deleteBoard(id)
                .catch(err=>setBanner(err.response.data.message))
                .then(navigate('/'))
        }else{
            setBanner('권한이 없습니다.')
            setIsAlert(true)
        }
    }
    // Time Formatter
    const timeFormatter = (createdAt) => {
        const milliSeconds = new Date() - new Date(createdAt);
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
        <main>
            {/*Section*/}
            <section className={styles.section}>
                {!editing && <>
                    <header className={styles.header}>
                        <h1 className={styles.title}>{selected.title}</h1>
                    </header>
                    <div className={styles.meta}>
                        <div className={styles.date}><small>{timeFormatter(selected.date)}</small></div>
                        <div className={styles.owner}><small>{selected.owner}</small></div>
                    </div>
                    <div className={styles.text}>
                        {HTMLReactParser(selected.text)}
                    </div>
                    {isOwner &&
                    <div className="btnContainer">
                        <button className={styles.btn} onClick={onEditClick}>{editing ? "취소" : "글 수정하기"}</button>
                        <button className={styles.btn} id={selected.id} onClick={onDeleteClick}>글 삭제하기</button>
                    </div>
                    }
                </>
                }
                {editing && <>
                    <TextEditor
                        isEdit={true}
                        selected={selected}
                        onCancelClick={onEditClick}
                        onEditClick={onEditClick}
                        setBanner={setBanner}
                        setIsAlert={setIsAlert}
                    />
                </>}
            </section>
        </main>
    )
};

export default Selected;