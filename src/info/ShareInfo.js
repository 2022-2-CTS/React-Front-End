import React from "react";

import { ReactComponent as Write } from "../img/icon/write.svg";

function write() {
  window.location.href = "./shareinfo/write"
}

let post = [1, 2, 3, 4,5]

const ShareInfo = () => {
  return (
    <div>
      <div className="flex justify-center items-center text-xl">해운대구</div>
      <div className="border-b-2 border-d9d9d9"></div>
      {
        post.map(function () {
          return (
            <div>
              <div>
                <div className="inline-flex">행사이름</div>
                <div className="inline-block">태그</div>
                <div className="inline-block">작성일</div>
              </div>
              <div className=" flex justify-center items-center w-3/4 h-48 bg-indigo-200 place-center">
                지도 이미지
              </div>
              <div>
                글내용
              </div>
              <br/>
            </div>
          )
        })
      }
      <Write className="fixed bottom-0 right-0" onClick={write} ></Write>
    </div>
  );
};

export default ShareInfo;