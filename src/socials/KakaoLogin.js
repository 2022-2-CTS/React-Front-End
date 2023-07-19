import React, { useEffect } from "react";
import axios from 'axios'

const KakaoLogin = () => {
    const loginCode = new URL(window.location.href).searchParams.get('code')
    
    useEffect(() => {
        response();
    }, [])

    const response = () => {
        axios.post('http://localhost:8080/api',{
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