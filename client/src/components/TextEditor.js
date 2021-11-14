import React, {useRef, useState} from 'react';
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Axios from "axios";

const TextEditor = ({isEdit}) => {
    const [isEditing, setIsEditing] = useState(isEdit)
    const [content, setContent] = useState({
        title:'',
        text:'',
        createdAt:'',
    })

    const titleRef = useRef();

    // Input Text
    const onChange = event => {
        const {name, value} = event.target
        setContent({...content, [name]:value})
    }
    // Create
    const onSubmit = () => {
        Axios.post('http://localhost:8080/api/insert', {
            title: content.title,
            text: content.text,
            createdAt: content.createdAt
        }).then(() => alert('저장되었습니다.'))
    }

    // TODO
    // 수정하기를 누르면 선택된 게시물의 내용 텍스트 에디터에 받아오기
    return (
        <>
            { isEdit ? <>
                    <div style={{color: '#000'}}>
                        <input ref={titleRef} type="text" placeholder='제목을 입력하세요.' name='title' onChange={onChange}/>
                        <CKEditor
                            editor={ClassicEditor}
                            data=""
                            onChange={(event, editor) => {
                        const data = editor.getData();
                        setContent({...content, text: data})
                    }}
                        />
                    </div>
                    <button onClick={onSubmit}>완료</button>
                </> :
                <>
                    <div style={{color: '#000'}}>
                        <input ref={titleRef} type="text" placeholder='제목을 입력하세요.' name='title' onChange={onChange}/>
                        <CKEditor
                            editor={ClassicEditor}
                            data=""
                            onChange={(event, editor) => {
                            const data = editor.getData();
                            setContent({...content, text: data})
                        }}
                        />
                    </div>
                    <div>
                        <button onClick={onSubmit}>완료</button>
                    </div>
                </>}
        </>
)};

export default TextEditor;