import React, {useEffect} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const NaverLogin = () => {

    const navigate = useNavigate()

    const loginCode = new URL(window.location.href).searchParams.get('code')
    const stateCode = new URL(window.location.href).searchParams.get('state')
    
    useEffect(() => {
        if (loginCode){
            do_Login()
        }
    },[])

    const do_Login = () => {
        axios.post("http://localhost:3004/api/login/naverLogin/naverLogin_",{
            code : loginCode,
            state : stateCode,
        }).then((req) => {
            console.log(req.data);
            if (req.data.data == "로그인 성공!!"){
                localStorage.setItem("naverLoginJWT", req.data.token)
                localStorage.setItem("id", req.data.naverNickname)
                localStorage.setItem("registerType", "NAVER")
                navigate('/loading')
            }else{
                navigate('/signin')
                console.log("로그인 실패")
            }
        }).catch((err) => {
            console.log(err)
        })
    }
}

export default NaverLogin;