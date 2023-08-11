import axios from "axios";
import React, { useState } from "react";

const RegisterNickname = () => {

    const [nickname, setNickname] = useState('')

    function changeNicknameHandler(event){
        setNickname(event.target.value)
    }

    function registerNicknameButton(){
        var registerType = localStorage.getItem("registerType")
        var userId = localStorage.getItem("id")

        console.log(userId)

        axios.post('http://localhost:3004/api/mydata/nickname/setOwnNickname', {
            registerType : registerType,
            userId : userId,
            nickname : nickname
        }).then((req) => {
            console.log(req.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    return(
        <div>
            <input className="border-4" onChange={changeNicknameHandler}></input>
            <button className="border-4" onClick={registerNicknameButton}>확인</button>
        </div>
    )
}

export default RegisterNickname;