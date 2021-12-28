import React, {useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";
import StaticMap from "../Map/StaticMap";
import styles from "../../routes/Gourmet/gourmet.module.css";
import Slider from "react-slick";
import StarRatingComponent from 'react-star-rating-component-new';
import {Link} from "react-router-dom";


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
                    <button>전체보기</button>
                </Link>
                <button>작성하기</button>
            </div>
            <h2 className={styles.slickTitle}>최근 등록 맛집</h2>
            <Slider {...settings}>
                {data.map((review)=>
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