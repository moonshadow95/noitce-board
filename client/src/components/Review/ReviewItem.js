import React from 'react';
import timeFormatter from "../../util/date";
import Rate from "../Rate/Rate";
import HTMLReactParser from "html-react-parser";

const ReviewItem = ({content, onDeleteClick, isOwner}) => {
    return (
        <div className='mx-6 pl-6 mt-4 flex items-center border'>
            <div className='flex items-center w-full mr-6'>
                {HTMLReactParser(content.text)}
                {isOwner &&
                <button
                    className='py-4 border text-center rounded bg-black text-white min-w-[120px] ml-auto transition hover:bg-red active:translate-y-2'
                    id={content.id} onClick={onDeleteClick}>글 삭제하기</button>}
            </div>
            <div className='flex flex-col min-w-[120px] ml-auto justify-center items-center border-l py-4'>
                <Rate value={content.rate}/>
                <span>{timeFormatter(content.date)}</span>
                <span>{content.username}</span>
            </div>
        </div>
    )
};

export default ReviewItem;