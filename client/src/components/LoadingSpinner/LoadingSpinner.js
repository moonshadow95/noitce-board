import React from 'react';
import styles from "./loadingSinner.module.css";

const LoadingSpinner = () => (
    <div className={styles.container}>
        <div className={styles.spinner}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
);

export default LoadingSpinner;