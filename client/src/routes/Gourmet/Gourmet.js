import React, {useCallback, useEffect, useState} from 'react';
import styles from './gourmet.module.css'
import {useNavigate} from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Review from "../../components/Review/Review";
import Shop from "../../components/Shop/Shop";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const Gourmet = ({authService, boardService, setIsAlert, setBanner}) => {
    const navigate = useNavigate();
    const [shops, setShops] = useState([]);
    const [reviews, setReviews] = useState([]);

    const getBoards = useCallback(async() => {
        const response = await boardService.getBoard()
        return setShops(prev=> [...response])
    },[boardService])

    const getReviews = useCallback(async() => {
        const response = await boardService.getReviews()
        return setReviews(prev=> [...response])
    },[boardService])

    useEffect(()=>{
        getBoards()
        getReviews()
    },[getBoards,getReviews])
    useEffect(()=>{
        authService.me().catch(err => navigate('/'))
    },[authService,navigate])
    return(
        <>{(shops || reviews) ?
            <section className={styles.slickContainer}>
                <Review
                    data={reviews}
                    boardService={boardService}
                    setIsAlert={setIsAlert}
                    setBanner={setBanner}
                />
                <Shop data={shops}/>
            </section>:
            <LoadingSpinner/>
        }</>

)};

export default Gourmet;