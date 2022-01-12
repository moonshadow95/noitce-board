import React, {useCallback, useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import HTMLReactParser from "html-react-parser";
import TextEditor from "../TextEditor/TextEditor";
import {useNavigate, useParams} from "react-router-dom";
import timeFormatter from "../../util/date";
import styles from './selected.module.css';
import ReviewItem from "../Review/ReviewItem";
import Rate from "../Rate/Rate";
import {faPhoneAlt, faMapMarkerAlt, faLink} from "@fortawesome/free-solid-svg-icons";
// TODO 새로운 리뷰 작성 후 업데이트하기
const Selected = ({selected, isOwner, setBanner, authService, boardService, setIsAlert, user, shopReviews, getReviews}) => {
    const [editing, setEditing] = useState(false);
    const [rating, setRating] = useState(0)
    const isSnack = window.location.href.includes('snack')
    const isReview = window.location.href.includes('reviews')
    const isShop = window.location.href.includes('shops')
    const navigate = useNavigate();
    // Edit
    const onEditClick = (event) => {
        if(isOwner || isReview || isShop){
            setEditing(prev => !prev)
        }
    }
    // Delete
    const onDeleteClick =(event)=>{
        const ok = window.confirm("삭제하시겠습니까?");
        if(ok){
            const {target:{id}} = event;
            boardService.deleteBoard(id)
                .catch(err=>setBanner(err.response.data.message))
                .then(navigate(-1))
        }
    }
    // 별점 평균 구하기
    const average = (arr) => {
        const value = arr.reduce((p, c) => p + c, 0) / arr.length
        if(value){
            return setRating(value)
        }
    }
    useEffect(()=>{
        if(shopReviews){
            average(shopReviews.map(review=>review.rate))
        }
    })
    return(
        <main>
            {/*Section*/}
            <section className={styles.section}>
                {!editing && <>
                    <header className={styles.header}>
                        <h1 className={styles.title}>
                            {selected.title}
                            {!isSnack &&
                            <Rate value={rating}/>}
                        </h1>
                        {isShop && <button className={styles.btn} onClick={onEditClick}>리뷰 추가</button>}
                    </header>
                    <div className={styles.meta}>
                        <div className={styles.date}><small>{timeFormatter(selected.date)}</small></div>
                        <div className={styles.username}><small>{selected.username}</small></div>
                    </div>
                    <div className={`${styles.text} ${(isReview || shopReviews) && styles.reviewsContainer}`}>
                        {isReview ?
                            <ul className={styles.list}>
                                {shopReviews.map((content,index) =>
                                    <li key={index} className={styles.item}>
                                        <ReviewItem content={content} user={user} onDeleteClick={onDeleteClick} isOwner={true} />
                                    </li>
                                )}
                            </ul> :
                            HTMLReactParser(selected.text || '')}
                        {shopReviews &&
                        <div>
                            <div className={styles.info}>
                                <span>
                                    <FontAwesomeIcon
                                        icon={faMapMarkerAlt}
                                        style={{marginRight:'4px'}}
                                    />
                                    {selected.address}
                                </span>
                                <span>
                                    <FontAwesomeIcon
                                        icon={faPhoneAlt}
                                        style={{marginRight:'4px'}}
                                    />
                                    {selected.phone}
                                </span>
                                <a href={selected.url} target='_blank'>
                                    <FontAwesomeIcon
                                        icon={faLink}
                                        style={{marginRight:'4px', color:'#000',}}
                                    />
                                    카카오맵에서 보기
                                </a>
                            </div>
                            <h2>후기</h2>
                            <ul className={styles.list}>
                                {shopReviews.map((content,index) =>
                                    <li key={index} className={styles.item}>
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
                    { selected.isOwner &&
                    <div className="btnContainer">
                        { isSnack && <button className={styles.btn} onClick={onEditClick}>{editing ? "취소" : "글 수정하기"}</button>}
                        <button className={styles.btn} id={selected.id} onClick={onDeleteClick}>{ isShop ? "맛집 삭제하기" : "글 삭제하기"}</button>
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