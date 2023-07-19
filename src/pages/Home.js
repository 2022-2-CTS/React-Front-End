import React from "react";

const Login = () => {

  function local(){
    window.location.href="./signin"
  }
  // http://192.168.45.119:3000/kakao-login?code=ld55lY2TeJ3d0MEt1urrpqZM8C7hTAN7qVUSjAuUxCux-MeebnfrnLNr3Bza6kHmhZwoowoqJU8AAAGJbsl0VQ
  // https://kauth.kakao.com/oauth/authorize?client_id=e6c2fe139670b147caaf750b558a4750&redirect_uri=http://192.168.45.119:3000/kakao-login&response_type=code
  const Rest_api_key = 'e6c2fe139670b147caaf750b558a4750'
  const redirect_uri = 'http://192.168.45.119:3000/kakao-login'
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
  function loginForKakao(){
    window.location.href = kakaoURL
  }

  const code = new URL(window.location.href).searchParams.get("code");
  console.log(code)

  function loginForNaver(){
    window.location.href = '/'
  }

  return (
    <div class="flex justify-center items-center text-center min-h-screen">
      <div class="">
        <div class="pb-8 font-bold text-2xl">부산시 문화예술 지도</div>
        <div class="grid grid-rows-4 gap-3">
          <button onClick={local} class="mx-2 rounded border-solid border-2 border-indigo-500 bg-indigo-500">
            <p class="text-white font-bold">문화</p>
          </button>
          <img onClick={loginForKakao} class="px-2" src="images/kakao_login_medium_narrow.png"></img>
          <img onClick={loginForNaver} class="px-2 h-11 w-full" src="images/btnG_완성형.png"></img>
        </div>
      </div>
    </div>
  );
};

export default Login;