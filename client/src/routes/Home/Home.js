import React from 'react';
import styles from './home.module.css'
import {Link} from "react-router-dom";

const Home = (props) => (
    <div className={styles.container}>
        <Link className={styles.link} to='/snack'>
            간식 게시판
            <img className={styles.icon} src="https://img.icons8.com/ios/150/000000/potato-chips.png" alt="간식 아이콘"/>
        </Link>
        <Link className={styles.link} to='/gourmet'>
            맛집 지도
            <img className={styles.icon} src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/150/000000/external-map-vacations-flatart-icons-outline-flatarticons.png" alt="지도 아이콘"/>
        </Link>
    </div>
);

export default Home;