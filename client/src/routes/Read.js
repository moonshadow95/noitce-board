import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Selected from "../components/Selected";
import LoadingSpinner from "../components/LoadingSpinner";
import {useNavigate} from "react-router-dom";

const Read = ({user, authService, setBanner, setIsAlert, boardService}) => {
    const {id} = useParams();
    const [selected, setSelected] = useState('');
    const [isOwner, setIsOwner] = useState(false);
    const navigate = useNavigate();

    // 선택된 게시물 가져오기
    const getSelected = useCallback(async (id) => {
        const response = await boardService.getBoard(id)
        if (response.isOwner === true) {
            setIsOwner(true)
        }
        return setSelected(response)
    }, [boardService])
    useEffect(() => {
        authService.me()
            .then(r => getSelected(id))
            .catch(err => {
                navigate('/')
                window.location.reload();
            })
    }, [authService, id, navigate, getSelected])
    return (
        selected ?
            <Selected
                user={user}
                selected={selected}
                isOwner={isOwner}
                setBanner={setBanner}
                setIsAlert={setIsAlert}
                boardService={boardService}
            /> :
            <LoadingSpinner/>
    );
}

export default Read;