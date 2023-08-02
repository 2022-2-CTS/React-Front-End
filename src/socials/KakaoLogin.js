import React, { useEffect } from "react";
import axios from 'axios'

const KakaoLogin = () => {
    
    const loginCode = new URL(window.location.href).searchParams.get('code')
    
    useEffect(() => {
        if (loginCode){
            do_Login()
        }
    }, [])

    
    // localStorage.setItem("kakaoLoginJWT", response.data);
    

        
        

    const do_Login = () => {
        axios.post('http://localhost:3004/api/login/kakaoLogin/kakaoLogin',{
            code : loginCode
        })
        .then((req) => {
            console.log(req.data.token);
            if (req.data.data == "로그인 성공!!"){
                console.log("여기 들어왔어?");
                localStorage.setItem("kakaoLoginJWT", req.data.token)
                localStorage.setItem("id", req.data.kakaoNickname)
            }else{
                window.location.href = '/'
                console.log("로그인 실패")
            }
        })
        .catch(err => console.log(err))
    }

    return(
        <div>
            { loginCode } 
        </div>
    );
};

export default KakaoLogin;