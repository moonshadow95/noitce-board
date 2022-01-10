import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Selected from "../Selected/Selected";

const ShopDetail = ({shops,user, authService, boardService}) => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [shop, setShop] = useState({})
    const [reviews, setReviews] = useState([]);

    // 해당 가게의 리뷰 가져오기
    const getReviews = useCallback(async(id) => {
        const response = await boardService.getReviews(id)
        return setReviews(response)
    },[boardService])

    const getShops = useCallback(async() => {
        try{
            const response = await boardService.getBoard(id)
            return setShop(prev=> response)
        }catch(error){
            navigate(-1)
            console.log(error.message)
        }
        return shop
    },[boardService])

    useEffect(()=>{
        getShops(id)
        getReviews(id)
    },[getShops, id])

    return(
        <Selected selected={shop} shopReviews={reviews} user={user}/>
    )};

export default ShopDetail;