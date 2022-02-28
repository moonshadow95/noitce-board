import React from 'react';
import {Link} from "react-router-dom";
import timeFormatter from "../../util/date";
import Rate from "../Rate";

const BoardItem = ({content}) => {
    return (
        <Link
            className='w-full flex justify-between'
            to={`./${content.id}`}
        >
            {/*likes, check 추가시 flex 추가*/}
            <div className='p-4 md:p-6 w-full text-center border-r md:min-w-[200px]'>
                <span>{content.title}</span>
                {/*TODO - likes and check*/}
                {/*<div className='ml-auto flex-row-center items-center gap-2'>*/}
                {/*    <input type="checkbox" className='ml-4' checked={false}/>*/}
                {/*    <span><FontAwesomeIcon icon={faThumbsUp}/> + {content.likes || 0}</span>*/}
                {/*</div>*/}
            </div>
            <div className='flex-col-center text-center px-4 min-w-[100px] md:min-w-[150px] text-xs md:text-base'>
                {content.rate ? <Rate value={content.rate}/>
                    : <>
                        <span>{timeFormatter(content.date)}</span>
                        <span>{content.username}</span>
                    </>}
            </div>
        </Link>
    )
};

export default BoardItem;