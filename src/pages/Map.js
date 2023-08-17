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

// 카테고리별로 덮어씌울 행사 마커
var markerArray = []

// 행사 목록 요청 API 호출
async function getEventInfoRequest(url, setter) {
    await axios.get(url)
        .then((response) => {
            // 각 행사 데이터를 넣어줌
            setter(response.data);
            console.log("success");
        })
        .catch(() => {
            console.log("fail");
        });
}

async function getEventInfo(setter, url) {
    await getEventInfoRequest('http://localhost:3004/api/event' + url, setter);
}

function setEventMarker(navigate, map, geocoder, data, markerImage) {
    if (markerArray.length > 0) {
        for (let i = 0; i < markerArray.length; i++) {
            markerArray[i].setMap(null);
        }
    }
    for (let i = 0; i < data.length; i++) {
        geocoder.addressSearch(data[i].location, function (result, status) {
            if (status === kakao.maps.services.Status.OK) {
                let coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                // 검색 결과 좌표를 이용해 마커 그리기
                let marker = new kakao.maps.Marker({
                    map: map,
                    position: coords,
                    image: new kakao.maps.MarkerImage(markerImage, new kakao.maps.Size(55, 55))
                });

                // 지도 중심을 마커로 이동
                // map.setCenter(coords);

                // 마커 클릭이벤트 등록
                kakao.maps.event.addListener(marker, 'click', function () {
                    // 클릭한 마커가 갖고 있는 행사 정보를 함께 보내는 라우팅
                    navigate('/detail', {
                        state: {
                            title: data[i].title,
                            location: data[i].location,
                            duration: data[i].startDate + ' ~ ' + data[i].endDate,
                            time: data[i].time,
                            price: data[i].price,
                            src: data[i].src
                        }
                    });
                });

                markerArray.push(marker);
            }
        });
    }
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
    let [musicalsData, setMusicalsData] = useState([]);
    let [playsData, setPlaysData] = useState([]);
    let [exhibitionsData, setExhibitionsData] = useState([]);
    let [concertsData, setConcertsData] = useState([]);

    const categoryArray = ["뮤지컬", "연극", "공연·전시", "콘서트"];
    const categoryURL = ["/musicals", "/plays", "/exhibitions", "/concerts"];
    const categoryColorArray = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500"];

    const [map, setMap] = useState(null);
    const [geocoder, setGeocoder] = useState(null);

    // 현재 위치
    let [myLat, setMyLat] = useState(null);
    let [myLng, setMyLng] = useState(null);

    // MAP SETTING Effect
    useEffect(() => {
        // kakao.js가 load됐을 때 메서드 호출
        kakao.maps.load(() => {
            const container = document.getElementById("map");

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    let lat = position.coords.latitude, // 위도
                        lng = position.coords.longitude; // 경도

                    setMyLat(lat);
                    setMyLng(lng);
                });
            }

            const options = {
                center: new kakao.maps.LatLng(myLat, myLng, 16),
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

            setMap(map);
            setGeocoder(geocoder);
        });

    }, [myLat, myLng]);

    // 선택한 카테고리 index가 바뀔 때마다 호출되는 Effect
    useEffect(() => {
        let eventAPI = null;
        if (selectedCategoryIndex == 0) {
            eventAPI = async () => {
                await getEventInfo(setMusicalsData,
                    categoryURL[selectedCategoryIndex]);
            }

            eventAPI();
        }

        if (selectedCategoryIndex == 1) {
            eventAPI = async () => {
                await getEventInfo(setPlaysData,
                    categoryURL[selectedCategoryIndex]);
            }

            eventAPI();
        }

        if (selectedCategoryIndex == 2) {
            eventAPI = async () => {
                await getEventInfo(setExhibitionsData,
                    categoryURL[selectedCategoryIndex]);
            }

            eventAPI();
        }

        if (selectedCategoryIndex == 3) {
            eventAPI = async () => {
                await getEventInfo(setConcertsData,
                    categoryURL[selectedCategoryIndex]);
            }

            eventAPI();
        }

    }, [selectedCategoryIndex]);

    // 각 행사 데이터가 바뀔 때마다 호출되는 Effect
    useEffect(() => {
        if (musicalsData.length > 0 &&
            selectedCategoryIndex == 0) {
            setEventMarker(navigate, map, geocoder, musicalsData, MarkerMusical);
        }
        if (playsData.length > 0 &&
            selectedCategoryIndex == 1) {
            setEventMarker(navigate, map, geocoder, playsData, MarkerPlay);
        }
        if (exhibitionsData.length > 0 &&
            selectedCategoryIndex == 2) {
            setEventMarker(navigate, map, geocoder, exhibitionsData, MarkerExhibition);
        }
        if (concertsData.length > 0 &&
            selectedCategoryIndex == 3) {
            setEventMarker(navigate, map, geocoder, concertsData, MarkerConcert);
        }
    }, [musicalsData, playsData, exhibitionsData, concertsData]);


    const category = (categoryName, colorIndex) => {
        return (
            <li onClick={() => {
                setselectedCategoryIndex(colorIndex);
                console.log(selectedCategoryIndex);
            }}
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
            <div id="map" className="max-w-[1280px] animated-fade w-screen h-screen"></div>

            {/* bottom nav bar */}
            <Nav />
        </React.Fragment>
    );
};

export default Map;