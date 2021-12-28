import React, {useEffect, useState} from 'react';
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Axios from "axios";
import styles from './textEditor.module.css';
import {useNavigate} from "react-router-dom";
import Rating from "react-rating";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {faStar as faStarEmpty} from "@fortawesome/free-regular-svg-icons";

const TextEditor = ({isEdit, selected, onCancelClick, onWriteClick, getBoards, user, setBanner, setIsAlert}) => {
    const [newTitle, setNewTitle] = useState({selected})
    const [content, setContent] = useState()
    const [rating, setRating] = useState(0)
    const navigate = useNavigate();
    const baseURL = 'http://localhost:8080'
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
        let dataObj;
        if(window.location.href.includes('snack')){
            dataObj={
                'title': content.title,
                'text': content.text,
                'owner': user,
            }
        }else{
            dataObj={
                'title': content.title,
                'text': content.text,
                'owner': user,
                'rate': rating,
                'coords': '123.12414,121.5142'
            }
        }
        try{
            await Axios({
                method:'POST',
                url: `${baseURL}/${window.location.href.includes('snack') ?  'snack' : 'review'}/insert`,
                data: dataObj,
                headers: getHeaders()
            })
            window.confirm('작성되었습니다.')
            // setIsAlert(false)
            // setBanner('작성되었습니다.')
        }catch(error){
            setIsAlert(true)
            setBanner(error.response.data.message)
        }
        getBoards()
        onWriteClick()
    }
    // Edit
    const onEdit  = (event) => {
        const {value} = event.target;
        setNewTitle(value)
    }
    async function onEditSubmit(){
        setContent({...content},)
        await Axios({
            method:'PUT',
            url:`${baseURL}/snack/edit/${selected.id}`,
            data:{
                'title': newTitle,
                'text': content.text
            },
            headers:getHeaders(),
        })
        alert('수정되었습니다.')
        navigate('/')
    }
    useEffect(()=>{
        if(isEdit) {
            setContent({
                title: selected.title,
                text: selected.text,
            })
            setNewTitle(selected.title)
        }
        else{
            setContent(selected)
        }
    }, [isEdit, selected])
    // Rate
    const onRateClick = (event) => setRating(event)

    return (
        <>
            { isEdit ?
                // 글 수정
                <>
                    <div className={styles.editorContainer}>
                        <div className={styles.titleContainer}>
                            <input className={styles.title}  type="text" value={newTitle || ''} name='title' onChange={onEdit}/>
                            <span className={styles.titlePlaceHolder}>
                                {window.location.href.includes('snack') ? '제목을 입력하세요':'상호명을 입력하세요'}
                            </span>
                        </div>
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
                        <div className={styles.titleContainer}>
                            <input className={styles.title} type="text" name='title' onChange={onChange}/>
                            <span className={styles.titlePlaceHolder}>
                                {window.location.href.includes('snack') ? '제목을 입력하세요':'상호명을 입력하세요'}
                            </span>
                        </div>
                        <div>
                            <span>별점 </span>
                            <Rating
                                initialRating={rating}
                                emptySymbol={
                                    <FontAwesomeIcon
                                        icon={faStarEmpty}
                                        style={{ color: "rgb(253, 186, 73)" }}
                                />}
                                fullSymbol={
                                    <FontAwesomeIcon
                                        icon={faStar}
                                        style={{ color: "rgb(253, 186, 73)" }}
                                    />
                                }
                                fractions={2}
                                onClick={onRateClick}
                            />
                        </div>
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