import React, {useCallback, useEffect, useState} from 'react';
import Slider from "react-slick";
import {Link} from "react-router-dom";
import Rate from "../Rate/Rate";
import styles from "../../routes/Gourmet/gourmet.module.css";
import timeFormatter from "../../util/date";
import TextEditor from "../TextEditor/TextEditor";

const Review = ({data, boardService, setBanner, setIsAlert}) => {
    const [isWrite, setIsWrite] = useState(false)
    const settings = {
        dots: true,
        arrows: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,

    };
    const onWriteClick=()=>{
        setIsWrite(prev=>!prev)
    }
    return(
        <div className={styles.slick}>
            <div className={styles.buttonContainer}>
                <Link to="./reviews">
                    <button>전체보기 / 작성하기</button>
                </Link>
            </div>
            <h2 className={styles.slickTitle}>최근 등록 리뷰</h2>
            <Slider {...settings}>
                {data.slice(0,6).map((review)=>
                    <Link to={`./reviews/${review.id}`} key={review.id}>
                        <div className={styles.slickItem}>
                            <h2 className={styles.reviewTitle}>{review.title}</h2>
                            <Rate value={review.rate} />
                            <div className={styles.reviewMeta}>
                                <span>{timeFormatter(review.date)}</span>
                                <span>{review.owner}</span>
                            </div>
                            <span className={styles.hoverBtn}>리뷰 보기</span>
                        </div>
                    </Link>
                )}
            </Slider>
            {isWrite &&
            <div className={styles.popup}>
                <TextEditor
                    setIsAlert={setIsAlert}
                    setBanner={setBanner}
                    boardService={boardService}
                    onWriteClick={onWriteClick}
                />
            </div>}
        </div>

)};

export default Review;