import React from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import TasksBoard from "../pages/TasksBoard";
import Login from "../pages/Login";
import Main from "../pages/Main";
import {RouterTypes} from "../types/routerTypes";
import {useSelector} from "react-redux";
import {RootState} from "../store/reducers/rootReducer";


export const Routers = () => {

    const isAuth = useSelector<RootState>(state => state.users.username)

    const routers: RouterTypes = [
        {path: '/calendar', element: <TasksBoard/>},
        {path: '/', element: <Main/>},
    ]

    if(!isAuth){
        routers.push(
            {path: '/login', element: <Login/>},
        )
    }


    const routeElems = routers.map((route, index) => {
        return <Route key = {route.path + index} path = {route.path} element={route.element}/>
        })

    return (
        <Routes>
            {routeElems}
            <Route path = "*" element = {<Navigate replace to ="/"/>}/>
        </Routes>
    )
}