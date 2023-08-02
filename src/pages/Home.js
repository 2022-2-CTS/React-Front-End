import React, { useEffect } from "react";

const Login = () => {

  useEffect(() => {
    const timeout = setTimeout(() => {
      window.location.href = "/signin"
    }, 3000)

    return() => {
      clearTimeout(timeout)
    }
  })

  return (
    <div className="flex justify-center items-center text-centser min-h-screen">
      <div className="">
        <img src="images/seagull1.gif"></img>
        {/* <div className="pb-8 font-bold text-2xl">부산시 문화예술 지도</div> */}
      </div>
    </div>
  );
};

export default Login;


//클라이언트 아이디 432961785509-qqi0ut13397irei6m61up42os7bc59t3.apps.googleusercontent.com
//클라이언트 보안 비밀번호 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
