import {weatherState} from "../states/weatherState";
import {weatherActionsEnum, weatherDataAction} from "../actions/weather/actionTypes";

export const weatherReducer = (state = weatherState, action:weatherDataAction) => {
        switch(action.type){
            case weatherActionsEnum.GET_WEATHER:
                return {...state, current: action.payload.current, hourly:action.payload.hourly, daily: action.payload.daily.slice(0,5)}
            default: return state
        }
}