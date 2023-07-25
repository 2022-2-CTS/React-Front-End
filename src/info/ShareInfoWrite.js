import React from "react";

const ShareInfoWrite = () => {
  return (
    <div>
      <div className="flex justify-center items-center text-xl">정보작성</div>
      <div className="border-b-2 border-d9d9d9"></div>
      <div>
        <div>
          <div>행사제목</div>
          <div>폼</div>
        </div>
        <div>
          <div className="inline-flex">위치</div>
          <div className="inline-block">아이콘</div>
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
        <button>
          작성완료버튼
        </button>
      </div>
    </div>
  );
};

export default ShareInfoWrite;