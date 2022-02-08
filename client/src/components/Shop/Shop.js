import React from 'react';
import StaticMap from "../Map/StaticMap";
import Slider from "react-slick";
import {Link} from "react-router-dom";


const Shop = ({data}) => {
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
    };
    return (
        <div className='relative grow-1 flex-col-center pb-14 mt-4'>
            <div className='md:flex relative mb-4'>
                <h2 className='title title-absolute'>
                    최근 등록 맛집</h2>
                <div
                    className='button-common button-animation ml-auto w-[190px] md:w-auto text-center m-auto md:mr-24 xl:mr-40'>
                    <Link to='./shops'>
                        <button>전체보기 / 등록하기</button>
                    </Link>
                </div>
            </div>
            <span className='text-center'>지도 클릭시 카카오 맵으로 이동합니다.</span>
            <Slider {...settings}>
                {data.slice(0, 6).map((shop) =>
                    <div className='xl:h-[350px] h-[250px]' key={shop.id}>
                        <div className='text-center text-lg py-3 flex-row-center ellipsis'>
                            <p>{shop.title}</p>
                        </div>
                        <StaticMap shop={shop} key={shop.id}/>
                    </div>
                )}
            </Slider>
        </div>
    )
};

export default Shop;