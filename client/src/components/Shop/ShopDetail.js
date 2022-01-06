import React, {useCallback, useEffect, useState} from 'react';
import Board from "../Board/Board";
import {useNavigate} from "react-router-dom";
import styles from "../Board/board.module.css";
import MapContainer from "../Map/MapContainer";
import BoardItem from "../Board/BoardItem";
import TextEditor from "../TextEditor/TextEditor";
import Paging from "../Paging/Paging";

const ShopDetail = ({user, authService, boardService}) => {
    const [isAuth, setIsAuth] = useState(undefined)
    const [writing, setWriting] = useState(false)
    const [viewContent,setViewContent] = useState([])
    const [titleAndCoords,setTitleAndCoords] = useState([])
    const [page, setPage] = useState(1)
    const [keyword, setKeyword] = useState('');
    const [placeObj, setPlaceObj] = useState()
    const navigate = useNavigate()
    const isShops = window.location.href.includes('shops')
    const itemsPerPage = 12
    const onWriteClick = () => {
        setKeyword('')
        setWriting(prev=>!prev)
    }
    const pagination = (array, page, itemsPerPage) =>
        array.slice((page-1)*itemsPerPage, (page-1)*itemsPerPage+itemsPerPage)

    // 게시판 가져오기
    const getBoards = useCallback(async() => {
        const response = await boardService.getBoard()
        if(isShops){
            const data = response.map(item=>{
                const titles=item.title;
                const coords=item.coords.split(',');
                return {title:titles, coords:coords.map(item=>parseFloat(item))}
            })
            // setTitleAndCoords([...data])
        }
        return setViewContent(prev=> [...response])
    },[boardService, isShops])

    useEffect( ()=>{
        getBoards()
        setIsAuth(prev=>user)
    },[getBoards,user,placeObj])

    // 로그인 확인
    useEffect(()=>{
        authService.me().catch(err => navigate('/'))
    },[authService,navigate])

    return(
        <main className={`${styles.main} ${isShops && styles.shopsMain}`}>
            {/*{isShops &&*/}
            {/*<MapContainer*/}
            {/*    keyword={keyword}*/}
            {/*    setKeyword={setKeyword}*/}
            {/*    setPlaceObj={setPlaceObj}*/}
            {/*    titleAndCoords={titleAndCoords}*/}
            {/*/>}*/}
            <section className={styles.section}>
                <>
                    <ul className={styles.list}>
                        {pagination(viewContent, page, itemsPerPage).map((content,index) =>
                            <li key={index} className={styles.item}>
                                <BoardItem content={content} />
                            </li>
                        )}
                    </ul>
                    {writing ?
                        <TextEditor
                            isEdit={false}
                            onWriteClick={onWriteClick}
                            boardService={boardService}
                            getBoards={getBoards}
                            user={user}
                            keyword={keyword}
                            setKeyword={setKeyword}
                            placeObj={placeObj}
                        /> :
                        <div className="btnContainer noBorder">
                            <button className={styles.btn} onClick={onWriteClick}>
                                {isShops ? '맛집 검색' : '글 작성하기'}
                            </button>
                        </div>}
                    <Paging
                        page={page}
                        setPage={setPage}
                        totalCount={viewContent.length}
                        itemsPerPage={itemsPerPage}
                    />
                </>
            </section>
        </main>
    )};

export default ShopDetail;