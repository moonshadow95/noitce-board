import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {useEffect, useState} from "react";
import ReactHtmlParser from 'html-react-parser';
import Axios from "axios";

function App() {
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
    const onClick = () => {
        Axios.post('http://localhost:8080/api/insert', {
            title: content.title,
            text: content.text,
            createdAt: content.createdAt
        }).then(() => alert('저장되었습니다.'))
    }

    // Delete
    const onDeleteClick =(event)=>{
        const ok = window.confirm("삭제하시겠습니까?");
        if(ok){
            const {target:{id}} = event;
            Axios.post(`http://localhost:8080/api/delete/${id}`
            ).then(() => alert('삭제되었습니다.')
            )
        }
    }

    // Time Formatter
    const timeFormatter = (createdAt) => {
        const milliSeconds = new Date() - createdAt;
        const seconds = milliSeconds / 1000;
        if (seconds < 60) return `방금 전`;
        const minutes = seconds / 60;
        if (minutes < 60) return `${Math.floor(minutes)}분 전`;
        const hours = minutes / 60;
        if (hours < 24) return `${Math.floor(hours)}시간 전`;
        const days = hours / 24;
        if (days < 2) return `${Math.floor(days)}일 전`;
        if (days >= 2) {
            const dateObj = new Date(createdAt);
            const year = dateObj.getFullYear();
            const month = dateObj.getMonth() + 1;
            const date = dateObj.getDate();
            return `${year}년 ${month}월 ${date}일`;
        }
    };

    useEffect(()=>{
        Axios.get('http://localhost:8080/api/get').then((response)=>
            setViewContent(response.data)
        )
    },[viewContent])

    return (
        <main>
            <section>
                <header>
                    <h1>React Notice Board</h1>
                </header>
                {viewContent.map((element,index) =>
                    <aside key={index} style={{width:'100%'}}>
                        <div style={{display:'flex', justifyContent: 'space-between', alignItems:'center'}}>
                            <div>
                                <h2>{element.title}</h2>
                                {ReactHtmlParser(element.text)}
                                <small>{timeFormatter(new Date(element.createdAt))}</small>
                            </div>
                            <div>
                                <button id={index} onClick={onDeleteClick}>Delete</button>
                            </div>
                        </div>
                    </aside>
                )}
                <aside style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <div style={{color:'#000'}}>
                        <input type="text" placeholder='제목을 입력하세요.' name='title' onChange={onChange}/>
                        <CKEditor
                            editor={ClassicEditor}
                            data=""
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setContent({...content, text:data})
                            }}
                        />
                    </div>
                    <button onClick={onClick}>완료</button>
                </aside>
            </section>
        </main>
    );
}

export default App;
