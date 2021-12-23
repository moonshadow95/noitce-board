import React, {useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";
import StaticMap from "../Map/StaticMap";
import styles from "../../routes/Gourmet/gourmet.module.css";
import Slider from "react-slick";
import StarRatingComponent from 'react-star-rating-component-new';


const Shop = (props) => {
    const ShopDB=[
        {
            id:1,
            name:'롯데리아',
            rate:5,
            coords:[33.450001,126.570467],
        },
        {
            id:2,
            name:'맘스터치',
            rate:3,
            coords:[33.450001,126.575],
        },
        {
            id:3,
            name:'롤로랄라',
            rate:4,
            coords:[33.450001,126.57048],
        },
        {
            id:4,
            name:'맥도날드',
            rate:4,
            coords:[33.450001,126.57048],
        },
        {
            id:5,
            name:'버거킹',
            rate:4,
            coords:[33.450001,126.57048],
        },
        {
            id:6,
            name:'한촌 설렁탕',
            rate:4,
            coords:[33.450001,126.57048],
        }
    ]
    const settings = {
        dots: true,
        arrows: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };
    return(
        <div className={styles.slick}>
            <h2 className={styles.slickTitle}>최근 등록 맛집</h2>
            <Slider {...settings}>
                {ShopDB.map((review)=>
                    <div className={styles.slickItem} key={review.id}>
                        <h2>{review.name}</h2>
                        <StarRatingComponent
                            name="productRating"
                            editing={false}
                            renderStarIcon={() => (
                                <FontAwesomeIcon
                                    icon={faStar}
                                    style={{ color: "rgb(253, 186, 73)" }}
                                />
                            )}
                            renderStarIconHalf={() => (
                                <FontAwesomeIcon
                                    icon={faStarHalfAlt}
                                    style={{ color: "rgb(253, 186, 73)" }}
                                />
                            )}
                            renderEmptyStarIcon={() => (
                                <FontAwesomeIcon
                                    icon={faStarEmpty}
                                    style={{ color: "rgb(253, 186, 73)" }}
                                />
                            )}
                            starCount={5}
                            value={review.rate}/>
                        <StaticMap shop={review}/>
                    </div>
                )}
            </Slider>
        </div>
    )};

export default Shop;