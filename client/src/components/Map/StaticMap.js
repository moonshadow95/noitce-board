import React, {useEffect} from 'react';


const StaticMap = ({shop: {id, coords, title}}) => {
    const {kakao} = window;
    useEffect(() => {
        var markers = [
            {
                position: new kakao.maps.LatLng(parseFloat(coords.split(',')[1]), parseFloat(coords.split(',')[0])),
                text: title // text 옵션을 설정하면 마커 위에 텍스트를 함께 표시할 수 있습니다
            }
        ];
        var staticMapContainer = document.getElementById(`staticMap${id}`), // 이미지 지도를 표시할 div
            staticMapOption = {
                center: new kakao.maps.LatLng(parseFloat(coords.split(',')[1]), parseFloat(coords.split(',')[0])),
                // 이미지 지도의 중심좌표
                level: 4, // 이미지 지도의 확대 레벨
                marker: markers, // 이미지 지도에 표시할 마커
            };

        // 이미지 지도를 생성합니다
        var staticMap = new kakao.maps.StaticMap(staticMapContainer, staticMapOption);
    }, [kakao])
    return (
        <div id={`staticMap${id}`} style={{width: "100%", height: "100%"}}></div>
    )
};

export default StaticMap;