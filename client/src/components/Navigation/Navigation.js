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
        authService.logout()
        window.location.reload();
    }


    return (
        <nav id='navbar'
             className='absolute left-0 top-0 right-0 z-10 p-4 flex justify-between align-center transition bg-gradient-to-r from-ictusStart to-ictusEnd text-white border-b border-black'
        >
            <ul className='flex align-center gap-12 w-full text-2xl px-10'>
                {window.location.pathname === "/" ||
                <li onClick={goBack} className='hover:cursor-pointer transition hover:text-black hover:scale-125'>
                    <FontAwesomeIcon icon={faChevronLeft} size={'lg'}/>
                </li>}
                <Link to={'/snack'}>
                    <li className={`${isSnack && 'text-black'} transition hover:text-black hover:scale-125`}>
                        <FontAwesomeIcon icon={faCookieBite} size={'lg'}/>
                    </li>
                </Link>
                <Link to={'/gourmet'}>
                    <li className={`${isGourmet && 'text-black'} transition hover:text-black hover:scale-125`}>
                        <FontAwesomeIcon icon={faMapMarkerAlt} size={'lg'}/>
                    </li>
                </Link>
                {user &&
                <li onClick={onLogout}
                    className='ml-auto text-black flex hover:cursor-pointer transition hover:text-red hover:scale-125'
                >
                    <FontAwesomeIcon icon={faSignOutAlt} size={'lg'}/>
                </li>
                }
            </ul>
        </nav>
    );
}

export default Navigation;