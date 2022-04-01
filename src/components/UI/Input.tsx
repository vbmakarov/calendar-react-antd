import React, {useState} from 'react'
import styles from './ui.module.css'

export const Input = ({type='text'}:any) => {

    const [value, setValue] = useState('')

    const changeHandler = (value:string) => {
        const str = value.replace(/<[^>]+>/g,'')
        setValue(str)
    }

    return(
        <input
            type = {type}
            value = {value}
            onChange={(event) => changeHandler(event.target.value)}
            className = {styles.input__default}

        />
    )
}