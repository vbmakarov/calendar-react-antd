import styles from "../weather.module.css";
import {
    getData,
    getDate,
    getEveningData,
    getIcon,
    getPressure,
    getTemp,
    getTime,
} from "../../utils";
import React, {useEffect, useMemo, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/reducers/rootReducer";
import {FieldTimeOutlined, EnvironmentOutlined} from '@ant-design/icons';
// @ts-ignore
import { WiBarometer,WiUmbrella, WiGaleWarning, WiSunrise,WiSunset,WiMoonWaningCrescent4,WiHorizon } from 'weather-icons-react';
import {IsLoading} from "../../../types/weatherTypes";


export const NowWeather = (props:IsLoading):JSX.Element | null => {
    const current:any  = useSelector<RootState>(state => state.weather.current)
    const nowWeather: any = useSelector<RootState>(state => state.weather.current.weather[0])
    const hourly: any = useSelector<RootState>(state => state.weather.hourly)

    const [nowTime, setTime] = useState('')

    const nightData = useMemo(()=> getData(hourly), [hourly])
    const eveningData = useMemo(()=> getEveningData(hourly, current), [hourly, current])

    const clock = () => {
        setTime((state)=>{
            return new Date().toLocaleTimeString()
        })
    }

    useEffect(()=>{
        const interval = setInterval(()=>{
            clock()
        }, 1000)

        return ()=>{
            clearInterval(interval)
        }
    },[nowTime])

    if(props.isLoading){
        return null
    }

    return (
        <div className = {styles.weather__now}>
            <div className = {styles.weather__day}>
                <div className = {styles.day__header}>
                    <EnvironmentOutlined style = {{color:'#296188'}}/> {props.city} {getDate(current.dt)}
                    <span> <FieldTimeOutlined /> {nowTime} </span>
                </div>
                <div className = {styles.day__content}>
                    <div className={styles.day__image}>{getIcon(nowWeather.icon, 200)}</div>
                    <div className={styles.day__temp}>
                        <div className={styles.temp__degress}>{getTemp(current.temp)} °C</div>
                        <div className={styles.temp__about}>{nowWeather.description}</div>
                    </div>
                    <div className={styles.day__metrics}>
                        <div className = {styles.day__pressure}>
                            <div><WiBarometer size={50} color='#296188' /></div>
                            <div className={styles.day__desc}>Давление {getPressure(current.pressure)} мм</div>
                        </div>
                        <div className = {styles.day__humidity}>
                            <div><WiUmbrella size={50} color='#296188' /></div>
                            <div className={styles.day__desc}>Влажность {current.humidity}%</div>
                        </div>
                        <div className = {styles.day__wind}>
                            <div><WiGaleWarning size={50} color='#296188' /></div>
                            <div className={styles.day__desc}>Ветер {current.wind_speed} м/с</div>
                        </div>
                        <div className = {styles.day__sun}>
                            <div className = {styles.day__sunrise}>
                                <div><WiSunrise size={25} color='#296188' /></div>
                                <div>{getTime(current.sunrise)}</div>
                            </div>
                            <div className = {styles.day__sunset}>
                                <div><WiSunset size={25} color='#296188' /></div>
                                <div>{getTime(current.sunset)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {eveningData!==null && <div className = {styles.weather__evening}>
                <div className = {styles.evening__header}>Вечером</div>
                <div className = {styles.evening__content}>
                    <div className = {styles.evening__icons}>
                        <WiHorizon size={40} color='#cd5700' />
                        {getIcon(eveningData.weather[0].icon, 100, '#ffff')}
                    </div>
                    <div className={styles.evening__temp}>
                        <div>{getTemp(eveningData.temp)} °C</div>
                        <div>{eveningData.weather[0].description}</div>
                    </div>
                </div>
                <div className = {styles.evening__metrics}>
                    <div>
                        <div><WiBarometer size={50} color='#ffff' /></div>
                        <div>{getPressure(eveningData.pressure)} мм</div>
                    </div>
                    <div>
                        <div><WiUmbrella size={50} color='#ffff' /></div>
                        <div>{eveningData.humidity}%</div>
                    </div>
                    <div>
                        <div><WiGaleWarning size={50} color='#ffff' /></div>
                        <div>{eveningData.wind_speed} м/с</div>
                    </div>
                </div>
            </div>}

            {nightData !== null && <div className = {styles.weather__night}>
                <div className = {styles.night__header}>Ночью</div>
                <div className = {styles.night__content}>
                    <div className = {styles.night__icons}>
                        <WiMoonWaningCrescent4 size={40} color='#fdd017' />
                        {getIcon(nightData.weather[0].icon, 100, '#fff')}
                    </div>
                    <div className={styles.night__temp}>
                        <div>{getTemp(nightData.temp)} °C</div>
                        <div>{nightData.weather[0].description}</div>
                    </div>
                </div>
                <div className = {styles.night__metrics}>
                    <div>
                        <div><WiBarometer size={50} color='#fff' /></div>
                        <div>{getPressure(nightData.pressure)} мм</div>
                    </div>
                    <div>
                        <div><WiUmbrella size={50} color='#fff' /></div>
                        <div>{nightData.humidity}%</div>
                    </div>
                    <div>
                        <div><WiGaleWarning size={50} color='#fff' /></div>
                        <div>{nightData.wind_speed} м/с</div>
                    </div>
                </div>
            </div>}
        </div>
    )
}