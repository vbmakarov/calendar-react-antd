import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import styles from './weather.module.css'
import {CitiesComponent} from "./cities/CitiesComponent";
import {weatherData} from "../../store/asyncActions/asyncActions";
import {NowWeather} from "./blocks/NowWeather";
import {MainLoader} from "../loaders/MainLoader";
import {CardsWeather} from "./blocks/cardsWeather";
import {City} from "../../types/citiesTypes";


export const WeatherComponent = () => {
    const [coords, setCoords] = useState<City>({
        lat: 55.7522,
        lon: 37.6156,
        name:'Москва'
    })
    const [isLoading, setLoading] = useState(false)
    const [isError, setError] = useState('')
    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(weatherData(coords, setLoading, setError))
    }, [coords])


    if(isLoading){
        return <MainLoader/>
    }

    if(isError){
        return <h1>{isError}</h1>
    }

    return(
        <div className="site-card-wrapper weather">
            <div className = {styles.weather__container}>
                    <CitiesComponent setCoords = {setCoords} coords = {coords}/>
                    <NowWeather isLoading = {isLoading} city = {coords.name}/>
                    <CardsWeather isLoading = {isLoading}/>
            </div>
        </div>
    )
}