import React, {useEffect} from "react";

const MapContainer = ({searchPlace:{name,id}}) => {
const { kakao } = window;

    useEffect(() => {
        let infowindow = new kakao.maps.InfoWindow({zIndex:1});
        const container = document.getElementById(`myMap${id}`);
        const options = {
            center: new kakao.maps.LatLng(37.48308613407299, 126.87710497557258),
            level: 3
        };
        const map = new kakao.maps.Map(container, options);

        // 장소 검색 객체를 생성
        const ps = new kakao.maps.services.Places();

        // 키워드로 장소를 검색

        ps.keywordSearch(name, placesSearchCB);

        // 키워드 검색 완료 시 호출되는 콜백함수
        function placesSearchCB (data, status, pagination) {
            if (status === kakao.maps.services.Status.OK) {
                // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                // LatLngBounds 객체에 좌표를 추가
                let bounds = new kakao.maps.LatLngBounds();

                for (let i=0; i<data.length; i++) {
                    displayMarker(data[i]);
                    bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                }
                // 검색된 장소 위치를 기준으로 지도 범위를 재설정
                map.setBounds(bounds);
            }
        }
        // 지도에 마커를 표시하는 함수
        function displayMarker(place) {

            // 마커를 생성하고 지도에 표시
            let marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(place.y, place.x)
            });

            // 마커에 클릭이벤트를 등록
            kakao.maps.event.addListener(marker, 'click', function() {
                // 마커를 클릭하면 장소명이 인포윈도우에 표출
                infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
                infowindow.open(map, marker);
            });
        }
    }, [name]);
    return (
        <div id={`myMap${id}`} style={{
            width: '100%',
            height: '100%'
        }}></div>
    );
}

export default MapContainer;