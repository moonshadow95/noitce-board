import React, { useEffect } from "react";
import cn from "classnames";

const { kakao } = window;

let userLatitude;
let userLongitude;
let options

const Map = () => {
    useEffect(() => {
        let container = document.getElementById("map");

        if('geolocation' in navigator) {
            /* 위치정보 사용 가능 */
            navigator.geolocation.getCurrentPosition((pos)=> {
                options = {
                    center: new window.kakao.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                    level: 4,
                };
                let map = new window.kakao.maps.Map(container, options);
                console.log("loading kakaomap");
            });
        } else {
            /* 위치정보 사용 불가능 */
            alert('위치정보를 사용할 수 없습니다.')
        }


    }, []);

    return (
        <div className={cn("Map")} style={{width:"500px", height:"400px"}}>
            <div className={cn("MapContainer")} style={{height:"100%"}} id="map">
            </div>
        </div>
    );
};

export default Map;