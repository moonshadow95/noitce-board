import React from 'react';
import timeFormatter from "../util/date";
import Rate from "./Rate";
import HTMLReactParser from "html-react-parser";

const ReviewItem = ({content, onDeleteClick, isOwner}) => {
    return (
        <div className='mx-6 mt-4 flex items-center round flex-col sm:flex-row'>
            <div className='flex items-center flex-col md:flex-row w-full border-b sm:border-b-0 sm:border-r min-h-[106px] p-4'>
                <div className='mb-2 break-all'>{HTMLReactParser(content.text)}</div>
                {isOwner &&
                <button
                    className='py-4 text-center round min-w-[124px] md:ml-auto button-common button-animation'
                    id={content.id} onClick={onDeleteClick}>글 삭제하기</button>}
            </div>
            <div className='flex-col-center items-center min-w-[120px] sm:ml-auto py-4'>
                <Rate value={content.rate}/>
                <span>{timeFormatter(content.date)}</span>
                <span>{content.username}</span>
            </div>
        </div>
    )
};

export default ReviewItem;