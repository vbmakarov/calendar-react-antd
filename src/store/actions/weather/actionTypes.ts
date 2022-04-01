import {WeatherTypes} from "../../../types/weatherTypes";

export enum weatherActionsEnum{
    GET_WEATHER = 'GET_WEATHER'
}


export interface weatherDataAction {
    type: weatherActionsEnum.GET_WEATHER,
    payload: WeatherTypes
}


