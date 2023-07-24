import React, { useEffect } from "react";
import axios from 'axios'

const KakaoLogin = () => {
    
    const loginCode = new URL(window.location.href).searchParams.get('code')

    // var details = {
    //     "grant_type" : "authorization_code",
    //     "client_id" : 'e6c2fe139670b147caaf750b558a4750', //REST API KEY
    //     "redirect_uri" : 'http://localhost:3000/kakao-login',
    //     "code" : loginCode
    // }

    // var formBody = []

    // for (var property in details){
    //     var encodedKey = encodeURIComponent(property)
    //     var encodedValue = encodeURIComponent(details[property])
    //     formBody.push(encodedKey + "=" + encodedValue);
    // }
    // formBody = formBody.join("&")

    // console.log(formBody)

    
    useEffect(() => {
        if (loginCode){
            response()
        }
    }, [])

    // const getKakaoTokenHandler = () => {

    //     axios({
    //         method : 'post',
    //         url : 'https://kauth.kakao.com/oauth/token/',
    //         headers : {
    //             'Content-type' : 'application/x-www-form-urlencoded;charset=utf-8'
    //         },
    //         data : formBody
    //     })
    //         .then(response => {
    //             const jwtToken = response.data.jwt;
    //             console.log("JWT발급 성공", jwtToken)
    //         })
    //         .catch(error => {
    //             console.log('JWT토큰 발급에 실패했습니다.', error)
    //     }) 
    // }

    const response = () => {
        axios.post('http://localhost:8080/api/index/test',{
            code : loginCode
        })
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
    }

    return(
        <div>
            { loginCode }
        </div>
    );
};

export default KakaoLogin;