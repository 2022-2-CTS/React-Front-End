import React from "react";

const Login = () => {

  function local(){
    window.location.href="./signin"
  }

  return (
    <div class="flex justify-center items-center text-center min-h-screen">
      <div class="">
        <div class="pb-8 font-bold text-2xl">부산시 문화예술 지도</div>
        <div class="grid grid-rows-4 gap-3">
          <div onClick={local}>로컬 로그인</div>
          <div>카카오 로그인</div>
          <div>네이버 로그인</div>
        </div>
      </div>
    </div>
  );
};

export default Login;