import React, {useState} from 'react';
import StaticMap from "../Map/StaticMap";
import styles from "../../routes/Gourmet/gourmet.module.css";
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
        <div className={styles.slick}>
            <h2 className={styles.slickTitle}>최근 등록 맛집</h2>
            <div className={styles.buttonContainer}>
                <Link to='./shops'>
                    <button>전체보기 / 등록하기</button>
                </Link>
            </div>
            <span className={styles.caption}>지도 클릭시 카카오 맵으로 이동합니다.</span>
            <Slider {...settings}>
                {data.slice(0, 6).map((shop) =>
                    <div className={styles.slickItem} key={shop.id}>
                        <div className={styles.shopsTitle}>
                            <h2 className={styles.shopsTitle}>{shop.title}</h2>
                        </div>
                        <StaticMap shop={shop} key={shop.id}/>
                    </div>
                )}
            </Slider>
        </div>
    )
};

export default Shop;