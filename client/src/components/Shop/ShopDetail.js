import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Selected from "../Selected";

const ShopDetail = ({user, authService, boardService, setIsAlert, setBanner}) => {
    const [shop, setShop] = useState({})
    const [reviews, setReviews] = useState([])
    const [isOwner] = useState(false)
    const {id} = useParams()
    const navigate = useNavigate()

    // 해당 가게의 리뷰 가져오기
    const getReviews = useCallback(async (id) => {
        const response = await boardService.getReviews(id)
        return setReviews(response)
    }, [boardService])

    // 해당 가게 정보 가져오기
    const getShopDetail = useCallback(async (id) => {
        try {
            const response = await boardService.getBoard(id, '/gourmet')
            return setShop(prev => response)
        } catch (error) {
            setBanner('등록되지 않은 가게입니다.')
            navigate('/gourmet')
        }
    }, [boardService, setBanner, navigate])

    useEffect(() => {
        getShopDetail(id)
        getReviews(id)
    }, [getShopDetail, id, getReviews, user])

    // 로그인 확인
    useEffect(() => {
        authService.me().catch(err => navigate('/'))
    }, [authService, navigate])


    return (
        <Selected
            boardService={boardService}
            authService={authService}
            isOwner={isOwner}
            selected={shop}
            shopReviews={reviews}
            user={user}
            getReviews={getReviews}
            setBanner={setBanner}
            setIsAlert={setIsAlert}
        />
    )
};

export default ShopDetail;