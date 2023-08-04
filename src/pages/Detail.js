import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

import { ReactComponent as Previous } from "../img/icon/back.svg";
import { ReactComponent as Heart } from "../img/icon/heart.svg";
import { ReactComponent as HeartActive } from "../img/icon/heart_active.svg";
import { ReactComponent as Location } from "../img/icon/location.svg";

// 스크립트로 kakao map api를 심어서 가져오면, window 전역 객체에 들어가게 된다.
// 함수형 컴포넌트에서는 바로 인식하지 못하므로, kakao 객체를 인지시키고자 상단에 선언해둔다.
const { kakao } = window; // window 내 kakao 객체를 빼와서 사용

const Detail = () => {
    let [heart, setHeart] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    let eventInfo = { ...location.state }

    return (
        <React.Fragment>
            {/* Header (pre, head, heart) */}
            <div className="flex justify-between items-center m-5">
                <Previous onClick={ () => navigate('/map') }
                 />
                <span className="text-lg font-medium">
                    상세 정보
                </span>
                { heart ? <HeartActive onClick={ () => setHeart(!heart) } /> : <Heart onClick={ () => setHeart(!heart) } /> }
            </div>

            <hr className="m-2 mb-6"/>

            {/* content */}
            <div className="flex flex-col m-auto justify-center w-5/6">
                {/* poster */}
                <img className=""
                src="https://busandabom.net/images/contents/play_img_5354.jpg"/>

                {/* event title */}
                <div className="text-2xl my-2 font-bold">
                    <span>
                        { eventInfo.title }
                    </span>
                </div>

                {/* event place */}
                <div className="flex items-start">
                    <Location className="m-1"
                    />
                    <span className="ml-1 font-semibold">
                        { eventInfo.location }
                    </span>
                </div>

                {/* event content */}
                <div className="my-2 mt-4">
                    <div className="mb-1 text-stone-700 font-medium">
                        📌 기간
                    </div>
                    <div className="font-bold">
                        { eventInfo.duration }
                    </div>
                </div>
                
                <div className="my-1">
                    <div className="mb-1 text-stone-700 font-medium">
                        📌 시간
                    </div>
                    <div className="font-bold">
                        { eventInfo.time }
                    </div>
                </div>
                
                <div className="my-1 mb-6">
                    <div className="mb-1 text-stone-700 font-medium">
                        📌 가격
                    </div>
                    <div className="font-bold">
                        { eventInfo.price }
                    </div>
                </div>
            </div>

            {/*  */}
        </React.Fragment>
    );
};

export default Detail;