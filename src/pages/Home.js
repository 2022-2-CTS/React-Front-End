import React from "react";
import {GoogleLogin, GoogleOAuthProvider} from '@react-oauth/google';

const Login = () => {

  function local(){
    window.location.href="./signin"
  }
  // http://192.168.45.119:3000/kakao-login?code=ld55lY2TeJ3d0MEt1urrpqZM8C7hTAN7qVUSjAuUxCux-MeebnfrnLNr3Bza6kHmhZwoowoqJU8AAAGJbsl0VQ
  // https://kauth.kakao.com/oauth/authorize?client_id=e6c2fe139670b147caaf750b558a4750&redirect_uri=http://192.168.45.119:3000/kakao-login&response_type=code
  const Rest_api_key = 'e6c2fe139670b147caaf750b558a4750'
  const redirect_uri = 'http://localhost:3000/kakao-login'
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
  function loginForKakao(){
    window.location.href = kakaoURL
  }

  const code = new URL(window.location.href).searchParams.get("code");
  console.log(code)


  const naver_client_id = 'o9JmjRrP1GmmANohGaH1'
  const callback_uri = 'http://localhost:3000/naver-login'
  const naverURL = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + naver_client_id + '&redirect_uri=' + encodeURI(callback_uri) + '&state=' + Math.random().toString(36).substr(3, 14);

  function loginForNaver(){
    window.location.href = naverURL
  }

  function loginForGoogle(){
    window.location.href = './google-login'
  }

  return (
    <div class="flex justify-center items-center text-centser min-h-screen">
      <div class="">
        <div class="pb-8 font-bold text-2xl">부산시 문화예술 지도</div>
        <div class="grid grid-rows-4 gap-3">
          <button onClick={local} class="mx-2 rounded border-solid border-2 border-indigo-500 bg-indigo-500">
            <p class="text-white font-bold">문화</p>
          </button>
          <img onClick={loginForKakao} class="px-2 w-full" src="images/kakao_login_medium_narrow.png"></img>
          <img onClick={loginForNaver} class="px-2 h-11 w-full" src="images/btnG_아이콘원형.png"></img>
          <button onClick={loginForGoogle} class="mx-2 rounded border-solid border-2 border-indigo-500 bg-indigo-500">
            <p class="text-white font-bold">구글</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;


//클라이언트 아이디 432961785509-qqi0ut13397irei6m61up42os7bc59t3.apps.googleusercontent.com
//클라이언트 보안 비밀번호 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
