import React from 'react';
import StaticMap from "../Map/StaticMap";
import Slider from "react-slick";
import LoadingSpinner from "../LoadingSpinner";
import {Link} from "react-router-dom";

const Shop = ({shops, isLoading}) => {
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
            <div className='md:flex mb-4'>
                <h2 className='title'>
                    최근 등록 맛집</h2>
            </div>
            {isLoading ? <LoadingSpinner/> :
                shops[0] ?
                    <Slider {...settings}>
                        {shops.slice(0, 6).map((shop) =>
                            <div className='xl:h-[350px] h-[250px] shadow-lg' key={shop.id}>
                                <div className='text-center text-lg py-3 flex-row-center font-semibold ellipsis'>
                                    <p>{shop.title}</p>
                                </div>
                                <Link to={`./shops/${shop.id}`}>
                                    <StaticMap shop={shop} key={shop.id}/>
                                </Link>
                            </div>
                        )}
                    </Slider> :
                    <div>
                        <div className='flex-col-center min-h-[380px] text-center w-[80vw] m-auto round shadow-lg'>
                            최근 등록 맛집이 없습니다.
                        </div>
                    </div>

            }
        </div>
    )
};

export default Shop;