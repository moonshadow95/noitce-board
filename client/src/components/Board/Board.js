import React from 'react';
import {Link} from "react-router-dom";
import styles from './board.module.css';

const Board = ({content:{id, title, text, date, owner}, }) => {
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
            const year = dateObj.getFullYear().toString().substr(2,3);
            const month = dateObj.getMonth() + 1;
            const date = dateObj.getDate();
            return `${year}.${month}.${date}`;
        }
    };
    return(
        <Link className={styles.link} to={`/boards/get/${id}`}>
            <div className={styles.id}>
                <span>{id}</span>
            </div>
            <div className={styles.title}>
                <span>{title}</span>
            </div>
            <div className={styles.meta}>
                <span>{timeFormatter(date)}</span>
                <span>{owner}</span>
            </div>
        </Link>
    )
};

export default Board;