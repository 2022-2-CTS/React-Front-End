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

  let [tag, setTag] = useState();

  return (
    <React.Fragment>
      {selectLocationToggle ? <SelectLocation className="fixed left-0 top-0 right-0"
        setLocation={setLocation}
        setSelectLocationToggle={setSelectLocationToggle}></SelectLocation> : null}

      <div className="flex justify-center items-center text-2xl my-3">정보작성</div>
      <div className="border-b-2 border-d9d9d9"></div>
      <div>
        <div className="w-5/6 m-auto">
          <div className=" my-3 text-xl">행사제목</div>
          <input className="flex justify-center py-2 bg-white border border-slate-300 focus:outline-none w-full rounded-lg" />
        </div>

        <div className="w-5/6 m-auto my-3 text-xl">위치</div>
        <div className="flex w-5/6 m-auto">
          <div className=" bg-white border border-slate-300 rounded-lg w-full"> {location}</div>
          <Position className="w-1/4" onClick={() => setSelectLocationToggle(!selectLocationToggle)}></Position>
        </div>

        <div class="grid grid-cols-4 gap-5 w-5/6 m-auto mt-8">
          <button className=" rounded-full border-2 " onClick={() => setTag(0)}>태그1</button>
          <button className=" rounded-full border-2 " onClick={() => setTag(2)}>태그3</button>
          <button className=" rounded-full border-2 " onClick={() => setTag(1)}>태그2</button>
          <button className=" rounded-full border-2 " onClick={() => setTag(3)}>태그4</button>
        </div>

        <div className="w-5/6 m-auto my-3"> 
          <div className="text-xl">내용</div>
          <input className=" bg-white border border-slate-300 h-32 w-full rounded-lg focus:outline-none my-6"></input>
        </div>
        <button className="flex justify-center rounded-2xl border-2 bg-[#1F83EB] m-auto w-5/6 py-4 ">
          <p className="font-bold text-xl text-white">작성 완료</p>
        </button>
      </div>
    </React.Fragment>
  );
};

export default ShareInfoWrite;