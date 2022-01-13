import React, { useState } from "react";
import MapContainer from "./MapContainer";

const SearchPlace = ({keyword, setKeyword, setPlaceObj, titleAndCoords}) => {
    const [inputText, setInputText] = useState("");
    const onChange = (e) => {
        setInputText(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setKeyword(inputText)
        console.log(inputText)
        console.log(keyword)
        setKeyword('')
    }

    return (
        <>
            <form className="inputForm" onSubmit={handleSubmit}>
                <input
                    placeholder="키워드로 검색하세요."
                    onChange={onChange}
                    value={inputText}
                />
                <button type="submit">검색</button>
            </form>
            <MapContainer keyword={keyword} setKeyword={setKeyword} setPlaceObj={setPlaceObj} titleAndCoords={titleAndCoords}/>
        </>
    );
};


export default SearchPlace;