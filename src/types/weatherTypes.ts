export interface IsLoading{
    isLoading:boolean,
    city?:string
}

interface weather {
    id: number,
    main: string,
    description: string,
    icon: string
}

interface numbersObject {
    [key:string]: number
}


interface day {
    dt: number,
    sunrise: number,
    sunset: number,
    moonrise: number,
    moonset: number,
    moon_phase: number,
    temp: numbersObject,
    feels_like:numbersObject,
    pressure: number,
    humidity: number,
    dew_point: number,
    wind_speed: number,
    wind_deg: number,
    wind_gust: number,
    weather: weather[],
    clouds: number,
    pop: number,
    snow: number,
    uvi: number
}

export interface hourly {
    dt: number,
    temp: number,
    feels_like: number,
    pressure: number,
    humidity: number,
    dew_point: number,
    uvi:number,
    clouds:number,
    visibility:number,
    wind_speed:number,
    wind_deg: number,
    wind_gust: number,
    weather: weather[],
    pop: 0,
    snow: numbersObject
}

export interface current{
    dt: number,
    sunrise: number,
    sunset: number,
    temp: number,
    feels_like: number,
    pressure: number,
    humidity: number,
    dew_point: number,
    uvi: number,
    clouds: number,
    visibility: number,
    wind_speed: number,
    wind_deg: number,
    wind_gust: number,
    weather:weather[]
}


export interface WeatherTypes{
    lat:number,
    lon:number,
    current:current,
    hourly: hourly[],
    daily:day[]
}