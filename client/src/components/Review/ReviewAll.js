import React from 'react';
import Board from "../Board/Board";

const ReviewAll = ({user, authService, boardService, setBanner, setIsAlert, boardContent}) => {
    return(
        <Board user={user}
               authService={authService}
               boardService={boardService}
               setBanner={setBanner}
               setIsAlert={setIsAlert}/>
)};

export default ReviewAll;