import React, {useCallback, useEffect, useState} from 'react';
import HTMLReactParser from "html-react-parser";
import TextEditor from "../TextEditor/TextEditor";
import {useNavigate, useParams} from "react-router-dom";
import timeFormatter from "../../util/date";
import styles from './selected.module.css';
import Rating from "react-rating";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar as faStarEmpty} from "@fortawesome/free-regular-svg-icons";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import ReviewItem from "../Review/ReviewItem";

const Selected = ({selected, isOwner, setBanner, boardService, setIsAlert, user}) => {
    const [editing, setEditing] = useState(false);
    const [rating, setRating] = useState(0)
    const [reviews, setReviews] = useState([]);
    const isSnack = window.location.href.includes('snack')
    const isReview = window.location.href.includes('reviews')
    const navigate = useNavigate();
    const {id} = useParams()

    // 해당 가게의 리뷰 가져오기
    const getReviews = useCallback(async(id) => {
        const response = await boardService.getReviews(id)
        return setReviews(response)
    },[boardService])

    // Edit
    const onEditClick = (event) => {
        if(isOwner || isReview){
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
        getReviews(id);
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
                            <div>
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
                                    readonly={true}
                                />
                            </div>}
                        </h1>
                        <button className={styles.btn} onClick={onEditClick}>리뷰 추가</button>
                    </header>
                    <div className={styles.meta}>
                        <div className={styles.date}><small>{timeFormatter(selected.date)}</small></div>
                        <div className={styles.username}><small>{selected.username}</small></div>
                    </div>
                    <div className={styles.text}>
                        {isReview ?
                            <ul className={styles.list}>
                                {reviews.map((content,index) =>
                                    <li key={index} className={styles.item}>
                                        <ReviewItem content={content} user={user} onDeleteClick={onDeleteClick} />
                                    </li>
                                )}
                            </ul> :
                            HTMLReactParser(selected.text)}
                    </div>
                    { isOwner &&
                    <div className="btnContainer">
                        { isReview || <button className={styles.btn} onClick={onEditClick}>{editing ? "취소" : "글 수정하기"}</button>}
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