import React from 'react';
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