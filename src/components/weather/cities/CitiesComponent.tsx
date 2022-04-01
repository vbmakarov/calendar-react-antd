import React from 'react'
import { Select } from 'antd';
import {cities} from '../cities/cities'
import {CoordsProps} from "../../../types/citiesTypes";
import styles from "../weather.module.css";
const { Option, OptGroup } = Select;

export const CitiesComponent = (props:CoordsProps) => {
    function handleChange(value: string) {
        const coords = value.split(' ')
        const obj = {
            lat:+coords[0],
            lon:+coords[1],
            name: coords[2]
        }
        props.setCoords(obj)
    }

    const citiesArray = Object.entries(cities).map(([city, obj], index)=>{
        return(
            <Option key = {city + index} value={obj.lat + ' ' + obj.lon + ' ' + obj.name}>{obj.name}</Option>
        )
    })

    return (
        <div className = {styles.weather__cities}>
            <span className = {styles.weather__intro}>Ваш город:</span>
            <Select defaultValue={props.coords.name} value = {props.coords.name} style={{ width: 200 }} onChange={handleChange}>
                <OptGroup label="Выберете город">
                    {citiesArray}
                </OptGroup>
            </Select>
        </div>
    )
}