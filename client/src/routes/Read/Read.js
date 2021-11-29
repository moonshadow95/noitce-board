import React, {useCallback, useEffect, useState} from 'react';
import { useParams} from "react-router-dom";
import Selected from "../../components/Selected/Selected";
import NotFound from "../NotFound/NotFound";
import styles from './read.module.css';
import Axios from "axios";
import {useNavigate} from "react-router-dom";

const Read = ({authService, setBanner, setIsAlert}) => {
    const {id} = useParams();
    const [selected, setSelected] = useState('');
    const [loading, setLoading] = useState(true);
    const [isOwner, setIsOwner] = useState(false);
    const navigate = useNavigate();
    // Get Headers
    const getHeaders = () => {
        const token = localStorage.getItem('token')
        return {
            Authorization: `Bearer ${token}`
        }
    }
    const getSelected = useCallback(async(id) =>{
        const response = await Axios({
            method:'GET',
            url:`http://localhost:8080/boards/get/${id}`,
            headers: getHeaders()
        })
        if(response.data.isOwner === true){
            setIsOwner(prev => !prev)
        }
        setSelected(response.data)
        return setLoading(prev=>!prev)
    },[])
    useEffect(()=>{
        authService.me().then(r => getSelected(id)).catch(err => navigate('/'))
    },[authService,id,navigate, getSelected])
    return (
        loading ?
            <div className={styles.container}>
                <div className={styles.spinner}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>:
            selected ? <Selected
                    selected={selected}
                    isOwner={isOwner}
                    setBanner={setBanner}
                    setIsAlert={setIsAlert}/> :
                <NotFound />
    );
}

export default Read;