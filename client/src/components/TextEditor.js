import React, {useState} from 'react';
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import Rating from "react-rating";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {faStar as faStarEmpty} from "@fortawesome/free-regular-svg-icons";

const TextEditor = ({
                        isEdit,
                        selected,
                        onCancelClick,
                        boardService,
                        getReviews,
                        setKeyword,
                        onEditClick,
                        onWriteClick,
                        getBoards,
                        setIsAlert,
                        setBanner,
                    }) => {
    const [content, setContent] = useState(selected)
    const [rating, setRating] = useState(0)
    const location = useLocation().pathname.includes('gourmet') ? '/gourmet' : '/snack'
    const isSnack = location.includes('snack')
    const isShop = location.includes('gourmet')
    const navigate = useNavigate()
    const {id} = useParams()
    let dataObj

    // Input Text
    const onChange = event => {
        const {name, value} = event.target
        setContent({...content, [name]: value})
        if (isShop) {
            setKeyword(value)
        }
    }

    // Create
    async function onSubmit() {
        try {
            if (isSnack) {
                dataObj = {
                    'title': content.title,
                    'text': content.text || '',
                }
            }
            if (isShop) {
                dataObj = {
                    'text': content.text || '내용 없음',
                    'rate': content.rate || 0
                }
            }
            await boardService.postBoard(dataObj, ((id === undefined) ? '' : id), location)
            setIsAlert(false)
            setBanner('작성되었습니다.')
        } catch (error) {
            setIsAlert(true)
            setBanner(error.response.data.message)
        }
        if (isSnack || (isShop && !id)) {
            onWriteClick()
            getBoards(null, location)
        } else {
            onEditClick()
            getReviews(id)
        }
    }

    // Edit
    async function onEditSubmit() {
        try {
            if (isSnack) {
                dataObj = {
                    'title': content.title,
                    'text': content.text,
                }
            } else {
                dataObj = {
                    'title': content.title,
                    'text': content.text,
                    'rate': rating,
                }
            }
            setContent({...dataObj})
            await boardService.updateBoard(selected.id, content, location)
            navigate(-1)
            setIsAlert(false)
            setBanner('수정되었습니다.')
        } catch (error) {
            setIsAlert(true)
            setBanner(error.response.data.message)
        }
    }

    // Rate
    const onRateClick = (event) => {
        setContent({...content, rate: event})
        setRating(event)
    }

    return (
        <>
            {isEdit ?
                // 글 수정
                <>
                    <div className=''>
                        <div className='relative my-6 mx-auto w-[90%]'>
                            <input className='p-4 border rounded w-full' type="text" maxLength='30'
                                   value={content.title || ''} name='title' onChange={onChange} disabled={isShop}/>
                            <span className='input-name'>
                                {isSnack ? '희망하는 간식' : '상호명'}
                            </span>
                        </div>
                        {isSnack ||
                        <div className='relative border rounded w-[90%] m-auto py-4 px-4 mb-6'>
                            <span className='absolute -top-3 left-2 text-lg bg-white px-1'>별점</span>
                            <Rating
                                initialRating={rating}
                                emptySymbol={
                                    <FontAwesomeIcon
                                        icon={faStarEmpty}
                                        size={"lg"}
                                        style={{color: "rgb(253, 186, 73)"}}
                                    />}
                                fullSymbol={
                                    <FontAwesomeIcon
                                        icon={faStar}
                                        size={"lg"}
                                        style={{color: "rgb(253, 186, 73)"}}
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
                    <div className='w-full flex justify-center gap-4 py-4'>
                        <button
                            className='button-common button-animation'
                            onClick={isShop ? onSubmit : onEditSubmit}>완료
                        </button>
                        <button
                            className='button-common button-animation'
                            onClick={onCancelClick}>취소
                        </button>
                    </div>
                </> :
                // 글 작성
                <>
                    <div className='flex-col-center w-full max-w-[800px] mt-6'>
                        <div className='relative border-2 rounded w-[90%] mb-4 mx-auto'>
                            {isSnack &&
                            <input className='w-full text-lg indent-2 px-4 py-3' type="text" name='title'
                                   onChange={onChange}/>
                            }
                            <span className='input-name'>
                                {isSnack ? '희망하는 간식을 적어주세요' : '상호명을 입력하세요'}
                            </span>
                        </div>
                        {!isShop &&
                        <CKEditor
                            editor={ClassicEditor}
                            data=""
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setContent({...content, text: data})
                            }}
                        />}
                    </div>
                    <div className='flex-row-center gap-4'>
                        <button
                            className='button-common button-animation'
                            onClick={onSubmit}>
                            {isShop ? '등록' : '작성 완료'}
                        </button>
                        <button
                            className='button-common button-animation'
                            onClick={onWriteClick}>
                            {isShop ? '닫기' : '작성 취소'}
                        </button>
                    </div>
                </>}
        </>
    )
};

export default TextEditor;