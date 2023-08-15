import React, { Suspense, useLayoutEffect } from "react";
import axios from 'axios';

import { ReactComponent as Write } from "../img/icon/write.svg";
import LocationMarker from "../img/icon/location_select.svg";

import Nav from "../component/BottomNav";
import Loading from "../pages/Loading"
import { useNavigate } from "react-router-dom";

// 스크립트로 kakao map api를 심어서 가져오면, window 전역 객체에 들어가게 된다.
// 함수형 컴포넌트에서는 바로 인식하지 못하므로, kakao 객체를 인지시키고자 상단에 선언해둔다.
const { kakao } = window; // window 내 kakao 객체를 빼와서 사용

/*
  PostMap : id, 주소를 받아 지도 객체를 반환함
  - postId : 해당 post tag의 id (문자열)
  - postLocation : 해당 post의 주소 문자열 (DB에서 추출)
*/
// const PostMap = (postId, postLocation) => {
//   kakao.maps.load(async () => {
//     const mapContainer = await document.getElementById(postId),
//       mapOption = {
//         center: new kakao.maps.LatLng(33.450701, 126.570667),
//         level: 3
//       };

//     const map = await new kakao.maps.Map(mapContainer, mapOption);
//     const geocoder = new kakao.maps.services.Geocoder();

//     geocoder.addressSearch(postLocation, function (result, status) {
//       if (status === kakao.maps.services.Status.OK) {
//         // 주소로 얻어낸 좌표
//         let coords = new kakao.maps.LatLng(result[0].y, result[0].x);

//         // 마커 생성
//         const markerImage = new kakao.maps.MarkerImage(
//           LocationMarker, 
//           new kakao.maps.Size(40, 40)
//         );

//         let marker = new kakao.maps.Marker({
//           map: map,
//           position: coords,
//           image: markerImage
//         });

//         marker.setMap(map);
//         map.setCenter(coords);
//       }
//     });
//   });

//   return (
//     <React.Fragment>
//       <div id={postId} className="w-full h-full"></div>
//     </React.Fragment>
//   )
// }
let lists = []

async function getlist() {
  axios.get("http://localhost:3004/api/post/lists")
    .then((response) => {
      lists = response.data
      console.log(lists)
      console.log("success");
    })
    .catch(() => {
      console.log("fail");
    })
}


const ShareInfo = () => {

  const navigate = useNavigate();

  function write() {
    navigate("./write")
  }

  const tagColorArray = ["bg-[#000AFF]", "bg-[#00C2FF]", "bg-[#E37A39]", "bg-[#FF0000]"];
  //지금당장 , 어제갔다왔음, 오늘하더라, 내일도한다
  const tagTextArray = ["지금당장", "어제갔다왔음", "오늘도하더라", "내일도한다"]

  useLayoutEffect(()=>{
   getlist() 
  },[])

  return (
    <React.Fragment>
      <div className="flex justify-center items-center text-lg font-medium my-3">해운대구</div>
      <div className="border-b-2 border-d9d9d9 w-11/12 m-auto" />
      {
        lists && lists.map((item, index) => {
          return (
            <div key={index} className="w-10/12 m-auto">
              <div className="flex justify-between my-3">
                <div className="">
                  <div className="text-xl">{item.title}</div>
                  <div className="text-sm -mt-1" >{item.date}</div>
                </div>
                <div className="rounded-full border-2 w-1/3 text-sm flex justify-center items-center h-8 mt-2">
                  <div className={tagColorArray[item.tag] + ' w-3 h-3 m-1 rounded-full'}></div>
                  {tagTextArray[item.tag]}
                </div>
              </div>
              <div
                className="flex justify-center items-center w-full h-48 bg-indigo-200 place-center">
                {/* TEST : postId 작성하고, DB에서 해당 글의 postLocation 입력 바람 */}
                {/* { PostMap("test", '부산 해운대구 달맞이길65번길 154 지하2층 카린') } */}
              </div>
              <div className="text-sm my-3">
                {item.content}
              </div>
              <br />
              <div className="border-b-2 border-d9d9d9"></div>
            </div>
          )
        })
      }
      <Write className="fixed bottom-[60px] right-0 -mb-4 -mr-4" onClick={write} ></Write>
      <div className="h-[60px]"></div>
      <Nav />
    </React.Fragment>
  );
};

export default ShareInfo;