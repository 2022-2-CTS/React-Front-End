import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import "./index.css";

import Home from './pages/Home.js'
import SignIn from './pages/SignIn.js'
import SignUp from './pages/SignUp.js'
import ShareInfo from './info/ShareInfo';
import KakaoLogin from './socials/KakaoLogin'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home/shareinfo" element={<ShareInfo />} />
        <Route path="/kakao-login" element={<KakaoLogin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;