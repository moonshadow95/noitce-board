import React, {useEffect, useState} from 'react';
import Board from "../../components/Board/Board";
import TextEditor from "../../components/TextEditor/TextEditor";
import styles from './home.module.css';
import Axios from "axios";
import Auth from "../../components/Auth/Auth";

const Home = ({boardContent}) => {
    const [isAuth, setIsAuth] = useState(false)
    const [writing, setWriting] = useState(false);
    const [viewContent,setViewContent] = useState(boardContent)
    const onWriteClick = () => {
        setWriting(prev=>!prev)
    }
    useEffect(()=>{
        Axios.get('http://localhost:8080/boards/get').then((response)=>
            setViewContent(response.data)
        )
    },[])
    return(
        <main className={styles.main}>
            { isAuth ?
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
                <Auth />
            }
        </main>
    );
}
export default Home;