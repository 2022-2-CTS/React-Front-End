import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "./index.css";

import Home from './pages/Home.js';
import SignIn from './pages/SignIn.js';
import SignUp from './pages/SignUp.js';
import ShareInfo from './info/ShareInfo.js';
import KakaoLogin from './socials/KakaoLogin.js';
import Map from './pages/Map.js';

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
      </Routes>
    </BrowserRouter>
  );
};

export default App;