import React, { useEffect, useState } from "react";
import { useNavigate, useLocation  } from "react-router-dom";

import { ReactComponent as Board } from "../img/icon/board.svg";
import { ReactComponent as BoardActive } from "../img/icon/board_active.svg";
import { ReactComponent as Home } from "../img/icon/map.svg";
import { ReactComponent as HomeActive } from "../img/icon/map_active.svg";
import { ReactComponent as MyPage } from "../img/icon/mypage.svg";
import { ReactComponent as MyPageActive } from "../img/icon/mypage_active.svg";

const Nav = () => {
    // hook
    const navigate = useNavigate();
    const location = useLocation();

    // state
    let [buttonColor, setButtonColor] = useState([false, false, false]);

    // variable
    let pageName = ['/post', '/map', '/mypage']

    // function
    const ChangeButtonColor = pageNum => {
        // 배열 변경
        let buttonColorCopy = buttonColor;
        buttonColorCopy.map(item => { item = false; });
        buttonColorCopy[pageNum] = true;
        setButtonColor(buttonColorCopy);

        // 페이지 전환
        navigate(pageName[pageNum]);
    }

    useEffect(() => {
        // 아이콘 색상 변경
        pageName.map((item, index) => {
            if(location.pathname === item) {
                ChangeButtonColor(index);
            }
        });
    }, []);

    return (
        <React.Fragment>
            <div className="bg-white h-[60px] w-screen
            z-50 fixed bottom-0
            flex items-center justify-between">

                    <div className="ml-8"
                        onClick={ () => ChangeButtonColor(0) }>
                        { !buttonColor[0] ? <Board></Board> : <BoardActive></BoardActive> }
                    </div>

                    <div className="m-8"
                        onClick={ () => ChangeButtonColor(1) }>
                        { !buttonColor[1] ? <Home></Home> : <HomeActive></HomeActive> }
                    </div>

                    <div className="mr-8"
                        onClick={ () => ChangeButtonColor(2) }>
                        { !buttonColor[2] ? <MyPage></MyPage> : <MyPageActive></MyPageActive> }
                    </div>

            </div>
        </React.Fragment>
    );
};

export default Nav;