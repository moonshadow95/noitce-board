import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import HTMLReactParser from "html-react-parser";
import TextEditor from "./TextEditor";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import timeFormatter from "../util/date";
import ReviewItem from "./Review/ReviewItem";
import Rate from "./Rate";
import {faPhoneAlt, faMapMarkerAlt, faLink} from "@fortawesome/free-solid-svg-icons";

const Selected = ({selected, isOwner, setBanner, boardService, setIsAlert, user, shopReviews, getReviews}) => {
    const [editing, setEditing] = useState(false);
    const [rating, setRating] = useState(0)
    const navigate = useNavigate();
    const location = useLocation().pathname.includes('gourmet') ? '/gourmet' : '/snack'
    const isSnack = location.includes('snack')
    const isShop = location.includes('gourmet')
    const {id: shopId} = useParams()
    // Edit
    const onEditClick = (event) => {
        if (isOwner || isShop) {
            setEditing(prev => !prev)
        }
    }
    // Delete
    const onDeleteClick = async (event) => {
        const ok = window.confirm("삭제하시겠습니까?");
        if (ok) {
            const {target: {id}} = event;
            await boardService.deleteBoard(id, location)
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
    // TODO - 좋아요
    // 좋아요
    // const onThumbClick = async() => {
    //     await boardService.addLike(selected.id)
    // }
    useEffect(() => {
        if (shopReviews) {
            average(shopReviews.map(review => review.rate))
        }
    })
    return (
        <main>
            <section className='flex-col-center align-center round mx-auto w-[80vw] md:w-[75vw] lg:w-[70vw] mt-[100px]'>
                {/* 작성 시 */}
                {!editing && <>
                    <header className='w-full flex-col-center align-center md:flex-row '>
                        <div className='w-full text-2xl flex p-6 gap-4 flex-col md:flex-row items-center'>
                            <h1>{selected.title}</h1>
                            {isSnack ?
                                <div>
                                    {/*<FontAwesomeIcon icon={faThumbsUp} size={'xs'} className='mb-1 cursor-pointer' onClick={onThumbClick}/>*/}
                                    {/*<span className='text-[20px]'> +{selected.likes}</span>*/}
                                </div> :
                                <Rate value={rating}/>}
                        </div>
                        {/* 등록된 가게에 후기 작성 */}
                        {isShop &&
                        <div className='m-auto'>
                            <button
                                className='mb-4 md:mb-0 mr-2 w-[120px] round button-common button-animation'
                                onClick={onEditClick}>후기 작성
                            </button>
                        </div>}
                    </header>
                    <div className='py-4 px-6 border-t border-b text-lg'>
                        <div><small>{timeFormatter(selected.date)}</small></div>
                        <div><small>{selected.username}</small></div>
                    </div>
                    <div className={`min-h-[300px] ${isSnack && 'm-6'}`}>
                        {HTMLReactParser(selected.text || '')}
                        {/* 가게 정보 보기인 경우 */}
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
                    {/* 현재 유저가 작성자와 동일한 경우 */}
                    {selected.isOwner &&
                    <div className='w-full flex-row-center gap-4 py-4 border-t'>
                        {isSnack && <button
                            className='button-common button-animation text-xs sm:text-base'
                            onClick={onEditClick}>{editing ? "취소" : "글 수정하기"}</button>}
                        <button
                            className='button-common button-animation hover:bg-red hover:text-white text-xs sm:text-base'
                            id={selected.id} onClick={onDeleteClick}>{isShop ? "맛집 삭제하기" : "글 삭제하기"}</button>
                    </div>
                    }
                </>
                }
                {/* 간식 신청 게시판 - 글 수정 */}
                {editing &&
                <TextEditor
                    isEdit={true}
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