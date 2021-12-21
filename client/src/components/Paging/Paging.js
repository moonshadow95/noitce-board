import React from 'react';
import Pagination from "react-js-pagination";
import './paging.css';


const Paging = ({page, totalCount, setPage, itemsPerPage}) => {

    const onChange = (event) => {
        setPage(event)
    }
    return (
        <Pagination
            onChange={onChange}
            activePage={page}
            itemsCountPerPage={itemsPerPage}
            totalItemsCount={totalCount}
            pageRangeDisplayed={5}
            prevPageText={"‹"}
            nextPageText={"›"}
        />
)}

export default Paging;