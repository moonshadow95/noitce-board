import React from 'react';
import styles from "../../routes/Gourmet/gourmet.module.css";
import Slider from "react-slick";
import {Link} from "react-router-dom";
import Rate from "../Rate/Rate";

const Review = ({data}) => {

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
                <Link to="./reviews">
                    <button>전체보기</button>
                </Link>
                <button>작성하기</button>
            </div>
            <h2 className={styles.slickTitle}>최근 등록 리뷰</h2>
            <Slider {...settings}>
                {data.map((review)=>
                    <div className={styles.slickItem} key={review.id}>
                        <h2>{review.name}</h2>
                        <Rate value={review.rate} />
                        <p>{review.text}</p>
                    </div>

                )}
            </Slider>
        </div>

)};

export default Review;