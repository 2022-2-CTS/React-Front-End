import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Map from "./pages/Map";
import MyPage from "./pages/MyPage";
import Detail from "./pages/Detail";

import Post from "./post/Post";
import PostWrite from "./post/PostWrite";

import KakaoLogin from "./socials/KakaoLogin";
import NaverLogin from "./socials/NaverLogin";
import GoogleLogin from "./socials/Google"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        
        <Route path="/kakao-login" element={<KakaoLogin />} />
        <Route path="/naver-login" element={<NaverLogin />} />
        <Route path="/google-login" element={<GoogleLogin />} />

        <Route path="/post" element={<Post />} />
        <Route path="/post/write" element={<PostWrite/>} />
        
        <Route path="/map" element={<Map />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/detail" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;