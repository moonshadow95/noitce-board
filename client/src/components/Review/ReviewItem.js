import React, {useEffect, useState} from 'react';
import timeFormatter from "../../util/date";
import Rate from "../Rate/Rate";
import HTMLReactParser from "html-react-parser";
import styles from './review.module.css';

const ReviewItem = ({content, user, onDeleteClick }) => {
    const [isOwner, setIsOwner] = useState(false)

    useEffect(()=>{
        if(content.username === user.username){
            setIsOwner(true)
        }
    },[content, user])

    return(
        <div className={styles.container}>
            <div className={styles.title}>
                {HTMLReactParser(content.text)}
                {isOwner &&
                <div className={styles.btnContainer}>
                    <button className={styles.btn} id={content.id} onClick={onDeleteClick}>글 삭제하기</button>
                </div>}
            </div>
            <div className={styles.meta}>
                <Rate value={content.rate}/>
                <span>{timeFormatter(content.date)}</span>
                <span>{content.username}</span>
            </div>
        </div>
    )
};

export default ReviewItem;