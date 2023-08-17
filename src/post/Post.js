import React, { Suspense, useEffect, useLayoutEffect, useState } from "react";
import axios from 'axios';

import { ReactComponent as Write } from "../img/icon/write.svg";
import { ReactComponent as Position } from "../img/icon/position.svg";

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

const Post = () => {

  const [lists, getlists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('http://localhost:3004/api/post/lists');
      return res.data;
    }
    fetchData().then(res => getlists(res));
  }, []);


  const navigate = useNavigate();

  function write() {
    navigate("./write")
  }

  const tagColorArray = ["bg-[#000AFF]", "bg-[#00C2FF]", "bg-[#E37A39]", "bg-[#FF0000]"];
  const tagTextArray = ["지금당장", "어제갔다왔음", "오늘도하더라", "내일도한다"]


  return (
    <React.Fragment>
      <div className="animated-fade relative h-screen bg-white">
        <div className="sticky top-0 bg-white">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium m-4">
              해운대구
            </span>
            <Position className="drop-shadow-position w-12 m-4" />
          </div>
          <hr className="mx-2" />
        </div>
        {
          lists.map((item, index) => {
            return (
              <div>
                <div key={index} className="flex flex-col w-11/12 m-auto">
                  <div className="flex justify-between my-2">
                    <div>
                      <div className="text-l font-bold">{item.title}</div>
                      <div className="text-xs -mt-1" >{item.date}</div>
                    </div>
                    <div className="rounded-full border w-auto text-xs font-light flex justify-start items-center h-6 mt-2 pl-1 pr-3">
                      <div className={tagColorArray[item.tag] + ' w-2.5 h-2.5 m-1 rounded-full'}></div>
                      {tagTextArray[item.tag]}
                    </div>
                  </div>
                  <div
                    className="flex justify-center items-center w-full h-48 bg-indigo-200 place-center">
                    {/* TEST : postId 작성하고, DB에서 해당 글의 postLocation 입력 바람 */}
                    {/* { PostMap("test", '부산 해운대구 달맞이길65번길 154 지하2층 카린') } */}
                  </div>
                  <div className="text-sm mt-2">
                    {item.content}
                  </div>
                  <br />
                </div>
                <div className="w-full border-b-2 border-d9d9d9"></div>
              </div>
            )
          })
        }
        <Write className="absolute bottom-0 right-0 mb-14 -mr-0"
          onClick={write} ></Write>

        <div className="h-[60px]"></div>
      </div>
      <Nav />
    </React.Fragment>
  );
};

export default Post;