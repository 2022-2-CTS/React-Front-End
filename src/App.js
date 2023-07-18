import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import "./index.css";

import Home from './pages/Home.js'
import SignIn from './pages/SignIn.js'
import SignUp from './pages/SignUp.js'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;