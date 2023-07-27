import axios from "axios";
import React, { useEffect, useState } from "react";
import crypto from 'crypto-js'

import { ReactComponent as Visibility } from "../img/icon/visibility.svg";
import { ReactComponent as Visibility_off } from "../img/icon/visibility_off.svg";

const SignIn = () => {

  const [id, setId] = useState('')
  const [pw, setPw] = useState('')

  const [pwType, setpwType] = useState({
    type: "password",
    visible: false,
  });
  
  const validToken = localStorage.getItem("userToken")
  const kakaoAccessToken = localStorage.getItem('kakaoLoginToken')

  useEffect(() => {
    console.log(validToken)
    if (validToken != null){
      axios.post('http://localhost:3004/api/index/alreadyLogined',{
        validToken
      }).then((res) => {
        console.log(res.data)
        if (localStorage.getItem("id") == res.data.id){
          console.log("일치합니다.")
          window.location.href='/map'
        }
      }).catch((err) => {
        console.log(err)
      })
    }
    if(kakaoAccessToken != null){
      axios.get(
        "https://kapi.kakao.com/v1/user/access_token_info",
        {
          headers: {
            Authorization: `Bearer ${kakaoAccessToken}`, // Bearer 토큰 포맷을 올바르게 설정합니다.
          },
        }
      )
        .then((response) => {
          console.log(response.data); // 서버 응답의 데이터를 출력합니다.
          if(response.data.api_type != "TokenInvalidError"){
            window.location.href = '/map';
          }
        })
        .catch((err) => {
          console.log(err); // 오류가 발생한 경우 오류를 출력합니다.
        });
    }

  }, [])

  function handlePasswordType(e){
    setpwType(() => {
    // 만약 현재 pwType.visible이 false 라면
      if (!pwType.visible) {
        return { type: "text", visible: true };

	//현재 pwType.visible이 true 라면
      } else {
        return { type: "password", visible: false };
      }
    });
  };

  function saveUserId(event){
    setId(event.target.value);
  }

  function saveUserPw(event){
    setPw(event.target.value);
  }

  function loginForApp(){
    console.log("앱 로그인")
    console.log(id)
    console.log(pw)
    const ciphertext = crypto.AES.encrypt(pw, 'culture').toString();
    console.log(ciphertext)
    axios.post("http://localhost:3004/api/index/login",{
      sendId : id,
      sendPw : ciphertext,
    }).then((req) => {
      console.log(req.data)
      if (req.data != "fail"){
        window.location.href = '/map'
        localStorage.setItem("userToken", req.data.token)
        localStorage.setItem("id", id)
      }
    }).catch((err) => {
      console.log(err)
    })
  }
  
  const Rest_api_key = 'e6c2fe139670b147caaf750b558a4750'
  const redirect_uri = 'http://localhost:3000/kakao-login'
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
  function loginForKakao(){
    window.location.href = kakaoURL
  }

  const code = new URL(window.location.href).searchParams.get("code");
  // console.log(code)


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
    <div className="flex justify-center items-center text-center min-h-screen">
      <div className="">
        <div className="pb-8 font-bold text-2xl">부산시 문화예술 지도</div>
        <div className="grid grid-rows-4 gap-3">
          <div>
            <input type="text" name="id" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-lg sm:text-sm focus:ring-1 placeholder:text-slate-400 placeholder:text-sm" placeholder="아이디"
              onChange={saveUserId}
            />
          </div>
          <div className="relative">
            <input type={pwType.type} name="password" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-lg sm:text-sm focus:ring-1 placeholder:text-slate-400 placeholder:text-sm" placeholder="비밀번호" 
              onChange={saveUserPw}
            />
            <span className="absolute inset-y-0 right-0 my-4 mx-3 flex items-center" onClick={handlePasswordType}>
              {pwType.visible ? <Visibility /> : <Visibility_off />}
            </span>
          </div>
          <button className="rounded-lg border-solid border-2 border-indigo-500 bg-indigo-500" onClick={loginForApp}>
            <p className="font-bold text-white">로그인</p>
          </button>
          <div className="font-light text-black text-sm">
              <span className="text-slate-800">계정이 없으신가요? </span>
              <a href="./signup" className="underline text-indigo-500 font-bold underline-offset-2">회원가입</a>
          </div>
          <div className="grid grid-cols-3 gap-4 px-10">
            <img onClick={loginForKakao} className="w-10" src="images/kakao_login_circle.png"></img>
            <img onClick={loginForNaver} className="w-10" src="images/btnG_아이콘원형.png"></img>
            <img onClick={loginForGoogle} className="w-10"src="images/pngwing.com.png"></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;