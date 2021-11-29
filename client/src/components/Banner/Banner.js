import React from 'react';
import styles from './banner.module.css';

const Banner = ({text, isAlert}) => (
    <>
        {text && (
            <p className={`${styles.banner}  ${isAlert ? styles.bannerRed : styles.bannerGreen}`}>
                {text}
            </p>
        )}
    </>
)
export default Banner;