import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Nav = () => {
    // hook
    const navigate = useNavigate();

    // state
    let [buttonColor, setButtonColor] = useState([false, false, false]);

    // variable
    let pageName = ['/home/shareinfo', '/map', '/mypage']

    // function
    const ChangeButtonColor = pageNum => {
        // 배열 변경
        let buttonColorCopy = buttonColor;
        buttonColorCopy.map(item => { item = false; });
        buttonColorCopy[pageNum] = true;
        setButtonColor(buttonColorCopy);

        // 페이지 전환
        navigate(pageName[pageNum]);

        // 아이콘 색상 변경
    }

    return (
        <React.Fragment>
            <div className="bg-white h-[60px] w-screen
            z-50 fixed bottom-0
            flex items-center justify-between">

                    <div className="m-8"
                        onClick={ () => ChangeButtonColor(0) }>
                        board
                    </div>

                    <div className="m-8"
                        onClick={ () => ChangeButtonColor(1) }>
                        map
                    </div>

                    <div className="m-8"
                        onClick={ () => ChangeButtonColor(2) }>
                        mypage
                    </div>

            </div>
        </React.Fragment>
    );
};

export default Nav;