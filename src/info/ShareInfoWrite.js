import React, { useState } from "react";

import SelectLocation from "../component/SelectLocation";
import { ReactComponent as Position } from "../img/icon/position.svg";

function writedone() {
  window.location.href = "../shareinfo"
}

const ShareInfoWrite = () => {
  // 선택된 위치 주소 문자열
  let [location, setLocation] = useState("");
  // 위치 선택 컴포넌트 toggle
  let [selectLocationToggle, setSelectLocationToggle] = useState(false);

  return (
    <React.Fragment>
      { selectLocationToggle ? <SelectLocation className="fixed left-0 top-0 right-0"
      setLocation={ setLocation }
      setSelectLocationToggle={ setSelectLocationToggle }></SelectLocation> : null }

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

          {/* 선택된 위치 주소 : { location } 사용하면 됨 */}
          <div>location: { location }</div>
          <Position className="inline-block" onClick={ () => setSelectLocationToggle(!selectLocationToggle) }></Position>
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
    </React.Fragment>
  );
};

export default ShareInfoWrite;