import React, {useEffect} from 'react';
import styles from './gourmet.module.css'
import {useNavigate} from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Review from "../../components/Review/Review";
import Shop from "../../components/Shop/Shop";

const Gourmet = ({authService, data}) => {

    const navigate = useNavigate();
    useEffect(()=>{
        authService.me().catch(err => navigate('/'))
    },[])
    return(
        <section className={styles.slickContainer}>
            <Review data={data}/>
            <Shop data={data}/>
        </section>

)};

export default Gourmet;