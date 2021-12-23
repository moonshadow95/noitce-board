import React, { useState } from "react";
import MapContainer from "./MapContainer";

const SearchPlace = ({keyword}) => {
    const [inputText, setInputText] = useState("");
    const [place, setPlace] = useState("");

    const onChange = (e) => {
        setInputText(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setPlace(inputText);
        setInputText("");
    };

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
            <MapContainer searchPlace={place} />
        </>
    );
};


export default SearchPlace;