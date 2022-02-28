import React, {useCallback, useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
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

    // 게시판 가져오기
    const getBoards = useCallback(async () => {
        const response = await boardService.getBoard(null, location)
        setShops(prev => [...response])
        return setIsLoading(false)
    }, [boardService])
    // 리뷰 가져오기
    const getReviews = useCallback(async () => {
        const response = await boardService.getReviews()
        setReviews(prev => [...response])
        return setIsLoading(false)
    }, [boardService])

    useEffect(() => {
        getBoards()
        getReviews()
    }, [getBoards, getReviews])

    useEffect(() => {
        authService.me().catch(err => navigate('/'))
    }, [authService, navigate])

    return (
        <section className='xl:mt-[94px] mt-[80px] md:mt-[100px]'>
            <Link to='./shops'>
                <button
                    className='block button-common sm:absolute right-0 z-10 button-animation w-[190px] md:w-auto text-center mx-auto mb-4 md:mr-24 xl:mr-40'>
                    전체보기 / 등록하기
                </button>
            </Link>
            <Review reviews={reviews} isLoading={isLoading}/>
            <Shop shops={shops} isLoading={isLoading}/>
        </section>
    )
};

export default Gourmet;