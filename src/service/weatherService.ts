import axios from  'axios'
import {Coords} from "../types/citiesTypes";

export const getWeather = async (coords:Coords) => {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/onecall', {
        params: {
            lat: coords.lat,
            lon: coords.lon,
            appid: 'd1d5160b1f3deacd3562a1fbd4ab2d95',
            units: 'metric',
            lang: 'ru',
        }
    })

    return response.data
}