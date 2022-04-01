// @ts-ignore
import { WiNightThunderstorm, WiShowers, WiDayRainMix} from "weather-icons-react";
// @ts-ignore
import {WiSnow, WiDust, WiDaySunny, WiNightClear, WiNightRain} from "weather-icons-react";
// @ts-ignore
import {WiDayCloudy, WiNightAltCloudy, WiCloud,  WiCloudy} from "weather-icons-react";
import {current, hourly} from "../types/weatherTypes";

export function getIcon (id:string, size:number = 24, color:string = '#296188' ):JSX.Element | null {

    if(id === '11d' || id === '11n'){
        return <WiNightThunderstorm size={size} color={color} />
    }

    if(id === '09d' || id === '09n'){
        return  <WiShowers size={size} color={color}/>
    }

    if(id === '10d'){
        return <WiDayRainMix size={size} color={color}/>
    }

    if(id === '10n'){
        return <WiNightRain size={size} color={color}/>
    }

    if(id === '13d' || id === '13n'){
        return <WiSnow size={size} color={color}/>
    }

    if(id === '50d'){
        return <WiDust size={size} color={color}/>
    }

    if(id === '01d'){
        return <WiDaySunny size={size} color={color}/>
    }

    if(id === '01n'){
        return <WiNightClear size={size} color={color}/>
    }

    if(id === '02d'){
        return <WiDayCloudy size={size} color={color}/>
    }
    if(id === '02n'){
        return <WiNightAltCloudy size={size} color={color}/>
    }
    if(id === '03d' || id === '03n'){
        return <WiCloud size={size} color={color}/>
    }
    if(id === '04d' || id === '04n'){
        return <WiCloudy size={size} color={color}/>
    }

    return null
}

export function getDate(dateTime:number):string {
    return new Date(dateTime * 1000).toLocaleString('ru', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

export function getDateNow():string {
    return new Date().toLocaleDateString().split('.').reverse().join('-')
}

export function nightDt():number{
    const now:Date = new Date()
    // const date:string = now.getFullYear() +'-'+ (now.getMonth() + 1)  +'-'+(now.getDate()+1) + ' ' + '01:00:00'
    const date:string = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()+1} 01:00:00`
    const dt:number = new Date(date).getTime()
    return dt/1000
}

export function getData(data:hourly[], dateTime = 0) {
    if(data.length > 1){
        let dt = nightDt()
        if (dateTime) {
            dt = dateTime
        }
        let i = 0;
        while(i < data.length){
            if(data[i].dt === dt){
                return data[i]
            }
            i++
       }
    }
    return null
}

export function eveningDt(){
    const now = new Date()
    // const date = now.getFullYear() +'-'+ (now.getMonth() + 1)  +'-'+now.getDate() + ' ' + '20:00:00'
    const date:string = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} 20:00:00`
    const dt = new Date(date).getTime()
    return dt/1000
}

export function getEveningData(data:hourly[], current:current){
    if(!data.length && !current.dt){
        return null
    }
    const dateTime = eveningDt()
    return getData(data, dateTime) || current

}

export function getTime(dateTime:number):string {
    const time = new Date(dateTime * 1000)
    return time.getHours() + ':' + time.getMinutes()
}

export function getWeekDay(dateTime:number) {
    const week = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const day = new Date(dateTime * 1000)
    const month = day.getMonth() + 1
    return week[day.getDay()] + ' ' + day.getDate() + '.' + (month < 10? '0' + month: month)
}

export function getTemp(temp:number):number{
    return Math.round(temp)
}

export function getPressure(pressure:number):number {
    return Math.round(pressure/1.333);
}