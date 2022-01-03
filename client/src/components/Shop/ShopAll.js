import React, {useCallback, useEffect, useState} from 'react';
import Board from "../Board/Board";
import MapContainer from "../Map/MapContainer";

const ShopAll = ({user, authService, boardService, setBanner, setIsAlert}) => {
    const [titleAndCoords,setTitleAndCoords] = useState([])
    // 게시판 가져오기
    const getBoards = useCallback(async() => {
        const response = await boardService.getBoard()
        const data = response.map(item=>{
            const titles=item.title;
            const coords=item.coords.split(',');
            return {title:titles, coords:coords.map(item=>parseFloat(item))}
        })
        return setTitleAndCoords([...data])
    },[boardService])

    useEffect( ()=> {
        getBoards()
        console.log(titleAndCoords)

    },[getBoards])
    return (
        <>
            <MapContainer searchPlace={{name:'',id:''}} titleAndCoords={titleAndCoords}/>
            <Board user={user}
                   authService={authService}
                   boardService={boardService}
                   setBanner={setBanner}
                   setIsAlert={setIsAlert}
            />
        </>
)};

export default ShopAll;