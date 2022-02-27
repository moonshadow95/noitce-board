import React, {useCallback, useEffect, useState} from 'react';
import {useLocation, useParams} from "react-router-dom";
import Selected from "../components/Selected";
import LoadingSpinner from "../components/LoadingSpinner";
import {useNavigate} from "react-router-dom";

const Read = ({user, authService, setBanner, setIsAlert, boardService}) => {
    const {id} = useParams();
    const [selected, setSelected] = useState('');
    const [isOwner, setIsOwner] = useState(false);
    const navigate = useNavigate();
    const location = useLocation().pathname.includes('gourmet') ? '/gourmet' : '/snack'

    // 선택된 게시물 가져오기
    const getSelected = useCallback(async (id,location) => {
        const response = await boardService.getBoard(id, location)
        if (response.isOwner === true) {
            setIsOwner(true)
        }
        return setSelected(response)
    }, [boardService])
    useEffect(() => {
        authService.me()
            .then(r => getSelected(id,location))
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
                getSelected={getSelected}
            /> :
            <LoadingSpinner/>
    );
}

export default Read;