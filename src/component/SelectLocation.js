import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 스크립트로 kakao map api를 심어서 가져오면, window 전역 객체에 들어가게 된다.
// 함수형 컴포넌트에서는 바로 인식하지 못하므로, kakao 객체를 인지시키고자 상단에 선언해둔다.
const { kakao } = window; // window 내 kakao 객체를 빼와서 사용

// setTestResponse 함수 : 부모 컴포넌트의 testResponse state의 setter
const SelectLocation = ({setTestResponse}) => {
    const navigate = useNavigate();

    useEffect(() => {
        // kakao.js가 load됐을 때 메서드 호출
        kakao.maps.load(() => {
            const container = document.getElementById("map");
            const options = {
                center: new kakao.maps.LatLng(35.14932, 129.11462, 16),
                level: 6,
            };

            const map = new kakao.maps.Map(container, options);

            // 주소-좌표 변환 객체 생성
            var geocoder = new kakao.maps.services.Geocoder();
            var marker = new kakao.maps.Marker(); // 클릭한 위치를 표시할 마커입니다

            kakao.maps.event.addListener(map, 'center_changed', function() {        
                // 지도 중심좌표 얻기
                let centerLatlng = map.getCenter(); 
                
                function searchDetailAddrFromCoords(coords, callback) {
                    // 좌표로 법정동 상세 주소 정보를 요청합니다
                    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
                }

                searchDetailAddrFromCoords(centerLatlng, function(result, status) {
                                    
                    
                    // let message = '변경된 지도 중심좌표는 ' + latlng.getLat() + ' 이고, ';
                    // message += '경도는 ' + latlng.getLng() + ' 입니다';

                    marker.setMap(null);

                    if (status === kakao.maps.services.Status.OK) {
                        // 도로명주소 or 지번주소
                        var detailAddr = !!result[0].road_address ? result[0].road_address.address_name : result[0].address.address_name;
                        console.log(detailAddr);
                        
                        marker.setPosition(centerLatlng);
                        marker.setMap(map);
                        setTestResponse(detailAddr);
                    }
                });

            });
        })

    }, []);

    return (
        <React.Fragment>
            {/* map */}
            <div id="map" className="w-screen h-screen"></div>


            {/* complete button */}
            <button className="bg-white h-[60px] w-screen
            z-50 fixed bottom-0
            flex items-center justify-between">
                
            </button>
        </React.Fragment>
    );
};

export default SelectLocation;