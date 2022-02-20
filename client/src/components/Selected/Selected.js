import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import HTMLReactParser from "html-react-parser";
import TextEditor from "../TextEditor/TextEditor";
import {useNavigate} from "react-router-dom";
import timeFormatter from "../../util/date";
import ReviewItem from "../Review/ReviewItem";
import Rate from "../Rate/Rate";
import {faPhoneAlt, faMapMarkerAlt, faLink} from "@fortawesome/free-solid-svg-icons";

const Selected = ({selected, isOwner, setBanner, boardService, setIsAlert, user, shopReviews, getReviews}) => {
    const [editing, setEditing] = useState(false);
    const [rating, setRating] = useState(0)
    const isSnack = window.location.href.includes('snack')
    const isReview = window.location.href.includes('reviews')
    const isShop = window.location.href.includes('shops')
    const navigate = useNavigate();
    // Edit
    const onEditClick = (event) => {
        if (isOwner || isReview || isShop) {
            setEditing(prev => !prev)
        }
    }
    // Delete
    const onDeleteClick = async (event) => {
        const ok = window.confirm("삭제하시겠습니까?");
        if (ok) {
            const {target: {id}} = event;
            await boardService.deleteBoard(id)
            setIsAlert(false)
            setBanner('삭제되었습니다.')
            if (isSnack) {
                navigate(-1)
            } else {
                getReviews()
            }
        }
    }
    // 별점 평균 구하기
    const average = (arr) => {
        const value = arr.reduce((p, c) => p + c, 0) / arr.length
        if (value) {
            return setRating(value)
        }
    }
    useEffect(() => {
        if (shopReviews) {
            average(shopReviews.map(review => review.rate))
        }
    })
    return (
        <main>
            {/*Section*/}
            <section className='flex flex-col align-center border rounded m-6 mt-[100px]'>
                {!editing && <>
                    <header className='w-full flex justify-center align-center'>
                        <h1 className='w-full text-2xl flex p-6 gap-4'>
                            {selected.title}
                            {!isSnack &&
                            <Rate value={rating}/>}
                        </h1>
                        {isShop &&
                        <div className='m-auto'>
                            <button
                                className='mr-2 border rounded w-[150px] h-[60px] bg-black text-white transition hover:bg-white hover:text-black active:translate-y-2'
                                onClick={onEditClick}>리뷰 추가
                            </button>
                        </div>}
                    </header>
                    <div className='py-4 px-6 border-t border-b text-lg'>
                        <div><small>{timeFormatter(selected.date)}</small></div>
                        <div><small>{selected.username}</small></div>
                    </div>
                    <div className={`min-h-[300px] ${isSnack && 'm-6'}`}>
                        {isReview ?
                            <ul className=''>
                                {shopReviews.map((content, index) =>
                                    <li key={index} className=''>
                                        <ReviewItem content={content} user={user} onDeleteClick={onDeleteClick}
                                                    isOwner={true}/>
                                    </li>
                                )}
                            </ul> :
                            HTMLReactParser(selected.text || '')}
                        {shopReviews &&
                        <div>
                            <div className='border-b flex flex-col gap-2 p-6'>
                                <span>
                                    <FontAwesomeIcon
                                        icon={faMapMarkerAlt}
                                        style={{marginRight: '4px'}}
                                    />
                                    {selected.address}
                                </span>
                                <span>
                                    <FontAwesomeIcon
                                        icon={faPhoneAlt}
                                        style={{marginRight: '4px'}}
                                    />
                                    {selected.phone || '전화번호 없음'}
                                </span>
                                <a className='w-fit text-[#0D54FE]' href={`https://place.map.kakao.com/${selected.id}`}
                                   target='_blank' rel="noopener noreferrer">
                                    <FontAwesomeIcon
                                        icon={faLink}
                                        style={{marginRight: '4px', color: '#000',}}
                                    />
                                    카카오맵에서 보기
                                </a>
                            </div>
                            <h2 className='text-lg ml-6 mt-6'>후기</h2>
                            <ul>
                                {shopReviews.map((content, index) =>
                                    <li key={index} className='last:mb-6'>
                                        <ReviewItem
                                            content={content}
                                            user={user}
                                            onDeleteClick={onDeleteClick}
                                            isOwner={content.isOwner}
                                        />
                                    </li>
                                )}
                            </ul>
                        </div>
                        }
                    </div>
                    {selected.isOwner &&
                    <div className='w-full flex-row-center gap-4 py-4 border-t'>
                        {isSnack && <button
                            className='button-common button-animation'
                            onClick={onEditClick}>{editing ? "취소" : "글 수정하기"}</button>}
                        <button
                            className='button-common button-animation hover:bg-red hover:text-white'
                            id={selected.id} onClick={onDeleteClick}>{isShop ? "맛집 삭제하기" : "글 삭제하기"}</button>
                    </div>
                    }
                </>
                }
                {editing &&
                <TextEditor
                    isEdit={true}
                    isReview={isReview}
                    selected={selected}
                    keyword={selected.title}
                    boardService={boardService}
                    onCancelClick={onEditClick}
                    onEditClick={onEditClick}
                    setBanner={setBanner}
                    setIsAlert={setIsAlert}
                    getReviews={getReviews}
                />
                }
            </section>
        </main>
    )
};

export default Selected;