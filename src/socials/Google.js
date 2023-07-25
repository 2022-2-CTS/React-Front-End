import React from "react";
import axios from 'axios';

import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

const Google = () => {
    
    const client_id = '432961785509-qqi0ut13397irei6m61up42os7bc59t3.apps.googleusercontent.com'



    return (
      <>
        <GoogleOAuthProvider clientId={client_id}>
          <GoogleLogin
            onSuccess={(res) => {
              console.log(res);
              axios.post("http://localhost:3004/api/index/googleLogin",{
                credentialCode : res.credential,
                clientIdCode : client_id,
              }).then((req) => {
                console.log(req.data)
                if (req.data == "로그인 성공!!"){
                  window.location.href = '/main'
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
      </>
    )
}

export default Google