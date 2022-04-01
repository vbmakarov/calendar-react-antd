import {getWeather} from "../../service/weatherService";
import {getWeatherData} from "../actions/weather/actions";
import {AppDispatch} from "../reducers/rootReducer";
import {Coords} from "../../types/citiesTypes";
import {User} from "../../types/usersTypes";
import {getUser} from "../../service/usersService";
import {setUserData} from "../actions/users/actions";
import {saveDataMemory} from "../../service/dataMemoryService";

export const weatherData = (coords:Coords, setLoading:(x:boolean)=>void, setError:(x:string)=>void)  => {
    return async (dispatch:AppDispatch) => {
        try{
            setLoading(true)
            const data = await getWeather(coords)
            dispatch(getWeatherData(data))
            setLoading(false)
        }catch (e) {
            setLoading(false)
            setError('Сервис недоступен. Попробуйте зайти позднее.')
        }
    }
}


export const getGithubUser = (values: User, setError:(x:string)=>void)  => {
    return async (dispatch:AppDispatch) => {
        try{
            const data = await getUser(values)
            if(data.id.toString() === values.password){
                const user:User = {username: data.login, password: data.id}
                saveDataMemory('auth', data.login)
                dispatch(setUserData(user))
            }else {
                setError('Логин или пароль введены неверно')
            }
        }catch (e) {
            setError('Логин или пароль введены неверно')
        }
    }
}