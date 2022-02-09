import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faCookieBite, faMapMarkerAlt, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";

const Navigation = ({authService, user}) => {
    const navigate = useNavigate()
    const goBack = () => {
        navigate(-1)
    }
    const isGourmet = window.location.href.includes('gourmet')
    const isSnack = window.location.href.includes('snack')
    const onLogout = () => {
        const ok = window.confirm('로그아웃 하시겠습니까?')
        if (ok) {
            authService.logout()
            window.location.reload();
        }
    }


    return (
        <nav id='navbar'
             className='absolute left-0 top-0 right-0 z-10 p-4 flex justify-between align-center transition bg-ictus text-white border-b border-black'
        >
            <ul className='flex-row-center gap-12 w-full text-2xl px-10'>
                {window.location.pathname === "/" ||
                <li onClick={goBack} className='nav-animation'>
                    <FontAwesomeIcon icon={faChevronLeft} size={'lg'}/>
                </li>}
                <Link to={'/snack'}>
                    <li className={`${isSnack && 'text-black'} nav-animation`}>
                        <FontAwesomeIcon icon={faCookieBite} size={'lg'}/>
                    </li>
                </Link>
                <Link to={'/gourmet'}>
                    <li className={`${isGourmet && 'text-black'} nav-animation`}>
                        <FontAwesomeIcon icon={faMapMarkerAlt} size={'lg'}/>
                    </li>
                </Link>
                {user &&
                <li onClick={onLogout}
                    className='ml-auto text-black nav-animation hover:text-red'
                >
                    <FontAwesomeIcon icon={faSignOutAlt} size={'lg'}/>
                </li>
                }
            </ul>
        </nav>
    );
}

export default Navigation;