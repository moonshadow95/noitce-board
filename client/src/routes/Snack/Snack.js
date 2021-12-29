import React from 'react';
import Board from "../../components/Board/Board";

const Snack = ({user, authService, boardService, setBanner, setIsAlert}) => {
    return(
        <Board user={user}
               authService={authService}
               boardService={boardService}
               setBanner={setBanner}
               setIsAlert={setIsAlert}/>
    );
}
export default Snack;