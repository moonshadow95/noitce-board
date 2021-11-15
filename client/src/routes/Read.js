import React, {useEffect, useState} from 'react';
import { useParams} from "react-router-dom";
import Selected from "../components/Selected";
import NotFound from "./NotFound";

const Read = ({viewContent}) => {
    const [selected, setSelected] = useState();
    const [loading, setLoading] = useState(true)
    const {id} = useParams();
    useEffect(()=>{
        setSelected(viewContent.find((item)=> item.id === parseInt(id)))
        setLoading(prev=>!prev)
    },[id])

    return (
        loading ? <span>Loading...</span> :
            selected ? <Selected selected={selected}/> :
                <NotFound />
    );
}

export default Read;