import React, {useCallback, useEffect, useState} from 'react';
import Board from "../../components/Board/Board";
import TextEditor from "../../components/TextEditor/TextEditor";
import styles from './home.module.css';
import Axios from "axios";
import Auth from "../../components/Auth/Auth";

const Home = ({user, authService, setBanner, setIsAlert, boardContent}) => {
    const [isAuth, setIsAuth] = useState(undefined)
    const [writing, setWriting] = useState(false);
    const [viewContent,setViewContent] = useState(boardContent)
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
    useEffect( ()=>{
        getBoards()
        setIsAuth(prev=>user)
    },[getBoards,user])
    return(
        <main className={styles.main}>
            <div className={styles.header}>
                <h1 className={styles.title}>ictus</h1>
            </div>
            <section className={styles.section}>
                { isAuth !== undefined ?
                    <>
                        <ul className={styles.list}>
                            {viewContent.map((content,index) =>
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
                    </>
                    : <Auth setIsAuth={setIsAuth} authService={authService} setBanner={setBanner} setIsAlert={setIsAlert}/>
                }
            </section>
        </main>
    );
}
export default Home;