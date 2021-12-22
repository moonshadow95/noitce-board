import React, {useEffect} from 'react';
import styles from './gourmet.module.css'
import {useNavigate} from "react-router-dom";
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Gourmet = ({authService}) => {
    const navigate = useNavigate();
    const settings = {
        dots: true,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };
    useEffect(()=>{
        authService.me().catch(err => navigate('/'))
    },[])
    return(
        <section className={styles.slickContainer}>
            <div className={styles.slick}>
                <h2 className={styles.slickTitle}>최근 등록 리뷰</h2>
                <Slider {...settings}>
                    <div className={styles.slickItem}>
                        <h3>1</h3>
                    </div>
                    <div className={styles.slickItem}>
                        <h3>2</h3>
                    </div>
                    <div className={styles.slickItem}>
                        <h3>3</h3>
                    </div>
                    <div className={styles.slickItem}>
                        <h3>4</h3>
                    </div>
                    <div className={styles.slickItem}>
                        <h3>5</h3>
                    </div>
                    <div className={styles.slickItem}>
                        <h3>6</h3>
                    </div>
                </Slider>
            </div>
            <div className={styles.slick}>
                <h2 className={styles.slickTitle}>최근 등록 맛집</h2>
                <Slider {...settings}>
                    <div className={styles.slickItem}>
                        <h3>1</h3>
                    </div>
                    <div className={styles.slickItem}>
                        <h3>2</h3>
                    </div>
                    <div className={styles.slickItem}>
                        <h3>3</h3>
                    </div>
                    <div className={styles.slickItem}>
                        <h3>4</h3>
                    </div>
                    <div className={styles.slickItem}>
                        <h3>5</h3>
                    </div>
                    <div className={styles.slickItem}>
                        <h3>6</h3>
                    </div>
                </Slider>
            </div>
        </section>

)};

export default Gourmet;