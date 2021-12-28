import React from 'react';
import Board from "../../components/Board/Board";

const Snack = ({user, authService, setBanner, setIsAlert, boardContent}) => {
    return(
        <Board user={user}
               authService={authService}
               boardContent={boardContent}
               setBanner={setBanner}
               setIsAlert={setIsAlert}/>
    );
}
export default Snack;