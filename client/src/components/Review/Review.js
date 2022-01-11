import React, {useState} from 'react';
import Slider from "react-slick";
import {Link} from "react-router-dom";
import Rate from "../Rate/Rate";
import styles from "../../routes/Gourmet/gourmet.module.css";
import timeFormatter from "../../util/date";
import TextEditor from "../TextEditor/TextEditor";
import HTMLReactParser from "html-react-parser";

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
            <h2 className={styles.slickTitle}>최근 등록 리뷰</h2>
            <Slider {...settings}>
                {data.slice(0,6).map((review)=>
                    <Link to={`./shops/${review.shopId}`} key={review.id}>
                        <div className={styles.slickItem}>
                            <h2 className={styles.reviewText}>{HTMLReactParser(review.text)}</h2>
                            <Rate value={review.rate} />
                            <div className={styles.reviewMeta}>
                                <span>{timeFormatter(review.date)}</span>
                                <span>{review.username}</span>
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