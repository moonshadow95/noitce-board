import React from 'react';
import {Link} from "react-router-dom";
import styles from './navgation.module.css';

const Navigation = (props) => {
    return(
        <nav className={styles.nav}>
            <Link className={styles.link} to="/">Back</Link>
        </nav>
    );
}

export default Navigation;