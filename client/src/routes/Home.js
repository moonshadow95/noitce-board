import React, {useEffect, useState} from 'react';
import Board from "../components/Board";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Axios from "axios";
import {Link} from "react-router-dom";

const Home = (props) => {
    const [writing, setWriting] = useState(false);
    const [content, setContent] = useState({
        title:'',
        text:'',
        createdAt:'',
    })
    const [viewContent,setViewContent] = useState([])

    // Input Text
    const onChange = event => {
        const {name, value} = event.target
        setContent({...content, [name]:value})
    }
    // Create
    const onWriteClick = () => {
        setWriting(prev=>!prev)
    }
    const onSubmitClick = () => {
        Axios.post('http://localhost:8080/api/insert', {
            title: content.title,
            text: content.text,
            createdAt: content.createdAt
        }).then(() => alert('저장되었습니다.'))
    }


    useEffect(()=>{
        Axios.get('http://localhost:8080/api/get').then((response)=>
            setViewContent(response.data)
        )
    },[viewContent])

    return(
        <main>
            <section>
                <header>
                    <h1>React Notice Board</h1>
                </header>
                {viewContent.map((content,index) =>
                    <aside key={index} style={{width:'100%'}}>
                        <Link style={{width:'100%'}} to={`/read/:${content.id}`}>
                            <Board content={content} />
                        </Link>
                    </aside>
                )}
                { writing &&
                <aside style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <div style={{color: '#000'}}>
                        <input type="text" placeholder='제목을 입력하세요.' name='title' onChange={onChange}/>
                        <CKEditor
                            editor={ClassicEditor}
                            data=""
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setContent({...content, text: data})
                            }}
                        />
                    </div>
                    <button onClick={onSubmitClick}>완료</button>
                </aside>
                }
                <button onClick={onWriteClick}>{writing ? "작성 취소" : "글 작성하기"}</button>
            </section>
        </main>
    );
}
export default Home;