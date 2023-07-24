import React from "react";

const ShareInfo = () => {
  return (
    <div>
      <div className="flex justify-center items-center text-xl">해운대구</div>
      <div className="border-b-2 border-d9d9d9"></div>
      <div>
        <div>
          <div className="inline-flex">행사이름</div>
          <div className="inline-block">태그</div>
          <div className="inline-block">작성일</div>
        </div>
        <div className="">
          지도 이미지
        </div>
        <div>
          글내용
        </div>
      </div>
    </div>
  );
};

export default ShareInfo;