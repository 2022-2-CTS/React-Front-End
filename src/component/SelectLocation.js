import React from "react";
import { useState, useEffect, useRef } from "react";

import LocationMarker from "../img/icon/location_select.svg";

// 스크립트로 kakao map api를 심어서 가져오면, window 전역 객체에 들어가게 된다.
// 함수형 컴포넌트에서는 바로 인식하지 못하므로, kakao 객체를 인지시키고자 상단에 선언해둔다.
const { kakao } = window; // window 내 kakao 객체를 빼와서 사용

// func: 좌표->상세주소 변환 요청
function searchDetailAddrFromCoords(geocoder, coords, callback) {
    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
}

// 컴포넌트 생성 시, 지도를 움직이지 않았을 때도 주소 문자열을 가져오도록 함
function setLocationForAddress(geocoder, setLocation, centerLatlng, setNowLocation, first) {
    searchDetailAddrFromCoords(geocoder, centerLatlng, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
            // 도로명주소 or 지번주소 반환
            var detailAddr = !!result[0].road_address ?
                result[0].road_address.address_name :
                result[0].address.address_name;

            // setLocation(detailAddr);
            setNowLocation(detailAddr);
        }
    });
}

// setTestResponse 함수 : 부모 컴포넌트의 testResponse state의 setter
const SelectLocation = ({ setLocation, setSelectLocationToggle }) => {
    let [nowLocation, setNowLocation] = useState(null);
    
    // 현재 위치
    let [myLat, setMyLat] = useState(null);
    let [myLng, setMyLng] = useState(null);

    const clickComplete = () => {
        console.log(nowLocation) 
        setLocation(nowLocation)
        setSelectLocationToggle(false)
    }

    const mapContainer = useRef(null);

    useEffect(() => {
        // kakao.js가 load됐을 때 메서드 호출
        // 요소가 준비되지 않았으면, 아무것도 하지 않음
        if (!mapContainer.current) return;

        kakao.maps.load(() => {
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

            const map = new kakao.maps.Map(mapContainer.current, options);

            // 주소-좌표 변환 객체 생성
            const geocoder = new kakao.maps.services.Geocoder();

            // 마커 생성
            const markerImage = new kakao.maps.MarkerImage(
                LocationMarker,
                new kakao.maps.Size(55, 55)
            );

            let marker = new kakao.maps.Marker({ image: markerImage });

            // 이전 마커 흔적 clear
            marker.setMap(null);

            // 중심 좌표 요청
            let centerLatlng = map.getCenter();
            marker.setPosition(centerLatlng);
            marker.setMap(map);

            setLocationForAddress(geocoder, setLocation, centerLatlng, setNowLocation, true);

            // feat: 중심 좌표가 바뀔 때마다 trigger
            kakao.maps.event.addListener(map, 'center_changed', function () {
                // 지도 중심좌표 얻기
                centerLatlng = map.getCenter();
                marker.setPosition(centerLatlng);
                marker.setMap(map);

                setLocationForAddress(geocoder, setLocation, centerLatlng, setNowLocation, false);
            });
        })

    }, [myLat, myLng]);

    return (
        <React.Fragment>
            <div className="m-auto flex flex-col items-center animated-fade max-w-[640px]">
                {/* map */}
                <div ref={mapContainer} id="map" className="w-full h-screen"></div>

                {/* complete button */}
                <button className="bg-[#1F83EB] h-[60px] w-5/6 max-w-[600px]
            z-50 fixed bottom-5
            rounded-xl
            flex flex-col items-center justify-center m-auto"
                    onClick={() => clickComplete()}>
                    <div className="flex items-center justify-center
                text-white font-light text-sm">
                        {nowLocation}
                    </div>
                    <div className="flex items-center justify-center 
                text-white font-medium text-xl"
                    >선택 완료</div>
                </button>
            </div>
        </React.Fragment>
    );
};

export default SelectLocation;