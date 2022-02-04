import React from 'react';
import {Link} from "react-router-dom";

const Home = (props) => (
    <div className='w-screen flex flex-col justify-center gap-8 h-screen md:flex-row align-center'>
        <Link to='/snack'
              className='mx-auto p-14 rounded border-8 p-10 text-3xl lg:p-24 xl:p-44 sm:my-auto active:bg-black hover:bg-gray transition'>
            <img
                src="https://img.icons8.com/ios/200/000000/cookie.png" alt="간식 아이콘"/>
        </Link>
        <Link to='/gourmet'
              className='mx-auto p-14 rounded border-8 p-10 text-3xl lg:p-24 xl:p-44 sm:my-auto active:bg-black hover:bg-gray transition'>
            <img
                src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/200/000000/external-map-vacations-flatart-icons-outline-flatarticons.png"
                alt="지도 아이콘"/>
        </Link>
    </div>
);

export default Home;