import React, {useState} from 'react';
import Slider from "react-slick";
import {Link} from "react-router-dom";
import Rate from "../Rate/Rate";
import styles from "../../routes/Gourmet/gourmet.module.css";
import timeFormatter from "../../util/date";
import TextEditor from "../TextEditor/TextEditor";
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
                settings:{
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 768,
                settings:{
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 426,
                settings:{
                    slidesToShow: 1,
                }
            }
        ]
    }
    const onWriteClick=()=>{
        setIsWrite(prev=>!prev)
    }
    return(
        <div className={styles.slick}>
            <h2 className={styles.slickTitle}>최근 등록 리뷰</h2>
            <div className={styles.buttonContainer}>
                <Link to='./shops'>
                    <button>전체보기 / 등록하기</button>
                </Link>
            </div>
            <span className={styles.caption}>리뷰 클릭시 가게 정보로 이동합니다.</span>
            <Slider {...settings}>
                {reviews.slice(0,6).map((review)=>
                    <Link to={`./shops/${review.shopId}`} key={review.id}>
                        <div className={styles.slickItem}>
                            <h2 className={styles.reviewText}>{HTMLReactParser(review.text)}</h2>
                            <Rate value={review.rate} size={'lg'}/>
                            <div className={styles.reviewMeta}>
                                <span>{timeFormatter(review.date)}</span>
                                <span>{review.username}</span>
                            </div>
                            <span className={styles.hoverBtn}>리뷰 보기</span>
                        </div>
                    </Link>
                )}
            </Slider>
        </div>

)};

export default Review;