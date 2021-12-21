import React from 'react';
import {Link} from "react-router-dom";
import styles from './board.module.css';
import timeFormatter from "../../util/date";

const Board = ({content:{id, title, text, date, owner}, }) => {

    return(
        <Link className={styles.link} to={`/boards/get/${id}`}>
            {/*<div className={styles.id}>*/}
            {/*    <span>{id}</span>*/}
            {/*</div>*/}
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