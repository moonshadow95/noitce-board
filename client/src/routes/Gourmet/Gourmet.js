import React, {useEffect} from 'react';
import styles from './gourmet.module.css'
import {useNavigate} from "react-router-dom";
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Review from "../../components/Review/Review";
import Shop from "../../components/Shop/Shop";

const Gourmet = ({authService}) => {
    const navigate = useNavigate();
    useEffect(()=>{
        authService.me().catch(err => navigate('/'))
    },[])
    return(
        <section className={styles.slickContainer}>
            <Review />
            <Shop />
        </section>

)};

export default Gourmet;