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
    };
    return (
        <div className='relative h-[45vh] grow-1 flex flex-col align-center justify-center pb-14'>
            <h2 className='text-center text-2xl border rounded bg-black text-white w-48 p-4 m-auto'>최근 등록 맛집</h2>
            <div className='absolute top-14 right-32 py-4 px-6 border rounded bg-black text-white transition cursor-pointer hover:bg-white hover:text-black active:translate-y-2'>
                <Link to='./shops'>
                    <button>전체보기 / 등록하기</button>
                </Link>
            </div>
            <span className='text-center'>지도 클릭시 카카오 맵으로 이동합니다.</span>
            <Slider {...settings}>
                {data.slice(0, 6).map((shop) =>
                    <div className='h-[290px]' key={shop.id}>
                        <div className='text-center text-lg py-3'>
                            <h2 className=''>{shop.title}</h2>
                        </div>
                        <StaticMap shop={shop} key={shop.id}/>
                    </div>
                )}
            </Slider>
        </div>
    )
};

export default Shop;