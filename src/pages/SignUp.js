import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import crypto from 'crypto-js';

import CompleteButton from "../component/CompleteButton";

const Login = () => {

    const [id, setId] = useState('')
    const [saveId, setSaveId] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [idValidCheck, setIdValidCheck] = useState(false)
    const [passwordMatch, setPasswordMatch] = useState(false)
    const [idButtonHandler, setIdButtonHandler] = useState('')

    const [finish, setFinish] = useState('false')

    const blankCheck = passwordConfirm == ''

    // const finish = idValidCheck == passwordMatch;

    useEffect(() => {

        setFinish(false)

        if (password == passwordConfirm) {
            setPasswordMatch(true);
            console.log(password)
            console.log(passwordConfirm)
            console.log(passwordMatch)
        } else {
            setPasswordMatch(false);
            console.log(password)
            console.log(passwordConfirm)
            console.log(passwordMatch)
            setFinish(false)
        }

        if (id == '') {
            setIdButtonHandler('아이디 중복 확인을 눌러주세요')
        }
        if (password == '' && idValidCheck == false) {
            setFinish(false)
        } else if (idValidCheck == true && passwordMatch == true && password != '') {
            setFinish(true)
        } else if (password == '' && idValidCheck == true || passwordConfirm == '') {
            setFinish(false)
        }
    })

    function saveUserId(event) {
        setId(event.target.value)
        if (saveId != event.target.value) {
            setIdValidCheck(false)
            setIdButtonHandler('아이디 중복 확인을 눌러주세요')
            console.log(idValidCheck)
        }
    }

    function saveUserPw(event) {
        setPassword(event.target.value)
    }

    function saveUserConfirmPw(event) {
        setPasswordConfirm(event.target.value)
    }

    function checkValidId() {
        console.log(id)
        console.log(saveId)
        axios.post('http://localhost:3004/api/login/appLogin/validCheck', {
            sendValidId: id,
        }).then((req) => {
            console.log(req.data)
            if (req.data == 'success') {
                setIdValidCheck(true)
                console.log("오!!")
                if (id != '') {
                    setIdButtonHandler('사용할 수 있는 아이디 입니다.')
                    setSaveId(id)
                } else {
                    setIdButtonHandler('아이디 중복 확인을 눌러주세요')
                }
            } else {
                setIdValidCheck(false)
                console.log("오잉?")
                if (id != '') {
                    setIdButtonHandler('사용할 수 없는 아이디 입니다.')
                } else {
                    setIdButtonHandler('아이디 중복 확인을 눌러주세요')
                }
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    function complete() {
        if (passwordMatch) {
            console.log(id)
            console.log(password)
            const ciphertextPw = crypto.AES.encrypt(password, 'culture').toString();
            axios.post("http://localhost:3004/api/login/appLogin/signup", {
                sendId: id,
                sendPw: ciphertextPw,
            }).then((req) => {
                console.log("왜 안돼!!")
                console.log(req.data)
                if (req.data == "가입완료") {
                    window.location.href = '/signin'
                }
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    return (
        <div className="mx-6 my-24 animated-fade">
            <div className="grid grid-cols-4 gap-3">
                <div className="font-bold text-2xl col-start-1 col-span-3">회원가입</div>
                <div className="col-span-3">
                    <label className="block">
                        <span className="block text-sm font-medium text-slate-700">
                            아이디
                        </span>
                        <input type="text" name="id" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-xl sm:text-sm focus:ring-1"
                            onChange={saveUserId}
                        />
                    </label>
                </div>
                <div className="mt-6">
                    <button className="rounded-xl h-full border-0 bg-main py-2 w-full"
                        onClick={checkValidId}
                    >
                        <p className="text-white text-sm font-bold">
                            확인
                        </p>
                    </button>
                </div>
                <div className="col-span-3">
                    <p className="font-light text-sm font-bold text-green-600">{idButtonHandler}</p>
                </div>
                <div className="col-span-4 mt-4">
                    <label className="block">
                        <span className="block text-sm font-medium text-slate-700">
                            비밀번호
                        </span>
                        <input type="password" name="password" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-xl sm:text-sm focus:ring-1"
                            onChange={saveUserPw}
                        />
                    </label>
                </div>
                <div className="col-span-4">
                    <label className="block">
                        <span className="block text-sm font-medium text-slate-700">
                            비밀번호 확인
                        </span>
                        <input type="password" name="password" className="mt-1 px-3 py-2 pr-1 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-xl sm:text-sm focus:ring-1"
                            onChange={saveUserConfirmPw}
                        />
                    </label>
                </div>
                {
                    blankCheck
                        ?
                        <div className="col-span-3" />
                        :
                        <div className="col-span-3">
                            {passwordMatch ? <p className="font-light text-sm font-bold text-green-600">
                                비밀번호가 일치합니다.
                            </p> :
                                <p className="font-light text-sm font-bold text-rose-600">
                                    비밀번호를 다시 확인해 주세요.
                                </p>}
                        </div>
                }
                <div className="col-span-4 mt-4">
                    {
                        finish
                            ?
                            <CompleteButton content="가입 완료"
                                onClick={complete} />
                            :
                            <CompleteButton content="가입 완료"
                                _class="brightness-75" />
                    }
                </div>
            </div>
        </div>
    );
};

export default Login;