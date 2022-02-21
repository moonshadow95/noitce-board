import React, {useState} from "react";
import MapContainer from "./MapContainer";
import './map.css'

const SearchPlace = ({
                         boardService,
                         keyword,
                         setKeyword,
                         setPlaceObj,
                         titleAndCoords,
                         getBoards,
                         setBanner,
                         setIsAlert
                     }) => {
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
                              setPlaceObj={setPlaceObj} getBoards={getBoards}
                              titleAndCoords={titleAndCoords} setBanner={setBanner} setIsAlert={setIsAlert}/>
                <div id="menu_wrap" className="border md:border-none">
                    <div className="text-center">
                        <div>
                            <form onSubmit={handleSubmit} method='' className='p-1'>
                                <span>키워드 : </span><
                                input
                                className='p-1 border mr-2 w-[120px]'
                                type="text" onChange={onChange} value={inputText} id="keyword"
                                size="15"/>
                                <button className='round text-center py-1 px-2 bg-white' type="submit">검색하기
                                </button>
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