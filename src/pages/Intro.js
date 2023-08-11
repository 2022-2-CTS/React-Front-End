import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ReactComponent as Logo } from "../img/icon/logo.svg";

const Intro = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timeout = setTimeout(() => {
            navigate('/signin');
        }, 3500);

        // return () => {
        //     clearTimeout(timeout)
        // }
    })

    return (
        <React.Fragment>
            <div className="relative h-screen flex items-center justify-center">
                {/* wave (배경) */}
                <div className="bg-wave w-full h-full bg-cover flex justify-center items-center">
                    {/* logo (갈매기) */}
                    <div className="w-1/2">
                        <Logo className="m-auto w-2/4 h-full mb-2" />
                        <div className="logo-font text-center text-2xl
                        tracking-[.5em] -mr-3
                        color-[#3F4A67]">
                            갈매기
                        </div>
                        <div className="bg-white px-1
                        border-0 rounded-full
                        logo-font text-center font-bold
                        my-2">
                            부산광역시 문화·예술 지도
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Intro;