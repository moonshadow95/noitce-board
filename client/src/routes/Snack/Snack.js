import React, {useCallback, useEffect, useState} from 'react';
import Board from "../../components/Board/Board";
import TextEditor from "../../components/TextEditor/TextEditor";
import styles from './snack.module.css';
import Axios from "axios";
import Paging from "../../components/Paging/Paging";
import {useNavigate} from "react-router-dom";

const Snack = ({user, authService, setBanner, setIsAlert, boardContent}) => {
    const [isAuth, setIsAuth] = useState(undefined)
    const [writing, setWriting] = useState(false)
    const [viewContent,setViewContent] = useState(boardContent)
    const [page, setPage] = useState(1)
    const navigate = useNavigate();
    const itemsPerPage = 12
    const onWriteClick = () => {
        setWriting(prev=>!prev)
    }
    // Get Headers
    const getHeaders = () => {
        const token = localStorage.getItem('token')
        return {
            Authorization: `Bearer ${token}`
        }
    }
    const getBoards = useCallback(async() => {
        const response = await Axios({
            method: "GET",
            url: 'http://localhost:8080/boards/get',
            headers: getHeaders(),
        })
        return setViewContent(prev=> [...response.data])
    },[])
    useEffect(()=>{
        authService.me().catch(err => navigate('/'))
    },[])
    useEffect( ()=>{
        getBoards()
        setIsAuth(prev=>user)
    },[getBoards,user])
    const pagination = (array, page, itemsPerPage) =>
        array.slice((page-1)*itemsPerPage, (page-1)*itemsPerPage+itemsPerPage)

    return(
        <main className={styles.main}>
            <section className={styles.section}>
                <>
                    <ul className={styles.list}>
                        {pagination(viewContent, page, itemsPerPage).map((content,index) =>
                            <li key={index} className={styles.item}>
                                <Board content={content} />
                            </li>
                        )}
                    </ul>
                    { writing && <TextEditor
                        isEdit={false}
                        onWriteClick={onWriteClick}
                        getBoards={getBoards}
                        user={user}
                        setBanner={setBanner}
                        setIsAlert={setIsAlert}/> }
                    { !writing && <div className="btnContainer noBorder">
                        <button className={styles.btn} onClick={onWriteClick}>글 작성하기</button>
                    </div>}
                    <Paging page={page} setPage={setPage} totalCount={boardContent.length} itemsPerPage={itemsPerPage}/>
                </>
            </section>
        </main>
    );
}
export default Snack;