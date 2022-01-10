import React, {useEffect, useState} from 'react';
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import styles from './textEditor.module.css';
import {useNavigate, useParams} from "react-router-dom";
import Rating from "react-rating";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {faStar as faStarEmpty} from "@fortawesome/free-regular-svg-icons";

const TextEditor = ({isEdit, selected, onCancelClick, boardService, user, setBanner, setIsAlert, setIsWrite, keyword, setKeyword, placeObj, onEditClick, onWriteClick, getBoards}) => {
    const [content, setContent] = useState(selected)
    const [rating, setRating] = useState(0)
    const isSnack = window.location.href.includes('snack')
    const navigate = useNavigate();
    const isReview = window.location.href.includes('reviews')
    const isShop = window.location.href.includes('shops')
    const {id} = useParams()
    let dataObj;

    // Input Text
    const onChange = event => {
        const {name, value} = event.target
        setContent({...content, [name]:value})
        if(isShop){
            setKeyword(value)
        }
    }
    // Create
    async function onSubmit(){
        if(!content){
            if(!placeObj){
                alert('지도에서 가게를 선택해주세요.')
            }
            return;
        }
        try{
            if(isSnack){
                dataObj={
                    'title': content.title,
                    'text': content.text || '',
                }
            }
            if(isReview){
                dataObj={
                    'title': content.title,
                    'text': content.text || '',
                    'rate': rating
                }
            }
            if(isShop){
                dataObj={
                    ...placeObj
                }
            }
            await boardService.postBoard(dataObj,((id === undefined) ? '' : id))
            window.confirm('작성되었습니다.')
            if(isReview){
                onEditClick()
                window.location.reload()
            }
            // setIsAlert(false)
            // setBanner('작성되었습니다.')
        }catch(error){
            // setIsAlert(true)
            // setBanner(error.response.data.message)
            console.log(error)
        }
        if(isSnack || isShop){
            onWriteClick()
            getBoards()
        }
    }
    // Edit
    async function onEditSubmit(){
        if(isSnack){
            dataObj={
                'title': content.title,
                'text': content.text,
            }
        }else{
            dataObj={
                'title': content.title,
                'text': content.text,
                'rate': rating,
            }
        }
        setContent({...dataObj})
        await boardService.updateBoard(selected.id, content)
        alert('수정되었습니다.')
        navigate(-1)
    }
    const onRateClick = (event) => setRating(event)
    return (
        <>
            { isEdit ?
                // 글 수정
                <>
                    <div className={styles.editorContainer}>
                        <div className={styles.titleContainer}>
                            <input className={styles.title}  type="text" value={content.title || ''} name='title' onChange={onChange}/>
                            <span className={styles.titlePlaceHolder}>
                                {isSnack ? '제목을 입력하세요':'상호명을 입력하세요'}
                            </span>
                        </div>
                        {isSnack ||
                        <div className={styles.ratingContainer}>
                            <span className={styles.ratingPlaceHolder}>별점</span>
                            <Rating
                                initialRating={rating}
                                emptySymbol={
                                    <FontAwesomeIcon
                                        icon={faStarEmpty}
                                        size={"lg"}
                                        style={{ color: "rgb(253, 186, 73)"}}
                                    />}
                                fullSymbol={
                                    <FontAwesomeIcon
                                        icon={faStar}
                                        size={"lg"}
                                        style={{ color: "rgb(253, 186, 73)"}}
                                    />
                                }
                                fractions={2}
                                onClick={onRateClick}
                            />
                        </div>}
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
                        <button className={styles.btn} onClick={isShop ? onSubmit : onEditSubmit}>완료</button>
                        <button className={styles.btn} onClick={onCancelClick}>취소</button>
                    </div>
                </> :
                // 글 작성
                <>
                    <div className={`${styles.editorContainer} ${isShop && styles.editorContainerShops}`}>
                        <div className={styles.titleContainer}>
                            {isSnack ?
                                <input className={styles.title} type="text" name='title' onChange={onChange} />
                                :<input className={styles.title} type="text" name='title' onChange={onChange} value={keyword && `${keyword}`}/>
                            }
                            <span className={styles.titlePlaceHolder}>
                                {isSnack ? '제목을 입력하세요':'상호명을 입력하세요'}
                            </span>
                        </div>
                        {isShop ||
                        <CKEditor
                            editor={ClassicEditor}
                            data=""
                            onChange={(event, editor) => {
                            const data = editor.getData();
                            setContent({...content, text: data})
                        }}
                        />}
                    </div>
                    <div className="btnContainer noBorder">
                        <button className={styles.btn} onClick={onSubmit}>
                            {isShop ? '등록' : '작성 완료'}
                        </button>
                        <button className={styles.btn} onClick={onWriteClick}>
                            {isShop ? '닫기' :'작성 취소'}
                        </button>
                    </div>
                </>}
        </>
)};

export default TextEditor;