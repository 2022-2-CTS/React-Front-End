import React from "react";
import axios from 'axios';

import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

const Google = () => {
    
    const client_id = '432961785509-qqi0ut13397irei6m61up42os7bc59t3.apps.googleusercontent.com'



    return (
      <div className="flex justify-center items-center text-center min-h-screen">
        <div>
        <div className="pb-8 font-bold text-2xl">부산시 문화예술 지도</div>
        <div className="grid grid-rows-4 gap-3 mx-2">
          <GoogleOAuthProvider clientId={client_id}>
            <GoogleLogin
              onSuccess={(res) => {
                console.log(res);
                axios.post("http://localhost:3004/api/login/googleLogin/googleLogin_",{
                  credentialCode : res.credential,
                  clientIdCode : client_id,
                }).then((req) => {
                  console.log(req.data)
                  if (req.data == "로그인 성공!!"){
                    window.location.href = '/map'
                  }else{
                    window.location.href = '/'
                  }
                }).catch((err) => {
                  console.log(err)
                })
              }}
              onFailure={(err) => {
                console.log(err);
              }}
              />
            </GoogleOAuthProvider>
          </div>
        </div>
      </div>
    )
}

export default Google