import React from 'react';
import {Link} from "react-router-dom";
import styles from './boardItem.module.css';
import timeFormatter from "../../util/date";
import Rate from "../Rate/Rate";

const BoardItem = ({content}) => {
    return(
        <Link
            className={styles.link}
            to={`./${content.id}`}
        >
            <div className={styles.title}>
                <span>{content.title}</span>
                {content.rate && <Rate value={content.rate}/>}
            </div>
            <div className={styles.meta}>
                <span>{timeFormatter(content.date)}</span>
                <span>{content.owner}</span>
            </div>
        </Link>
    )
};

export default BoardItem;