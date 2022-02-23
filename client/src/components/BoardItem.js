import React from 'react';
import {Link} from "react-router-dom";
import timeFormatter from "../util/date";
import Rate from "./Rate";

const BoardItem = ({content}) => {
    return (
        <Link
            className='w-full flex justify-between'
            to={`./${content.id}`}
        >
            <div className='p-4 md:p-6 w-full text-center border-r md:min-w-[200px]'>
                <span>{content.title}</span>
            </div>
            <div className='flex-col-center text-center px-4 min-w-[100px] md:min-w-[150px]'>
                {(content.rate || content.rate === 0) ? <Rate value={content.rate}/>
                    : <>
                        <span>{timeFormatter(content.date)}</span>
                        <span>{content.username}</span>
                    </>}
            </div>
        </Link>
    )
};

export default BoardItem;