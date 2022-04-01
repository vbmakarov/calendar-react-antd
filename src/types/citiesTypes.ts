export interface Coords {
    lat:number,
    lon: number,
}

export interface CoordsProps{
    setCoords: (obj:City) => void,
    coords: City
}

export interface City {
    lat:number,
    lon: number,
    name:string
}

export interface CitiesTypes{
    [key:string]: City
}