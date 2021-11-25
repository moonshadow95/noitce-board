import React, {useEffect, useState} from 'react';
import { useParams} from "react-router-dom";
import Selected from "../../components/Selected/Selected";
import NotFound from "../NotFound/NotFound";
import styles from './read.module.css';
import Axios from "axios";

const Read = (props) => {
    const {id} = useParams();
    const [selected, setSelected] = useState('');
    const [loading, setLoading] = useState(true);
    const [isOwner, setIsOwner] = useState(false);
    // Get Headers
    const getHeaders = () => {
        const token = localStorage.getItem('token')
        return {
            Authorization: `Bearer ${token}`
        }
    }
    async function getSelected(id){
        const response = await Axios({
            method:'GET',
            url:`http://localhost:8080/boards/get/${id}`,
            headers: getHeaders()
        })
        setSelected(response.data)
        setLoading(prev=>!prev)
        if(response.data.isOwner === true){
            setIsOwner(prev => !prev)
        }
    }
    useEffect(()=>{
        getSelected(id)
    },[id])
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
            selected ? <Selected selected={selected} isOwner={isOwner}/> :
                <NotFound />
    );
}

export default Read;