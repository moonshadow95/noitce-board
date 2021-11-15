import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Axios from "axios";

const TextEditor = ({isEdit, selected}) => {
    const [newTitle, setNewTitle] = useState()
    const [content, setContent] = useState()
    const navigate = useNavigate();

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
        }).then(() => {
            alert('저장되었습니다.')
        })
    }

    // Edit
    const onEdit  = (event) => {
        const {value} = event.target;
        setNewTitle(value)
    }
    const onEditSubmit = () => {
        setContent({...content},)
        Axios.post(`http://localhost:8080/api/edit/${selected.id}`, {
            title: newTitle,
            text: content.text,
        }).then((result)=>{
            navigate("/")
        })
    }

    useEffect(()=>{
        if(isEdit) {
            setContent({
                title: '',
                text: '',
                createdAt: '',
            })
            setNewTitle(selected.title)
        }
        else{
            setContent(selected)
        }
    },[])


    return (
        <>
            { isEdit ?
                // 글 수정
                <>
                    <div style={{color: '#000'}}>
                        <input type="text" placeholder='제목을 입력하세요.' value={newTitle || ''} name='title' onChange={onEdit}/>
                        <CKEditor
                            editor={ClassicEditor}
                            data={selected.text}
                            onChange={(event, editor) => {
                        const data = editor.getData();
                        setContent({...content, text: data})
                    }}
                        />
                    </div>
                    <button onClick={onEditSubmit}>완료</button>
                </> :
                // 글 작성
                <>
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
                    <div>
                        <button onClick={onSubmit}>완료</button>
                    </div>
                </>}
        </>
)};

export default TextEditor;