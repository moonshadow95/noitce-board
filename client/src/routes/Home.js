import React from 'react';
import {Link} from "react-router-dom";
import Auth from "../components/Auth";

const Home = ({setBanner, setIsAlert, user, authService, setUser}) => {

    return (
        <>
            {/* 로그인 상태 */}
            {user ?
                <div className='flex-col-center gap-8 h-screen md:flex-row align-center'>
                    <Link to='/snack'
                          className='home-menu'>
                        <img
                            src="https://img.icons8.com/ios/200/000000/cookie.png" alt="간식 아이콘"/>
                    </Link>
                    <Link to='/gourmet'
                          className='home-menu'>
                        <img
                            src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/200/000000/external-map-vacations-flatart-icons-outline-flatarticons.png"
                            alt="지도 아이콘"/>
                    </Link>
                </div> :
                <>
                    {/* 비로그인 상태 */}
                    {/* 로그인 상태 */}
                    <Auth setUser={setUser} authService={authService}
                          setBanner={setBanner} setIsAlert={setIsAlert}
                    />
                </>
            }
        </>
    )
};

export default Home;