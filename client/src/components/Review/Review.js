import React, {useState} from 'react';
import Slider from "react-slick";
import {Link} from "react-router-dom";
import Rate from "../Rate/Rate";
import timeFormatter from "../../util/date";
import HTMLReactParser from "html-react-parser";

const Review = ({reviews, boardService, setBanner, setIsAlert}) => {
    const settings = {
        dots: true,
        arrows: true,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1441,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 426,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    }
    return (
        <div className='relative grow-1 flex-col-center border-b pb-14'>
            <div className='md:flex relative mb-4'>
                <h2 className='title title-absolute'>
                    최근 등록 리뷰</h2>
                <div
                    className='button-common button-animation ml-auto w-[190px] md:w-auto text-center m-auto md:mr-24 xl:mr-40'>
                    <Link to='./shops'>
                        <button>전체보기 / 등록하기</button>
                    </Link>
                </div>
            </div>
            <span className='text-center'>리뷰 클릭시 가게 정보로 이동합니다.</span>
            <Slider {...settings}>
                {reviews.slice(0, 6).map((review) =>
                    <Link className='m-auto' to={`./shops/${review.shopId}`} key={review.id}>
                        <div
                            className='flex-col-center gap-4 p-4 items-center text-center item-animation xl:min-h-[350px] min-h-[300px]'>
                            <span className='ellipsis text-lg font-semibold'>{review.shopTitle}</span>
                            <span className='text-lg text-center ellipsis'>{HTMLReactParser(review.text)}</span>
                            <Rate value={review.rate} size={'lg'}/>
                            <div className='flex-col-center'>
                                <span>{timeFormatter(review.date)}</span>
                                <span>{review.username}</span>
                            </div>
                        </div>
                    </Link>
                )}
            </Slider>
        </div>
    )
};

export default Review;