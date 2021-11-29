import React from 'react';
import styles from './navgation.module.css';

const Navigation = (props) => {
    const goHome = () => {
        window.location.replace("/")
    }
    return(
        <nav className={styles.nav}>
            <span className={styles.link} onClick={goHome}>Back</span>
        </nav>
    );
}

export default Navigation;