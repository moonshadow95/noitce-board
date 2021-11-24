import React, {useEffect, useState} from 'react';
import Board from "../../components/Board/Board";
import TextEditor from "../../components/TextEditor/TextEditor";
import styles from './home.module.css';
import Axios from "axios";
import Auth from "../../components/Auth/Auth";

const Home = ({user, authService, boardContent}) => {
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
    async function getBoards() {
        const response = await Axios({
            method: "GET",
            url: 'http://localhost:8080/boards/get',
            headers: getHeaders(),
        })
        setViewContent(response.data)
    }
    useEffect(()=>{
        getBoards().then(r => r)
        setIsAuth(user)
    },[user])
    return(
        <main className={styles.main}>
            { isAuth !== undefined ?
                <section className={styles.section}>
                    <header className={styles.header}>
                        <h1 className={styles.title}>ictus</h1>
                    </header>
                    <ul className={styles.list}>
                        {viewContent.map((content,index) =>
                            <li key={index} className={styles.item}>
                                <Board content={content} />
                            </li>
                        )}
                    </ul>
                    { writing && <TextEditor isEdit={false}  onWriteClick={onWriteClick}/> }
                    { !writing && <div className="btnContainer noBorder">
                        <button className={styles.btn} onClick={onWriteClick}>글 작성하기</button>
                    </div>}
                </section> :
                <Auth setIsAuth={setIsAuth} authService={authService}/>
            }
        </main>
    );
}
export default Home;