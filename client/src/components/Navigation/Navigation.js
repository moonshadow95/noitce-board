import React, {useEffect, useState} from 'react';
import styles from './navigation.module.css';
import {Link, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faChevronLeft, faCookieBite, faMapMarkerAlt,faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({authService,user}) => {
    const navigate = useNavigate()
    const goBack = () => {
        navigate(-1)
    }
    const isGourmet = window.location.href.includes('gourmet')
    const isSnack = window.location.href.includes('snack')
    const onLogout = () =>{
        authService.logout()
        window.location.reload();
    }
    

    return(
        <nav id='navbar' className={styles.nav}>
            <ul className={styles.navList}>
                { window.location.pathname === "/" ||
                <li className={styles.navListItem} onClick={goBack}>
                    <FontAwesomeIcon icon={faChevronLeft}/>
                    <span className={styles.hoverText}>뒤로</span>
                </li>}
                <Link to={'/snack'}>
                    <li className={`${styles.navListItem} ${isSnack && styles.active}`}><FontAwesomeIcon icon={faCookieBite}/>
                        <span className={styles.hoverText}>간식</span>
                    </li>
                </Link>
                <Link to={'/gourmet'}>
                    <li className={`${styles.navListItem} ${isGourmet && styles.active}`}><FontAwesomeIcon icon={faMapMarkerAlt}/>
                        <span className={styles.hoverText}>맛집</span>
                    </li>
                </Link>
                { user &&
                <li className={`${styles.navListItem} ${styles.logout}`} onClick={onLogout}>
                    <span className={styles.hoverText}>로그아웃</span>
                    <FontAwesomeIcon icon={faSignOutAlt}/>
                </li>
                }
            </ul>
        </nav>
    );
}

export default Navigation;