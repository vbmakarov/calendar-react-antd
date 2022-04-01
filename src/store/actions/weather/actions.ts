import {WeatherTypes} from "../../../types/weatherTypes";
import {weatherActionsEnum} from "./actionTypes";

export const getWeatherData = (data:WeatherTypes) => {
    return {
        type:weatherActionsEnum.GET_WEATHER,
        payload: data
    }
}

