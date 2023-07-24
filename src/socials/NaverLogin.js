import React, {useEffect} from "react";
import axios from 'axios';

const NaverLogin = () => {

    const loginCode = new URL(window.location.href).searchParams.get('code')
    const stateCode = new URL(window.location.href).searchParams.get('state')
    
    useEffect(() => {
        if (loginCode){
            do_Login()
        }
    },[])

    const do_Login = () => {
        axios.post("http://localhost:3004/api/index/naverLogin",{
            code : loginCode,
            state : stateCode,
        }).then((req) => {
            console.log(req.data);
            if (req.data == "로그인 성공!!"){
                // window.location.href = '/'
            }else{
                window.location.href = '/signin'
                console.log("로그인 실패")
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    return(
        <div>
            { loginCode }
        </div>
    )

}

export default NaverLogin;