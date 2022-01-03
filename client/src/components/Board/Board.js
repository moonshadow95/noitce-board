import React, {useCallback, useEffect, useState} from 'react';
import styles from "../../routes/Snack/snack.module.css";
import BoardItem from "./BoardItem";
import TextEditor from "../TextEditor/TextEditor";
import Paging from "../Paging/Paging";
import {useNavigate} from "react-router-dom";
import MapContainer from "../Map/MapContainer";

const Board = ({user, authService, boardService, setBanner, setIsAlert}) => {
    const [isAuth, setIsAuth] = useState(undefined)
    const [writing, setWriting] = useState(false)
    const [viewContent,setViewContent] = useState([])
    const [titleAndCoords,setTitleAndCoords] = useState([])
    const [page, setPage] = useState(1)
    const navigate = useNavigate();
    const isShop = window.location.href.includes('shops')
    const itemsPerPage = 12
    const onWriteClick = () => {
        setWriting(prev=>!prev)
    }
    const pagination = (array, page, itemsPerPage) =>
        array.slice((page-1)*itemsPerPage, (page-1)*itemsPerPage+itemsPerPage)

    // 게시판 가져오기
    const getBoards = useCallback(async() => {
        const response = await boardService.getBoard()
        if(isShop){
            const data = response.map(item=>{
                const titles=item.title;
                const coords=item.coords.split(',');
                return {title:titles, coords:coords.map(item=>parseFloat(item))}
            })
            setTitleAndCoords([...data])}
        return setViewContent(prev=> [...response])
    },[boardService])

    useEffect( ()=>{
        getBoards()
        setIsAuth(prev=>user)
    },[getBoards,user])
    // 로그인 확인
    useEffect(()=>{
        authService.me().catch(err => navigate('/'))
    },[authService,navigate])

    return(
        <main className={`${styles.main} ${isShop && styles.shopsMain}`}>
            { isShop &&
            <MapContainer searchPlace={{name:'',id:''}} titleAndCoords={titleAndCoords}/>}
            <section className={styles.section}>
                <>
                    <ul className={styles.list}>
                        {pagination(viewContent, page, itemsPerPage).map((content,index) =>
                            <li key={index} className={styles.item}>
                                <BoardItem content={content} />
                            </li>
                        )}
                    </ul>
                    { writing && <TextEditor
                        isEdit={false}
                        onWriteClick={onWriteClick}
                        boardService={boardService}
                        getBoards={getBoards}
                        user={user}
                        setBanner={setBanner}
                        setIsAlert={setIsAlert}/> }
                    { !writing && <div className="btnContainer noBorder">
                        <button className={styles.btn} onClick={onWriteClick}>글 작성하기</button>
                    </div>}
                    <Paging page={page} setPage={setPage} totalCount={viewContent.length} itemsPerPage={itemsPerPage}/>
                </>
            </section>
        </main>
)};

export default Board;