import React from "react";

import { ReactComponent as Write } from "../img/icon/write.svg";
import LocationMarker from "../img/icon/location_select.svg";

// 스크립트로 kakao map api를 심어서 가져오면, window 전역 객체에 들어가게 된다.
// 함수형 컴포넌트에서는 바로 인식하지 못하므로, kakao 객체를 인지시키고자 상단에 선언해둔다.
const { kakao } = window; // window 내 kakao 객체를 빼와서 사용

function write() {
  window.location.href = "./shareinfo/write"
}

/*
  PostMap : id, 주소를 받아 지도 객체를 반환함
  - postId : 해당 post tag의 id (문자열)
  - postLocation : 해당 post의 주소 문자열 (DB에서 추출)
*/
const PostMap = (postId, postLocation) => {
  kakao.maps.load(() => {
    let mapContainer = document.getElementById(postId),
      mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3
      };

    let map = new kakao.maps.Map(mapContainer, mapOption);
    let geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(postLocation, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        // 주소로 얻어낸 좌표
        let coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        // 마커 생성
        const markerImage = new kakao.maps.MarkerImage(
          LocationMarker, 
          new kakao.maps.Size(40, 40)
        );

        let marker = new kakao.maps.Marker({
          map: map,
          position: coords,
          image: markerImage
        });

        map.setCenter(coords);
      }
    });
  });

  return (
    <React.Fragment>
      <div id={postId} className="w-full h-full"></div>
    </React.Fragment>
  )
}

let post = [1, 2, 3, 4, 5]

const ShareInfo = () => {
  return (
    <div>
      <div className="flex justify-center items-center text-xl">해운대구</div>
      <div className="border-b-2 border-d9d9d9"></div>

      {
        post.map((index) => {
          return (
            <div>
              <div>
                <div className="inline-flex">행사이름</div>
                <div className="inline-block">태그</div>
                <div className="inline-block">작성일</div>
              </div>
              <div className="flex justify-center items-center w-3/4 h-48 bg-indigo-200 place-center">
                  {/* TEST : postId 작성하고, DB에서 해당 글의 postLocation 입력 바람 */}
                  { PostMap("test", '부산 해운대구 달맞이길65번길 154 지하2층 카린') }
              </div>
              <div>
                글내용
              </div>
              <br />
            </div>
          )
        })
      }
      <Write className="fixed bottom-0 right-0" onClick={write} ></Write>
    </div>
  );
};

export default ShareInfo;