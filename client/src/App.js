import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {useEffect, useState} from "react";
import ReactHtmlParser from 'html-react-parser';
import Axios from "axios";

function App() {
    const [content, setContent] = useState({
        title:'',
        text:''
    })
    const [viewContent,setViewContent] = useState([])

    const onChange = event => {
        const {name, value} = event.target
        setContent({...content, [name]:value})
    }
    const onClick = () => {
        Axios.post('http://localhost:8080/api/insert', {
            title: content.title,
            text: content.text
        }).then(()=> alert('저장되었습니다!'))
    }

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
                <aside style={{width:'100%'}}>
                    {viewContent.map((element,index) =>
                        <div key={index}>
                            <h2>{element.title}</h2>
                            {ReactHtmlParser(element.text)}
                            <small>{element.createdAt}</small>
                        </div>
                    )}
                </aside>
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
