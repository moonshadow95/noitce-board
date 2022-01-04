import React, {useEffect} from "react";

const MapContainer = ({keyword, setKeyword, setPlaceObj, titleAndCoords}) => {
const { kakao } = window;
    useEffect(() => {
        let infowindow = new kakao.maps.InfoWindow({zIndex:1});
        const container = document.getElementById(`myMap`);
        const options = {
            center: new kakao.maps.LatLng(37.48308613407299, 126.87710497557258),
            level: 4
        };
        const map = new kakao.maps.Map(container, options);
        if(keyword){
            // 장소 검색 객체를 생성
            const ps = new kakao.maps.services.Places();

            // 키워드로 장소를 검색

            ps.keywordSearch(keyword, placesSearchCB);

            // 키워드 검색 완료 시 호출되는 콜백함수
            function placesSearchCB(data, status, pagination) {
                if (status === kakao.maps.services.Status.OK) {
                    // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                    // LatLngBounds 객체에 좌표를 추가
                    let bounds = new kakao.maps.LatLngBounds();

                    for (let i = 0; i < data.length; i++) {
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
                kakao.maps.event.addListener(marker, 'click', function () {
                    // 클릭한 마커의 이름으로 title input value
                    setKeyword(place.place_name)
                    setPlaceObj(place)
                    // 마커를 클릭하면 장소명이 인포윈도우에 표출
                    infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
                    infowindow.open(map, marker);
                });
            }
        }

        // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
        var zoomControl = new kakao.maps.ZoomControl();
        map.addControl(zoomControl, kakao.maps.ControlPosition.LEFT);

        // 마커를 표시할 위치와 title 객체 배열
        let positions = titleAndCoords.map(item=>{
            const title = item.title;
            const latlngs = item.coords;
            return {title, latlng: new kakao.maps.LatLng(latlngs[0],latlngs[1])}
        })

        const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png'
        for (var i = 0; i < positions.length; i ++) {

            // 마커 이미지의 이미지 크기 입니다
            var imageSize = new kakao.maps.Size(24, 35);

            // 마커 이미지를 생성합니다
            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: positions[i].latlng, // 마커를 표시할 위치
                title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                image : markerImage // 마커 이미지
            });
        }
    }, [kakao.maps.InfoWindow, kakao.maps.LatLng, kakao.maps.LatLngBounds, kakao.maps.Map, kakao.maps.Marker, kakao.maps.MarkerImage, kakao.maps.Size, kakao.maps.event, kakao.maps.services.Places, kakao.maps.services.Status.OK, keyword, titleAndCoords]);
    return (
        <div id={`myMap`} style={{
            width: '60vw',
            minHeight: '78vh',
            marginBottom:'2em'
        }}></div>
    );
}

export default MapContainer;