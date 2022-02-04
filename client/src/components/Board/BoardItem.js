import React from 'react';
import {Link} from "react-router-dom";
import timeFormatter from "../../util/date";
import Rate from "../Rate/Rate";

const BoardItem = ({content}) => {
    return(
        <Link
            className=''
            to={`./${content.id}`}
        >
            <div className=''>
                <span>{content.title}</span>
            </div>
            <div className=''>
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