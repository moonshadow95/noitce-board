import React, {useState} from 'react';
import HTMLReactParser from "html-react-parser";
import TextEditor from "../TextEditor/TextEditor";
import { useNavigate } from "react-router-dom";
import timeFormatter from "../../util/date";
import styles from './selected.module.css';
import Rating from "react-rating";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar as faStarEmpty} from "@fortawesome/free-regular-svg-icons";
import {faStar} from "@fortawesome/free-solid-svg-icons";

const Selected = ({selected, isOwner, setBanner, boardService, setIsAlert, user}) => {
    const [editing, setEditing] = useState(false);
    const [rating, setRating] = useState(selected.rate)
    const isSnack = window.location.href.includes('snack')
    const navigate = useNavigate();
    // Edit
    const onEditClick = (event) => {
        if(isOwner){
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
                    </header>
                    <div className={styles.meta}>
                        <div className={styles.date}><small>{timeFormatter(selected.date)}</small></div>
                        <div className={styles.owner}><small>{selected.owner}</small></div>
                    </div>
                    <div className={styles.text}>
                        {HTMLReactParser(selected.text)}
                    </div>
                    {isOwner &&
                    <div className="btnContainer">
                        <button className={styles.btn} onClick={onEditClick}>{editing ? "취소" : "글 수정하기"}</button>
                        <button className={styles.btn} id={selected.id} onClick={onDeleteClick}>글 삭제하기</button>
                    </div>
                    }
                </>
                }
                {editing && <>
                    <TextEditor
                        isEdit={true}
                        selected={selected}
                        boardService={boardService}
                        onCancelClick={onEditClick}
                        onEditClick={onEditClick}
                        setBanner={setBanner}
                        setIsAlert={setIsAlert}
                    />
                </>}
            </section>
        </main>
    )
};

export default Selected;