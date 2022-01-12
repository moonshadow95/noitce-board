import React, {useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";
import StaticMap from "../Map/StaticMap";
import styles from "../../routes/Gourmet/gourmet.module.css";
import Slider from "react-slick";
import {Link} from "react-router-dom";
import Rate from "../Rate/Rate";


const Shop = ({data}) => {
    const settings = {
        dots: true,
        arrows: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
    };
    return(
        <div className={styles.slick}>
            <div className={styles.buttonContainer}>
                <Link to='./shops'>
                    <button>전체보기 / 등록하기</button>
                </Link>
            </div>
            <h2 className={styles.slickTitle}>최근 등록 맛집</h2>
            <span className={styles.caption}>지도 클릭시 카카오 맵으로 이동합니다.</span>
            <Slider {...settings}>
                {data.slice(0,6).map((shop)=>
                    <div className={styles.slickItem} key={shop.id}>
                        <div className={styles.shopsTitle}>
                            <h2 className={styles.shopsTitle}>{shop.title}</h2>
                        </div>
                        <StaticMap shop={shop} key={shop.id}/>
                    </div>
                )}
            </Slider>
        </div>
    )};

export default Shop;