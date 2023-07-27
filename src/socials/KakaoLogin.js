import React, { useEffect } from "react";
import axios from 'axios'

const KakaoLogin = () => {
    
    const loginCode = new URL(window.location.href).searchParams.get('code')
    
    useEffect(() => {
        if (loginCode){
            do_Login()
        }
    }, [])

    async function fetchKakaoLoginToken() {
        try {
            const response = await axios.get('http://localhost:3004/api/index/kakaoLoginToken', {});
            console.log(response);
            localStorage.setItem("kakaoLoginToken", response.data);
            window.location.href = '/map';
        } catch (err) {
            console.log(err);
        }
    }

    const do_Login = () => {
        axios.post('http://localhost:3004/api/index/kakaoLogin',{
            code : loginCode
        })
        .then((req) => {
            console.log(req.data);
            if (req.data == "로그인 성공!!"){
                console.log("여기 들어왔어?");
                fetchKakaoLoginToken();
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