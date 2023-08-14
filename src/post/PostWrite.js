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


  const categoryColorArray = ["bg-[#000AFF]", "bg-[#00C2FF]", "bg-[#E37A39]", "bg-[#FF0000]"];
  //지금당장 , 어제갔다왔음, 오늘하더라, 내일도한다

  return (
    <React.Fragment>
      {selectLocationToggle ? <SelectLocation className="fixed left-0 top-0 right-0"
        setLocation={setLocation}
        setSelectLocationToggle={setSelectLocationToggle}></SelectLocation> : null}
      <div className="flex justify-center items-center text-lg font-medium my-3">정보작성</div>
      <div className="border-b-2 border-d9d9d9 w-11/12 m-auto"/>
      <div className="w-5/6 m-auto">

        <div className="">
          <div className=" my-3 text-xl">행사제목</div>
          <input className=" bg-white border border-slate-300 rounded-lg focus:outline-none w-full h-[40px] py-2" />
        </div>

        <div className=" my-3 text-xl">위치</div>

        <div className="flex">
          <div className="bg-white border border-slate-300 rounded-lg w-full py-2 h-[40px]">
            {location}
          </div>
          <Position className="drop-shadow-position w-12 ml-2 mt-0.5"
            onClick={() => setSelectLocationToggle(!selectLocationToggle)} />
        </div>

        <div class="grid grid-cols-2 gap-5 m-auto mt-8">
          <button className="flex justify-start items-baseline rounded-full border-2 p-1" onClick={() => setTag(0)}>
            <div className={categoryColorArray[0] + " w-3 h-3 m-2 rounded-full"}></div>
            <span>지금당장</span>
          </button>
          <button className="flex justify-start items-baseline rounded-full border-2 p-1" onClick={() => setTag(1)}>
            <div className={categoryColorArray[1] + " w-3 h-3 m-2 rounded-full"}></div>
            <span>어제 갔다왔음</span>
          </button>
          <button className="flex justify-start items-baseline rounded-full border-2 p-1" onClick={() => setTag(2)}>
            <div className={categoryColorArray[2] + " w-3 h-3 m-2 rounded-full"}></div>
            <span>오늘 하더라</span>
          </button>
          <button className="flex justify-start items-baseline rounded-full border-2 p-1" onClick={() => setTag(3)}>
            <div className={categoryColorArray[3] + " w-3 h-3 m-2 rounded-full"}></div>
            <span>내일도 한대</span>
          </button>
        </div>

        <div className="my-3">
          <div className="text-xl">내용</div>
          <input className=" bg-white border border-slate-300 h-32 w-full rounded-lg focus:outline-none my-6"></input>
        </div>

        <button className="flex justify-center rounded-2xl border-2 bg-[#1F83EB] w-full py-4">
          <p className="font-bold text-xl text-white">작성 완료</p>
        </button>

      </div>
    </React.Fragment>
  );
};

export default ShareInfoWrite;