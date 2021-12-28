import React from 'react';
import {Link} from "react-router-dom";
import styles from './boardItem.module.css';
import timeFormatter from "../../util/date";

const BoardItem = ({content}) => {
    return(
        <Link className={styles.link} to={`/boards/get/${content.id}`}>
            <div className={styles.title}>
                <span>{content.title || content.name}</span>
            </div>
            <div className={styles.meta}>
                <span>{timeFormatter(content.date)}</span>
                <span>{content.owner}</span>
            </div>
        </Link>
    )
};

export default BoardItem;