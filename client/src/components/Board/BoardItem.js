import React from 'react';
import {Link} from "react-router-dom";
import styles from './boardItem.module.css';
import timeFormatter from "../../util/date";
import Rate from "../Rate/Rate";

const BoardItem = ({content}) => {
    console.log(content)
    return(
        <Link
            className={styles.link}
            to={`./${content.id}`}
        >
            <div className={styles.title}>
                <span>{content.title}</span>
            </div>
            <div className={styles.meta}>
                {(content.rate || content.rate === 0 ) ? <Rate value={content.rate}/>
                    :<>
                        <span>{timeFormatter(content.date)}</span>
                        <span>{content.owner}</span>
                    </>}
            </div>
        </Link>
    )
};

export default BoardItem;