import React, {useEffect, useState} from 'react';
import { useParams} from "react-router-dom";
import Selected from "../../components/Selected/Selected";
import NotFound from "../NotFound/NotFound";
import styles from './read.module.css';
import Axios from "axios";

const Read = (props) => {
    const {id} = useParams();
    const [selected, setSelected] = useState('');
    const [loading, setLoading] = useState(true)
    // Get Headers

    async function getSelected(id){
        const response = await Axios({
            method:'GET',
            url:`http://localhost:8080/boards/get/${id}`,
        })
        setSelected(response.data)
        setLoading(prev=>!prev)
    }
    useEffect(()=>{
        getSelected(id)
        // setSelected(viewContent.find((item)=> item.id === parseInt(id)))
        // if(!selected){
        //     navigate('/')
        //     window.location.reload()
        // }
    },[])
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
            selected ? <Selected selected={selected}/> :
                <NotFound />
    );
}

export default Read;