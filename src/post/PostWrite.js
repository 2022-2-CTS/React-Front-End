import React, { useEffect, useState } from "react";
import axios from "axios";

import SelectLocation from "../component/SelectLocation";
import { ReactComponent as Position } from "../img/icon/position.svg";


const ShareInfoWrite = () => {
  // 선택된 위치 주소 문자열
  let [location, setLocation] = useState("");
  // 위치 선택 컴포넌트 toggle
  let [selectLocationToggle, setSelectLocationToggle] = useState(false);

  const [userId, setId] = useState();

  const [tag, setTag] = useState();
  const [date, setDate] = useState();

  const [title, setTitle] = useState();
  const [content, setContent] = useState();

  function getTitle(event) {
    setTitle(event.target.value)
  }

  function getContent(event) {
    setContent(event.target.value)
  }

  function getDate() {
    let now = new Date()
    let year = now.getFullYear()
    let month = now.getMonth()
    let date = now.getDate()
    let hours = now.getHours()
    let minuites = now.getMinutes()
    setDate(year + "-" + month + "-" + date + " " + hours + ":" + minuites)
  }

  async function postWrite() {

    await getDate()

    const Writedata = {
      userId: "tmp",
      title: title,
      date: date,
      location: location,
      tag: tag,
      content: content
    }
    await axios.post("http://localhost:3004/api/post/write", {
      Writedata
    })
      .then((response) => {
        console.log("success");
      })
      .catch(() => {
        console.log("fail");
      });
  }

  const tagColorArray = ["bg-[#000AFF]", "bg-[#00C2FF]", "bg-[#E37A39]", "bg-[#FF0000]"];
  //지금당장 , 어제갔다왔음, 오늘하더라, 내일도한다
  const tagTextArray = ["지금당장", "어제갔다왔음", "오늘도하더라", "내일도한다"]

  return (
    <React.Fragment>
      {selectLocationToggle ? <SelectLocation className="fixed left-0 top-0 right-0"
        setLocation={setLocation}
        setSelectLocationToggle={setSelectLocationToggle}></SelectLocation> : null}
      <div className="flex justify-center items-center text-lg font-medium my-3">정보작성</div>
      <div className="border-b-2 border-d9d9d9 w-11/12 m-auto" />
      <div className="w-5/6 m-auto">

        <div className="">
          <div className=" my-3 text-xl">행사제목</div>
          <input className=" bg-white border border-slate-300 rounded-lg focus:outline-none w-full h-[40px] py-2"
            value={title} onChange={getTitle} />
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
          {
            tagTextArray.map((tag, idx) => {
              return (
                <button className="flex justify-start items-baseline rounded-full border-2 p-1" onClick={() => setTag(idx)}>
                  <div className={tagColorArray[idx] + " w-3 h-3 m-2 rounded-full"}></div>
                  <span>{tag}</span>
                </button>
              )
            })
          }
        </div>

        <div className="my-3">
          <div className="text-xl">내용</div>
          <input className=" bg-white border border-slate-300 h-32 w-full rounded-lg focus:outline-none my-6"
            onChange={getContent} />
        </div>

        <button className="flex justify-center rounded-2xl border-2 bg-[#1F83EB] w-full py-4">
          <p className="font-bold text-xl text-white" onClick={postWrite}>작성 완료</p>
        </button>

      </div>
    </React.Fragment>
  );
};

export default ShareInfoWrite;