import React from "react";
import { ReactComponent as Heart } from "../img/icon/heart_active.svg"

import Nav from "../component/BottomNav";

const MyPage = () => {

    var nickName = " 매운알파카 ";

    //const keep = ["바보의 세계", "검은고양이", "청부살인 협동조합"]
    const keep = []

    return (
        <React.Fragment>
            <div className="w-full m-auto animated-fade bg-white
            h-screen">
                <div className="flex justify-center items-center 
                text-lg font-medium py-3">
                    내정보
                </div>
                <div className="border-b-2 border-d9d9d9"></div>
                <div className="m-5 font-bold">
                    <div className="text-xl">안녕하세요,</div>
                    <div className="text-3xl my-2 ">{nickName}님!</div>
                </div>
                <div className="border-b-2 border-d9d9d9 mt-8"></div>
                <div className="text-xl m-3 text-center">찜목록</div>
                {
                    keep.length == 0
                        ?
                        <div>
                            <div className="justify-center items-center rounded-xl w-11/12 bg-slate-100 m-auto text-l font-bold py-10">
                                <Heart className="m-auto mb-5"/>
                                <div className="flex justify-center m-auto">찜한 행사가 없어요.</div>
                                <div className="flex justify-center m-auto">가고 싶은 행사를 찜목록에 추가해 보세요.</div>
                            </div>
                        </div>
                        :
                        keep.map((item, index) => {

                            return (
                                <div key={index}>
                                    <div className="flex justify-between rounded-xl w-11/12 bg-slate-100 items-baseline m-auto my-5">
                                        <div class="text-xl font-bold p-2 px-6 my-4">{item}</div>
                                        <Heart className="mr-5" />
                                    </div>
                                </div>
                            )

                        })
                }
            </div>
            <Nav />
        </React.Fragment>
    );
};

export default MyPage;