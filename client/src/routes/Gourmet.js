import React, {useCallback, useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Review from "../components/Review/Review";
import Shop from "../components/Shop/Shop";

const Gourmet = ({authService, boardService}) => {
    const navigate = useNavigate();
    const location = useLocation().pathname
    const [shops, setShops] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    const getBoards = useCallback(async () => {
        const response = await boardService.getBoard(null, location)
        setShops(prev => [...response])
        return setIsLoading(false)
    }, [boardService])

    const getReviews = useCallback(async () => {
        const response = await boardService.getReviews()
        setReviews(prev => [...response])
        return setIsLoading(false)
    }, [boardService])

    useEffect(() => {
        getBoards()
        getReviews()
    }, [getBoards, getReviews, window.location])
    useEffect(() => {
        authService.me().catch(err => navigate('/'))
    }, [authService, navigate])

    return (
        <section className='xl:mt-[94px] mt-[100px]'>
            <Review reviews={reviews} isLoading={isLoading}/>
            <Shop shops={shops} isLoading={isLoading}/>
        </section>
    )
};

export default Gourmet;