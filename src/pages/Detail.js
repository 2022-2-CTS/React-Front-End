import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import '../App.css';

import { ReactComponent as Previous } from "../img/icon/back.svg";
import { ReactComponent as Heart } from "../img/icon/heart.svg";
import { ReactComponent as HeartActive } from "../img/icon/heart_active.svg";
import { ReactComponent as Location } from "../img/icon/location.svg";

const Detail = () => {
    let [heart, setHeart] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    let eventInfo = { ...location.state }

    return (
        <React.Fragment>
            <div className="animated-fade h-full bg-white drop-shadow-bg">
                {/* Header (pre, head, heart) */}
                <div className="flex justify-between items-center p-5">
                    <Previous onClick={() => navigate('/map')}
                    />
                    <span className="text-lg font-medium">
                        상세 정보
                    </span>
                    {heart ?
                        <HeartActive className="animated-heart" onClick={() => setHeart(!heart)} />
                        : <Heart onClick={() => setHeart(!heart)} />}
                </div>

                <hr className="m-2 mb-6" />

                {/* content */}
                <div className="flex flex-col m-auto justify-center w-5/6">
                    {/* poster */}
                    {/* <img alt="img"
                    src="https://busandabom.net/images/contents/play_img_5354.jpg" /> */}
                    <img alt="img"
                        src={eventInfo.src} />

                    {/* event title */}
                    <div className="text-2xl my-2 font-bold">
                        <span>
                            {eventInfo.title}
                        </span>
                    </div>

                    {/* event place */}
                    <div className="flex items-start">
                        <Location className="m-1"
                        />
                        <span className="ml-1 font-semibold">
                            {eventInfo.location}
                        </span>
                    </div>

                    {/* event content */}
                    <div className="my-2 mt-4">
                        <div className="mb-1 text-stone-700 font-medium">
                            📌 기간
                        </div>
                        <div className="font-bold">
                            {eventInfo.duration}
                        </div>
                    </div>

                    <div className="my-1">
                        <div className="mb-1 text-stone-700 font-medium">
                            📌 시간
                        </div>
                        <div className="font-bold">
                            {eventInfo.time}
                        </div>
                    </div>

                    <div className="my-1 mb-6">
                        <div className="mb-1 text-stone-700 font-medium">
                            📌 가격
                        </div>
                        <div className="font-bold">
                            {eventInfo.price}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Detail;