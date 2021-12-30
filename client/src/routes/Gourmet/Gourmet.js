import React, {useCallback, useEffect, useState} from 'react';
import styles from './gourmet.module.css'
import {useNavigate} from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Review from "../../components/Review/Review";
import Shop from "../../components/Shop/Shop";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const Gourmet = ({authService, boardService}) => {
    const navigate = useNavigate();
    const [data, setData] = useState();

    const getBoards = useCallback(async() => {
        const response = await boardService.getBoard()
        return setData(prev=> [...response])
    },[boardService])
    useEffect(()=>{
        getBoards()
    },[])
    useEffect(()=>{
        authService.me().catch(err => navigate('/'))
    },[authService,navigate])
    return(
        <>{data ?
            <section className={styles.slickContainer}>
                <Review data={data}/>
                <Shop data={data}/>
            </section>:
            <LoadingSpinner/>
        }</>

)};

export default Gourmet;