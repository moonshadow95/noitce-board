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

const Selected = ({selected, isOwner, setBanner, boardService, setIsAlert, user, shopReviews}) => {
    const [editing, setEditing] = useState(false);
    const [rating, setRating] = useState(0)
    const [reviews, setReviews] = useState([]);
    const isSnack = window.location.href.includes('snack')
    const isReview = window.location.href.includes('reviews')
    const isShop = window.location.href.includes('shops')
    const navigate = useNavigate();
    const {id} = useParams()

    // 해당 가게의 리뷰 가져오기
    const getReviews = useCallback(async(id) => {
        const response = await boardService.getReviews(id)
        return setReviews(response)
    },[boardService])

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

    useEffect(()=>{
        isShop || getReviews(id);
    },[getReviews, id])

    return(
        <main>
            {/*Section*/}
            <section className={styles.section}>
                {!editing && <>
                    <header className={styles.header}>
                        <h1 className={styles.title}>
                            {selected.title}
                            {!isSnack &&
                            <Rate value={0}/>}
                        </h1>
                        <button className={styles.btn} onClick={onEditClick}>리뷰 추가</button>
                    </header>
                    <div className={styles.meta}>
                        <div className={styles.date}><small>{timeFormatter(selected.date)}</small></div>
                        <div className={styles.username}><small>{selected.username}</small></div>
                    </div>
                    <div className={`${styles.text} ${(isReview || shopReviews) && styles.reviewsContainer}`}>
                        {isReview ?
                            <ul className={styles.list}>
                                {reviews.map((content,index) =>
                                    <li key={index} className={styles.item}>
                                        <ReviewItem content={content} user={user} onDeleteClick={onDeleteClick} />
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
                                            isOwner={content.username===user.username}
                                        />
                                    </li>
                                )}
                            </ul>
                        </div>
                        }
                    </div>
                    { isOwner &&
                    <div className="btnContainer">
                        { (isReview || shopReviews) || <button className={styles.btn} onClick={onEditClick}>{editing ? "취소" : "글 수정하기"}</button>}
                        <button className={styles.btn} id={selected.id} onClick={onDeleteClick}>{ isReview ? "맛집 삭제하기" : "글 삭제하기"}</button>
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
                />
                }
            </section>
        </main>
    )
};

export default Selected;