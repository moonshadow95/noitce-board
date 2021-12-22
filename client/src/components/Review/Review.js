import React from 'react';
import styles from "../../routes/Gourmet/gourmet.module.css";
import Slider from "react-slick";
import StarRatingComponent from 'react-star-rating-component-new';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";


const Review = (props) => {
    const reviewDB=[
        {
            id:1,
            name:'회랑 스시랑',
            rate:5,
            text:'안고, 내는 못할 평화스러운 산야에 인도하겠다는 않는 황금시대다. 없는 작고 희망의 얼음 쓸쓸하랴? 때까지 인생의 청춘은 철환하였는가?'
        },
        {
            id:2,
            name:'미카',
            rate:3,
            text:'사람은 간에 넣는 사막이다. 유소년에게서 청춘의 인생을 목숨을 끓는다.'
        },
        {
            id:3,
            name:'롤로랄라',
            rate:4,
            text:'넣는 산야에 수 황금시대다. 가진 미인을 귀는 품에 트고, 가장 이 간에 꽃이 아름다우냐? 스며들어 바로 우리 것이다. 실현에 과실이 무엇을 봄바람이다.'
        },
        {
            id:4,
            name:'벤티프레소',
            rate:1,
            text:'넣는 산야에 수 황금시대다. 가진 미인을 귀는 품에 트고, 가장 이 간에 꽃이 아름다우냐? 스며들어 바로 우리 것이다. 실현에 과실이 무엇을 봄바람이다.'
        },
        {
            id:5,
            name:'카레공방',
            rate:2,
            text:'넣는 산야에 수 황금시대다. 가진 미인을 귀는 품에 트고, 가장 이 간에 꽃이 아름다우냐? 스며들어 바로 우리 것이다. 실현에 과실이 무엇을 봄바람이다.'
        },
        {
            id:6,
            name:'청년다방',
            rate:3,
            text:'넣는 산야에 수 황금시대다. 가진 미인을 귀는 품에 트고, 가장 이 간에 꽃이 아름다우냐? 스며들어 바로 우리 것이다. 실현에 과실이 무엇을 봄바람이다.'
        },
    ]
    const settings = {
        dots: true,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };
    return(
        <div className={styles.slick}>
            <h2 className={styles.slickTitle}>최근 등록 리뷰</h2>
            <Slider {...settings}>
                {reviewDB.map((review)=>
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
                        <p>{review.text}</p>
                    </div>

                )}
            </Slider>
        </div>
)};

export default Review;