import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ReactComponent as Logo } from "../img/icon/logo.svg";
import CompleteButton from "../component/CompleteButton";

const RegisterNickname = () => {

    const navigate = useNavigate();

    const [nickname, setNickname] = useState('')

    function changeNicknameHandler(event) {
        setNickname(event.target.value)
    }

    function registerNicknameButton() {
        var registerType = localStorage.getItem("registerType")
        var userId = localStorage.getItem("id")

        console.log(userId)

        axios.post('http://localhost:3004/api/mydata/nickname/setOwnNickname', {
            registerType: registerType,
            userId: userId,
            nickname: nickname
        }).then((req) => {
            console.log(req.data)
            navigate('/loading')
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <React.Fragment>
            <div className="my-32 px-4">
                <div className="animated-fade flex flex-col justify-center items-center">
                    <Logo className="w-20 h-full" />
                    <div className="text-center color-[#4B4B4B] font-light text-lg my-3">
                        사용할 닉네임을 <br />
                        입력해주세요.
                    </div>

                    <input className="border border-[#D9D9D9] rounded-2xl
                p-3 px-5"
                        onChange={changeNicknameHandler}></input>

                    <div className="text-center color-[#4B4B4B] font-light text-sm my-3">
                        (최소 2자, 최대 8자)
                    </div>
                </div>

                <CompleteButton content="완료"
                    _class="absolute bottom-0 mb-3 w-11/12"
                    _event={registerNicknameButton} />
            </div>
        </React.Fragment>
    )
}

export default RegisterNickname;