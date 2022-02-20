import React, {useEffect} from "react";

const MapContainer = ({
                          boardService,
                          keyword,
                          setKeyword,
                          setPlaceObj,
                          titleAndCoords,
                          getBoards,
                          setBanner,
                          setIsAlert
                      }) => {
    const {kakao} = window;
    useEffect(() => {
        let markers = [];
        // 검색 결과 목록이나 마커의 인포윈도우 생성
        let infowindow = new kakao.maps.InfoWindow({zIndex: 1});
        const container = document.getElementById(`myMap`);
        const options = {
            center: new kakao.maps.LatLng(37.48308613407299, 126.87710497557258),
            level: 4
        };
        const map = new kakao.maps.Map(container, options);
        if (keyword) {
            // 장소 검색 객체를 생성
            const ps = new kakao.maps.services.Places();

            // 키워드로 장소를 검색
            ps.keywordSearch(keyword, placesSearchCB);

            // 키워드 검색 완료 시 호출되는 콜백함수
            function placesSearchCB(data, status, pagination) {
                if (status === kakao.maps.services.Status.OK) {

                    // 정상적으로 검색이 완료됐으면
                    // 검색 목록과 마커를 표출합니다
                    displayPlaces(data);

                    // 페이지 번호를 표출합니다
                    displayPagination(pagination);

                } else if (status === kakao.maps.services.Status.ZERO_RESULT) {

                    alert('검색 결과가 존재하지 않습니다.');
                    return;

                } else if (status === kakao.maps.services.Status.ERROR) {

                    alert('검색 결과 중 오류가 발생했습니다.');
                    return;

                }
            }

            // 검색 결과 목록과 마커를 표출하는 함수입니다
            function displayPlaces(places) {

                var listEl = document.getElementById('placesList'),
                    menuEl = document.getElementById('menu_wrap'),
                    fragment = document.createDocumentFragment(),
                    bounds = new kakao.maps.LatLngBounds(),
                    listStr = '';

                // 검색 결과 목록에 추가된 항목들을 제거합니다
                removeAllChildNods(listEl);

                // 지도에 표시되고 있는 마커를 제거합니다
                removeMarker();

                for (var i = 0; i < places.length; i++) {

                    // 마커를 생성하고 지도에 표시합니다
                    var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
                        marker = addMarker(placePosition, i),
                        itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

                    // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                    // LatLngBounds 객체에 좌표를 추가합니다
                    bounds.extend(placePosition);

                    // 마커와 검색결과 항목에 mouseover 했을때
                    // 해당 장소에 인포윈도우에 장소명을 표시합니다
                    // mouseout 했을 때는 인포윈도우를 닫습니다
                    (function (marker, title) {
                        kakao.maps.event.addListener(marker, 'mouseover', function () {
                            displayInfowindow(marker, title);
                        });

                        kakao.maps.event.addListener(marker, 'mouseout', function () {
                            infowindow.close();
                        });

                        itemEl.onmouseover = function () {
                            displayInfowindow(marker, title);
                        };

                        itemEl.onmouseout = function () {
                            infowindow.close();
                        };
                    })(marker, places[i].place_name);

                    fragment.appendChild(itemEl);
                }

                // 검색결과 항목들을 검색결과 목록 Elemnet에 추가합니다
                listEl.appendChild(fragment);
                menuEl.scrollTop = 0;

                // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
                map.setBounds(bounds);
            }

            // 검색결과 항목을 Element로 반환하는 함수입니다
            function getListItem(index, places) {

                var el = document.createElement('li'),
                    itemStr = '<span class="markerbg marker_' + (index + 1) + '"></span>' +
                        '<div class="info">' +
                        '   <h5>' + places.place_name + '</h5>';

                if (places.road_address_name) {
                    itemStr += '    <span>' + places.road_address_name + '</span>' +
                        '   <span class="jibun gray">' + places.address_name + '</span>';
                } else {
                    itemStr += '    <span>' + places.address_name + '</span>';
                }

                itemStr += '  <span class="tel">' + places.phone + '</span>' +
                    '</div>';

                el.innerHTML = itemStr;
                el.className = 'item';
                el.addEventListener('click', async (e) => {
                    const ok = window.confirm('등록하시겠습니까?')
                    if (ok) {
                        try {
                            await boardService.postBoard(places, '')
                            setIsAlert(false)
                            setBanner('등록되었습니다.')
                            getBoards()
                        } catch (error) {
                            setIsAlert(true)
                            setBanner(error.response.data.message)
                        }
                    }
                })
                return el;
            }

            // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
            function addMarker(position, idx, title) {
                var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
                    imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
                    imgOptions = {
                        spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
                        spriteOrigin: new kakao.maps.Point(0, (idx * 46) + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
                        offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
                    },
                    markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
                    marker = new kakao.maps.Marker({
                        position: position, // 마커의 위치
                        image: markerImage
                    });

                marker.setMap(map); // 지도 위에 마커를 표출합니다
                markers.push(marker);  // 배열에 생성된 마커를 추가합니다

                return marker;
            }

            // 지도 위에 표시되고 있는 마커를 모두 제거합니다
            function removeMarker() {
                for (var i = 0; i < markers.length; i++) {
                    markers[i].setMap(null);
                }
                markers = [];
            }

            // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
            function displayPagination(pagination) {
                var paginationEl = document.getElementById('pagination'),
                    fragment = document.createDocumentFragment(),
                    i;

                // 기존에 추가된 페이지번호를 삭제합니다
                while (paginationEl.hasChildNodes()) {
                    paginationEl.removeChild(paginationEl.lastChild);
                }

                for (i = 1; i <= pagination.last; i++) {
                    var el = document.createElement('a');
                    el.href = "#";
                    el.innerHTML = i;

                    if (i === pagination.current) {
                        el.className = 'on';
                    } else {
                        el.onclick = (function (i) {
                            return function () {
                                pagination.gotoPage(i);
                            }
                        })(i);
                    }

                    fragment.appendChild(el);
                }
                paginationEl.appendChild(fragment);
            }

            // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
            // 인포윈도우에 장소명을 표시합니다
            function displayInfowindow(marker, title) {
                var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

                infowindow.setContent(content);
                infowindow.open(map, marker);
            }

            // 검색결과 목록의 자식 Element를 제거하는 함수입니다
            function removeAllChildNods(el) {
                while (el.hasChildNodes()) {
                    el.removeChild(el.lastChild);
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

                    // 마커를 클릭하면 장소명이 인포윈도우에 표출
                    infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
                    infowindow.open(map, marker);
                });
            }
        }

        // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
        var zoomControl = new kakao.maps.ZoomControl();
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

        // 등록된 장소 표시 로직
        // 마커를 표시할 위치와 title 객체 배열
        let positions = titleAndCoords.map(item => {
            const title = item.title
            const latlngs = item.coords
            return {title, latlng: new kakao.maps.LatLng(latlngs[1], latlngs[0])}
        })

        const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png'
        for (var i = 0; i < positions.length; i++) {

            // 마커 이미지의 이미지 크기 입니다
            var imageSize = new kakao.maps.Size(24, 35);

            // 마커 이미지를 생성합니다
            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

            // 마커를 생성합니다
            var staticMarker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: positions[i].latlng, // 마커를 표시할 위치
                image: markerImage, // 마커 이미지
            });

            // 마커에 표시할 인포윈도우를 생성합니다
            var staticInfowindow = new kakao.maps.InfoWindow({
                // 인포윈도우에 표시할 내용
                content: `<div style="font-size: 12px;padding: 5px;">${positions[i].title}</div>`
            });
            // 마커에 이벤트를 등록하는 함수 만들고 즉시 호출하여 클로저를 만듭니다
            (function (staticMarker, staticInfowindow) {
                // 마커에 mouseover 이벤트를 등록하고 마우스 오버 시 인포윈도우를 표시합니다
                kakao.maps.event.addListener(staticMarker, 'mouseover', function () {
                    staticInfowindow.open(map, staticMarker);
                });

                // 마커에 mouseout 이벤트를 등록하고 마우스 아웃 시 인포윈도우를 닫습니다
                kakao.maps.event.addListener(staticMarker, 'mouseout', function () {
                    staticInfowindow.close();
                });
            })(staticMarker, staticInfowindow);
        }
    }, [keyword, titleAndCoords, kakao.maps.ControlPosition.LEFT, kakao.maps.InfoWindow, kakao.maps.LatLng, kakao.maps.LatLngBounds, kakao.maps.Map, kakao.maps.Marker, kakao.maps.MarkerImage, kakao.maps.Size, kakao.maps.ZoomControl, kakao.maps.event, kakao.maps.services.Places, kakao.maps.services.Status.OK, setKeyword, setPlaceObj]);
    return (
        <>
            <div id={`myMap`} style={{
                minHeight: '88vh',
                border: '1px solid #333',
                borderRadius: '4px',
                width: '45vw'
            }}></div>
        </>
    );
}

export default MapContainer;