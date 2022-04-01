import styles from "../weather/weather.module.css";
import React from "react";

export const MainLoader = () => {
    return (
        <div className="site-card-wrapper weather">
            <div className = {styles.weather__container}>
                <div className = {styles.weather__wrapper}>
                    <div className={styles.spinner__flex}>
                        <p>Идет загрузка данных...</p>
                        <div className={styles.spinner}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}