import React from 'react';
import {Link} from "react-router-dom";
import styles from './boardItem.module.css';
import timeFormatter from "../../util/date";
import Rate from "../Rate/Rate";
import HTMLReactParser from "html-react-parser";

const BoardItem = ({content}) => {
    return(
        <Link
            className={styles.link}
            to={`./${content.id}`}
        >
            {content.title ?
                <div className={styles.title}>
                    <span>{content.title}</span>
                </div> :
                <div className={styles.title}>
                    {HTMLReactParser(content.text)}
                </div>
            }
            <div className={styles.meta}>
                {(content.rate || content.rate === 0 ) ? <Rate value={content.rate}/>
                    :<>
                        <span>{timeFormatter(content.date)}</span>
                        <span>{content.username}</span>
                    </>}
            </div>
        </Link>
    )
};

export default BoardItem;