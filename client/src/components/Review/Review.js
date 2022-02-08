import React, {useState} from 'react';
import Slider from "react-slick";
import {Link} from "react-router-dom";
import Rate from "../Rate/Rate";
import timeFormatter from "../../util/date";
import HTMLReactParser from "html-react-parser";

const Review = ({reviews, boardService, setBanner, setIsAlert}) => {
    const [isWrite, setIsWrite] = useState(false)
    const settings = {
        dots: true,
        arrows: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
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
        <div className='relative h-[45vh] grow-1 flex flex-col align-center justify-center border-b pb-14'>
            <h2 className='text-center text-xl border rounded bg-black text-white w-48 p-4 m-auto'>최근 등록 리뷰</h2>
            <div className='absolute top-14 right-40 py-4 px-6 border rounded bg-black text-white transition cursor-pointer hover:bg-white hover:text-black active:translate-y-2'>
                <Link to='./shops'>
                    <button>전체보기 / 등록하기</button>
                </Link>
            </div>
            <span className='text-center'>리뷰 클릭시 가게 정보로 이동합니다.</span>
            <Slider {...settings}>
                {reviews.slice(0, 6).map((review) =>
                    <Link className='m-auto' to={`./shops/${review.shopId}`} key={review.id}>
                        <div className='flex flex-col justify-center gap-4 p-4 items-center min-h-[300px] transition hover:bg-black hover:text-white'>
                            <h2 className='text-lg text-center'>{HTMLReactParser(review.text)}</h2>
                            <Rate value={review.rate} size={'lg'}/>
                            <div className=''>
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