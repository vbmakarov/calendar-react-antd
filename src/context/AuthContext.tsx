import React, {FC, useState} from "react";
import {getDataMemory} from "../service/dataMemoryService";

const Context = React.createContext(null)

export const AuthContext:FC = (props:any) => {
    const [isAuth, setAuth] = useState(getDataMemory('auth'))


    return (
        <Context.Provider value = {isAuth}>
            {props.children}
        </Context.Provider>
    )
}