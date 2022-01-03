import React, {useEffect, useState} from 'react';
import styles from './navigation.module.css';
import {Link, useNavigate} from "react-router-dom";

const Navigation = ({authService,user}) => {
    const navigate = useNavigate()
    const goHome = () => {
        navigate("/")
    }
    const onLogout = () =>{
        authService.logout()
        window.location.reload();
    }

    return(
        <nav id='navbar' className={styles.nav}>
            { window.location.pathname === "/" ||
            <span className={styles.home} onClick={goHome}>홈</span>
            }
            { window.location.pathname ==='/' ? "" :(window.location.pathname ==="/gourmet" ?
                <Link to='/snack'>간식 게시판</Link> :
                <Link to='/gourmet'>맛집 지도</Link>)}
            { user &&
            <span className={styles.logout} onClick={onLogout}>로그아웃</span>
            }
        </nav>
    );
}

export default Navigation;