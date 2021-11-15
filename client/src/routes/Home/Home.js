import React, {useEffect, useState} from 'react';
import Board from "../../components/Board/Board";
import Axios from "axios";
import TextEditor from "../../components/TextEditor/TextEditor";
import styles from './home.module.css';

const Home = (props) => {
    const [writing, setWriting] = useState(false);
    const [viewContent,setViewContent] = useState([])
    const onWriteClick = () => {
        setWriting(prev=>!prev)
    }

    useEffect(()=>{
        Axios.get('http://localhost:8080/api/get').then((response)=>
            setViewContent(response.data)
        )
    },[viewContent])

    return(
        <main className={styles.main}>
            <section className={styles.section}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Notice</h1>
                </header>
                { writing && <TextEditor isEdit={false} /> }
                <ul className={styles.list}>
                    {viewContent.map((content,index) =>
                        <li key={index} className={styles.item}>
                            <Board content={content} />
                        </li>
                    )}
                </ul>
                <div className={styles.btnContainer}>
                    <button className={styles.btn} onClick={onWriteClick}>{writing ? "작성 취소" : "글 작성하기"}</button>
                </div>
            </section>
        </main>
    );
}
export default Home;