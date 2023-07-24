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

    const categoryArray = ["뮤지컬", "연극", "공연·전시", "콘서트"]
    const categoryColorArray = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500"]

    const category = (categoryName, colorIndex) => {
        return (
            <li className="flex items-center justify-center
            whitespace-no-wrap text-center overflow-auto mt-2 h-full
            border-2
            no-underline inline-block bg-white mr-2 w-auto text-gray-700 font-normal
            rounded-full px-2 py-1">
                <div className={categoryColorArray[colorIndex] + ' w-2 h-2 m-1 rounded-full'}>

                </div>
                <div className="pb-[1.5px]">
                    {categoryName}
                </div>
            </li>
        )
    }

    return (
        <React.Fragment>
            {/* category */}
            <div className="flex justify-center items-center">
                <div className="fixed z-40 top-0">
                    <ul className="flex justify-center items-center">
                        {categoryArray.map((item, index) => { return category(item, index) })}
                    </ul>
                </div>
            </div>

            {/* map */}
            <div id="map" className="w-screen h-screen"></div>


            {/* bottom nav bar */}
            <Nav />
        </React.Fragment>
    );
};

export default Map;