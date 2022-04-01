import React from 'react'
import {useSelector} from "react-redux";
import {RootState} from "../../../store/reducers/rootReducer";
import {Card, Col, Row} from "antd";
import styles from "../weather.module.css";
import {getIcon, getPressure, getTemp, getWeekDay} from "../../utils";
// @ts-ignore
import { WiBarometer,WiUmbrella, WiGaleWarning} from 'weather-icons-react';
import {IsLoading} from "../../../types/weatherTypes";


export const CardsWeather = (props:IsLoading):JSX.Element | null => {
    const daily: any = useSelector<RootState>(state => state.weather.daily)

    if(props.isLoading){
        return null
    }

    const cards = new Array(4).fill('').map((_, index)=>{
        const day = getWeekDay(daily[index + 1].dt)
        const iconColor = index % 2 !== 0? '#fff' : '#296188'
        return(
            <Col span={6} key = {index}>
                <Card title={index === 0? 'Завтра': day} bordered={false} className={index % 2 !== 0?'active':''}>
                    <div >
                        <div className = {styles.night__content}>
                            <div className = {styles.night__icons}>
                                {getIcon(daily[index + 1].weather[0].icon, 100, iconColor)}
                            </div>
                            <div className={styles.night__temp}>
                                <div>от {getTemp(daily[index + 1].temp.min)} до {getTemp(daily[index + 1].temp.max)} °C</div>
                                <div>{daily[index + 1].weather[0].description}</div>
                            </div>
                        </div>
                        <div className={styles.day__metrics}>
                            <div className = {styles.day__pressure}>
                                <div><WiBarometer size={50} color={iconColor} /></div>
                                <div className={styles.day__desc}>Давление {getPressure(daily[index + 1].pressure)} мм. рт. ст.</div>
                            </div>
                            <div className = {styles.day__humidity}>
                                <div><WiUmbrella size={50} color={iconColor} /></div>
                                <div className={styles.day__desc}>Влажность {daily[index + 1].humidity}%</div>
                            </div>
                            <div className = {styles.day__wind}>
                                <div><WiGaleWarning size={50} color={iconColor} /></div>
                                <div className={styles.day__desc}>Ветер {daily[index + 1].wind_speed} м/с</div>
                            </div>
                        </div>
                    </div>
                </Card>
            </Col>
        )
    })

    return(
        <Row gutter={16} className={styles.weather__wrapper}>
            {cards}
        </Row>
    )
}