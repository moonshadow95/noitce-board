import React, {useState} from 'react';
import styles from "../../routes/Snack/snack.module.css";
import BoardItem from "../Board/BoardItem";
import Board from "../Board/Board";

const ReviewAll = ({user, authService, setBanner, setIsAlert, boardContent}) => {
    return(
        <Board user={user}
               authService={authService}
               boardContent={boardContent}
               setBanner={setBanner}
               setIsAlert={setIsAlert}/>
)};

export default ReviewAll;