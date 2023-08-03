import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Nav from "../component/BottomNav";

import MarkerMusical from "../img/icon/marker_musical_red.svg";
import MarkerPlay from "../img/icon/marker_play_blue.svg";
import MarkerExhibition from "../img/icon/marker_exhibition_green.svg";
import MarkerConcert from "../img/icon/marker_concert_yellow.svg";

// 스크립트로 kakao map api를 심어서 가져오면, window 전역 객체에 들어가게 된다.
// 함수형 컴포넌트에서는 바로 인식하지 못하므로, kakao 객체를 인지시키고자 상단에 선언해둔다.
const { kakao } = window; // window 내 kakao 객체를 빼와서 사용

async function getEventInfoRequest(url, setter) {
    await axios.get(url)
    .then((response) => {
        setter(...response);
    });
}

async function getEventInfo(musicalsSetter, playsSetter, exhibitionsSetter, concertsSetter) {
    await getEventInfoRequest('http://localhost:3004/api/event/musicals', musicalsSetter)
    await getEventInfoRequest('http://localhost:3004/api/event/plays', playsSetter)
    await getEventInfoRequest('http://localhost:3004/api/event/exhibitions', exhibitionsSetter)
    await getEventInfoRequest('http://localhost:3004/api/event/concerts', concertsSetter)
}

function test(navigate, map, geocoder, data, markerImage) {
    // for(let i = 0; i < data.length; i++) {
        geocoder.addressSearch(data.location, function (result, status) {
            if (status === kakao.maps.services.Status.OK) {
                let coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                // 검색 결과 좌표를 이용해 마커 그리기
                let marker = new kakao.maps.Marker({
                    map: map,
                    position: coords,
                    image: new kakao.maps.MarkerImage(markerImage, new kakao.maps.Size(55, 55))
                });

                // 지도 중심을 마커로 이동
                map.setCenter(coords);

                // 마커 클릭이벤트 등록
                kakao.maps.event.addListener(marker, 'click', function () {
                    // 클릭한 마커가 갖고 있는 행사 정보를 함께 보내는 라우팅
                    navigate('/detail', {
                        state: {
                            title: data.title,
                            location: data.location,
                            duration: data.startDate + ' ~ ' + data.endDate,
                            time: data.time,
                            price: data.price,
                            src: data.imgSrc
                        }
                    });
                });
            }
        });
    // }
}

const Map = () => {
    const navigate = useNavigate();
    /*
        현재 선택한 카테고리 index
        0 : 뮤지컬
        1 : 연극
        2 : 공연·전시
        3 : 콘서트
    */
    let [selectedCategoryIndex, setselectedCategoryIndex] = useState(0);

    // 행사 목록 불러오기
    let [musicalsData, setMusicalsData] = useState(null);
    let [playsData, setPlaysData] = useState(null);
    let [exhibitionsData, setExhibitionsData] = useState(null);
    let [concertsData, setConcertsData] = useState(null);

    const categoryArray = ["뮤지컬", "연극", "공연·전시", "콘서트"];
    const categoryColorArray = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500"];

    useEffect(() => {
        // getEventInfo(
        //     setMusicalsData,
        //     setPlaysData,
        //     setExhibitionsData,
        //     setConcertsData
        // );

        // kakao.js가 load됐을 때 메서드 호출
        kakao.maps.load(() => {
            const container = document.getElementById("map");
            const options = {
                center: new kakao.maps.LatLng(35.14932, 129.11462, 16),
                level: 6,
            };

            const map = new kakao.maps.Map(container, options);

            // 주소-좌표 변환 객체 생성
            const geocoder = new kakao.maps.services.Geocoder();

            var testData = {
                title: "METAPHORIC SCENERY : 은유적 풍경",
                location: "부산 해운대구 달맞이길65번길 154 지하2층 카린갤러리",
                startDate: "2023.07.07",
                endDate: "2023.08.27",
                time: "10:00 - 18:00 (월요일 휴무)",
                price: "무료"
            }

            test(navigate, map, geocoder, testData, MarkerMusical);

            // 주소로 좌표 검색
            // geocoder.addressSearch('부산 해운대구 달맞이길65번길 154 지하2층 카린', function (result, status) {

            //     // 검색 성공
            //     if (status === kakao.maps.services.Status.OK) {

            //         var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

            //         // 검색 결과 좌표를 이용해 마커 그리기
            //         var marker = new kakao.maps.Marker({
            //             map: map,
            //             position: coords,
            //             image: new kakao.maps.MarkerImage(MarkerMusical, new kakao.maps.Size(55, 55))
            //         });

            //         // 지도 중심을 마커로 이동
            //         map.setCenter(coords);

            //         // 마커 클릭이벤트 등록
            //         kakao.maps.event.addListener(marker, 'click', function () {
            //             // 클릭한 마커가 갖고 있는 행사 정보를 함께 보내는 라우팅
            //             navigate('/detail', {
            //                 state: {

            //                 }
            //             });
            //         });
            //     }
            // });
        });

    }, []);


    const category = (categoryName, colorIndex) => {
        return (
            <li onClick={() => setselectedCategoryIndex(colorIndex)}
                key={categoryName}
                className="flex items-center justify-center
        whitespace-no-wrap text-center overflow-auto mt-2 h-full
        border-2
        no-underline inline-block bg-white mr-2 w-auto text-gray-700 font-normal
        rounded-full px-2 py-1
        active:brightness-75">
                {/* category color circle */}
                <div className={categoryColorArray[colorIndex] + ' w-2 h-2 m-1 rounded-full'}></div>
                {/* category name */}
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