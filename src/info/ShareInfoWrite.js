import React from "react";

import { ReactComponent as Position } from "../img/icon/position.svg";

function selectmap(){
  window.location.href="지도 위치 선택페이지"
}

function writedone(){
  window.location.href="../shareinfo"
}

const ShareInfoWrite = () => {
  return (
    <div>
      <div className="flex justify-center items-center text-xl">정보작성</div>
      <div className="border-b-2 border-d9d9d9"></div>
      <div>
        <div>
          <div>행사제목</div>
          <input type="text"></input>
        </div>
        <div>
          <div className="inline-flex">위치</div>
          <div className="inline-block">선택된 위치 주소</div>
          <Position className="inline-block" onClick={selectmap}></Position>
        </div>
        <div>
          <div className="inline-flex">태그</div>
          <div className="inline-block">태그</div>
        </div>
        <div>
          <div className="inline-flex">태그</div>
          <div className="inline-block">태그</div>
        </div>
        <div className="">
          내용
        </div>
        <input type="text"></input>
        <button className="flex items-center justify-center m-auto" onClick={writedone}>
          작성완료버튼
        </button>
      </div>
    </div>
  );
};

export default ShareInfoWrite;