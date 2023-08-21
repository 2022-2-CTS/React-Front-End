import React, { Suspense, useEffect, useLayoutEffect, useState, useRef } from "react";
import axios from 'axios';

import { ReactComponent as Write } from "../../img/icon/write.svg";
import { ReactComponent as Position } from "../../img/icon/position.svg";

import LocationMarker from "../../img/icon/location_select.svg";

import Nav from "../../component/BottomNav";
import { useNavigate } from "react-router-dom";

// 스크립트로 kakao map api를 심어서 가져오면, window 전역 객체에 들어가게 된다.
// 함수형 컴포넌트에서는 바로 인식하지 못하므로, kakao 객체를 인지시키고자 상단에 선언해둔다.
const { kakao } = window; // window 내 kakao 객체를 빼와서 사용

/*
  PostMap : id, 주소를 받아 지도 객체를 반환함
  - postId : 해당 post tag의 id (문자열)
  - postLocation : 해당 post의 주소 문자열 (DB에서 추출)
*/
const PostMap = ({ postId, postLocation }) => {
  // 요소가 준비되어 있는지 체크하기 위해 사용되는 useRef hook
  // 함수가 아닌 함수 컴포넌트이므로 hook 사용 가능
  const mapContainer = useRef(null);

  // 요소가 생성된 후에 kakao map api를 사용하도록 함
  useEffect(() => {
    // 요소가 준비되지 않았으면, 아무것도 하지 않음
    if (!mapContainer.current) return;

    kakao.maps.load(async () => {
      const mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3
      };

      // mapContainer 변수를 지도 컨테이너 엘리먼트에 연결
      const map = new kakao.maps.Map(mapContainer.current, mapOption);
      const geocoder = new kakao.maps.services.Geocoder();

      geocoder.addressSearch(postLocation, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          let coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          const markerImage = new kakao.maps.MarkerImage(
            LocationMarker,
            new kakao.maps.Size(40, 40)
          );

          let marker = new kakao.maps.Marker({
            map: map,
            position: coords,
            image: markerImage
          });

          marker.setMap(map);
          map.setCenter(coords);
        }
      });
    });
  }, [postLocation]);

  return (
    <div ref={mapContainer} id={postId} className="w-full h-full relative -z-10"></div>
  );
}

const Post = () => {
  const [lists, setLists] = useState([]);
  const [len, setListLength] = useState();
  const [isCallLists, setIsCallLists] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await axios.get('http://localhost:3004/api/post/lists')
        .then((res) => {
          setLists(res.data);
          console.log(res.data);
          setListLength(res.data.length - 1);
          setIsCallLists(true);
        }).catch(() => {
          console.log("fail");
          setLists([
            {
              title: "test",
              date: "test",
              tag: 0,
              content: "test"
            },
            {
              title: "test",
              date: "test",
              tag: 0,
              content: "test"
            },
            {
              title: "test",
              date: "test",
              tag: 0,
              content: "test"
            },
            {
              title: "test",
              date: "test",
              tag: 0,
              content: "test"
            },
          ]);

          // setTimeout(() => setIsCallLists(true), 2000);
          
        })
    }

    console.log(len);
    fetchData();
  }, []);


  const navigate = useNavigate();

  function write() {
    navigate("./write")
  }

  const tagColorArray = ["bg-[#000AFF]", "bg-[#00C2FF]", "bg-[#E37A39]", "bg-[#FF0000]"];
  const tagTextArray = ["지금당장", "어제갔다왔음", "오늘도하더라", "내일도한다"]

  return (
    <React.Fragment>
      <div className="animated-fade h-full bg-white
      flex flex-col drop-shadow-bg">
        <div className="sticky top-0 bg-white relative z-9999">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium m-4">
              해운대구
            </span>
            <Position className="drop-shadow-position w-12 m-4" />
          </div>
          <hr className="mx-2" />

          {
            isCallLists ?
              null :
              <div role="status"
                className="flex items-center justify-center h-screen
        relative fixed top-0 bg-transparent w-full -mt-24">
                <svg aria-hidden="true" class="w-14 h-14 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
          }

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
                    className="flex justify-center items-center w-full h-48 place-center">
                    <PostMap postId={item.title} postLocation={item.location} />
                  </div>

                  <div className="text-sm mt-2">
                    {item.content}
                  </div>
                  <br />
                </div>

                <div className={len == index ? null : 'w-full border-b-2 border-d9d9d9'}></div>
              </div>
            )
          })
        }

        <div className="h-[60px] sm:h-[120px]"></div>
      </div>

      <div className="flex justify-end items-center">

        <Write className="fixed bottom-0 z-40
          mb-12 sm:mb-20 -mr-3 self-end
          w-[120px] h-[120px]
          sm:w-[150px] sm:h-[150px]
          hover:cursor-pointer hover:scale-110 transition
            active:brightness-75
            active:scale-110"
          onClick={write} ></Write>
      </div>
      <Nav />
    </React.Fragment>
  );
};

export default Post;