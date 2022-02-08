import React, {useState} from "react";
import MapContainer from "./MapContainer";
import './map.css'

const SearchPlace = ({boardService, keyword, setKeyword, setPlaceObj, titleAndCoords}) => {
    const [inputText, setInputText] = useState("");
    const onChange = (e) => {
        setInputText(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setKeyword(inputText)
    }
    return (
        <>
            <div className="map_wrap">
                <MapContainer boardService={boardService} keyword={keyword} setKeyword={setKeyword}
                              setPlaceObj={setPlaceObj}
                              titleAndCoords={titleAndCoords}/>
                <div id="menu_wrap" className="bg_white">
                    <div className="option">
                        <div>
                            <form onSubmit={handleSubmit} method=''>
                                키워드 : <input type="text" onChange={onChange} value={inputText} id="keyword" size="15"/>
                                <button className='border text-center py-1 px-2 bg-white rounded' type="submit">검색하기</button>
                            </form>
                        </div>
                    </div>
                    <hr/>
                    <ul id="placesList"></ul>
                    <div id="pagination"></div>
                </div>
            </div>
        </>
    );
};


export default SearchPlace;