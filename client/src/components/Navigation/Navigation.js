import React, {useEffect, useState} from 'react';
import styles from './navigation.module.css';
import {useNavigate} from "react-router-dom";

const Navigation = ({authService,user}) => {
    const [navHeight, setNavHeight] = useState('');
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
            <span className={styles.home} onClick={goHome}>Back</span>
            }
            { user &&
            <span className={styles.logout} onClick={onLogout}>Logout</span>
            }
        </nav>
    );
}

export default Navigation;