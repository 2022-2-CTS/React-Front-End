import React from "react";
import { useEffect } from "react";

import Nav from "../component/BottomNav";

// 스크립트로 kakao map api를 심어서 가져오면, window 전역 객체에 들어가게 된다.
// 함수형 컴포넌트에서는 바로 인식하지 못하므로, kakao 객체를 인지시키고자 상단에 선언해둔다.
const { kakao } = window; // window 내 kakao 객체를 빼와서 사용

const Map = () => {
    useEffect(() => {
        const container = document.getElementById("map");
        const options = {
          center: new kakao.maps.LatLng(35.14932, 129.11462, 16),
          level: 6,
        };


        const map = new kakao.maps.Map(container, options);
    }, []);

    return (
        <React.Fragment>
            <div id="map" className="w-screen h-screen"></div>

            <Nav />
        </React.Fragment>
    );
};

export default Map;