import React, {useEffect, useState} from 'react';
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Axios from "axios";
import styles from './textEditor.module.css';
import {useNavigate} from "react-router-dom";


const TextEditor = ({isEdit, selected, onCancelClick, onWriteClick}) => {
    const [newTitle, setNewTitle] = useState({selected})
    const [content, setContent] = useState()
    const navigate = useNavigate();

    // Input Text
    const onChange = event => {
        const {name, value} = event.target
        setContent({...content, [name]:value})
    }

    // Get Headers
    const getHeaders = () => {
        const token = localStorage.getItem('token')
        return {
            Authorization: `Bearer ${token}`
        }
    }

    // Create
    async function onSubmit(){
        await Axios({
            method:'POST',
            url: 'http://localhost:8080/boards/insert',
            data: {
                'title': content.title,
                'text': content.text,
            },
            headers: getHeaders()
        }).catch(error=>console.log(error.response.data.message))
    }
    // Edit
    const onEdit  = (event) => {
        const {value} = event.target;
        setNewTitle(value)
    }
    async function onEditSubmit(){
        setContent({...content},)
        const response = await Axios({
            method:'PUT',
            url:`http://localhost:8080/boards/edit/${selected.id}`,
            data:{
                'title': newTitle,
                'text': content.text
            },
            headers:getHeaders(),
        })
        console.log(response)
        alert('수정되었습니다.')
        navigate(`/read/${selected.id}`);
    }

    useEffect(()=>{
        if(isEdit) {
            setContent({
                title: selected.title,
                text: selected.text,
                createdAt: '',
            })
            setNewTitle(selected.title)
        }
        else{
            setContent(selected)
        }
    }, [isEdit, selected])


    return (
        <>
            { isEdit ?
                // 글 수정
                <>
                    <div className={styles.editorContainer}>
                        <input className={styles.title}  type="text" placeholder='제목을 입력하세요.' value={newTitle || ''} name='title' onChange={onEdit}/>
                        <CKEditor
                            editor={ClassicEditor}
                            data={selected.text}
                            onChange={(event, editor) => {
                        const data = editor.getData();
                        setContent({...content, text: data})
                    }}
                        />
                    </div>
                    <div className="btnContainer">
                        <button className={styles.btn} onClick={onEditSubmit}>완료</button>
                        <button className={styles.btn} onClick={onCancelClick}>취소</button>
                    </div>
                </> :
                // 글 작성
                <>
                    <div className={styles.editorContainer}>
                        <input className={styles.title} type="text" placeholder='제목을 입력하세요.' name='title' onChange={onChange}/>
                        <CKEditor
                            editor={ClassicEditor}
                            data=""
                            onChange={(event, editor) => {
                            const data = editor.getData();
                            setContent({...content, text: data})
                        }}
                        />
                    </div>
                    <div className="btnContainer noBorder">
                        <button className={styles.btn} onClick={onSubmit}>작성 완료</button>
                        <button className={styles.btn} onClick={onWriteClick}>작성 취소</button>
                    </div>
                </>}
        </>
)};

export default TextEditor;