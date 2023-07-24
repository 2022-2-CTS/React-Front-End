import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Map from "./pages/Map";
import MyPage from "./pages/MyPage";

import ShareInfo from "./info/ShareInfo";
import KakaoLogin from "./socials/KakaoLogin";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home/shareinfo" element={<ShareInfo />} />
        <Route path="/kakao-login" element={<KakaoLogin />} />
        <Route path="/map" element={<Map />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;