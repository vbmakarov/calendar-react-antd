import React, {FC, useEffect, useState} from "react";
import {Avatar, Button, Layout, message, Modal} from "antd";
import {PlusOutlined, HomeOutlined,CalendarOutlined, UserOutlined } from '@ant-design/icons';
import classes from './header.module.css';
import {useNavigate} from 'react-router-dom'
import {cleanDataMemory} from "../../service/dataMemoryService";
import {deleteUser} from "../../store/actions/users/actions";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/reducers/rootReducer";
import {AddTaskComponent} from "../modal/AddTaskComponent";
import {VisibleData} from "../../types/modalTypes";

const HeaderComponent:FC = () => {
    const {Header} = Layout;
    const isAuth = useSelector<RootState>(state=>state.users.username)
    const [isVisible, setVisible] = useState<VisibleData>({
        modal:false,
        success: false
    });
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(()=>{
        if(isVisible.success) {
            message.success('Запись успешно добавлена!');
            setVisible(state => {
                return{
                    ...state,
                    success: false
                }
            });
        }
    },[isVisible.success])


    const warning = () => {
        Modal.warning({
            title: 'Вы не вошли в систему!',
            content: 'Пожалуйста введите свои учетные данные или пройдите регистрацию на Github, а затем повторите попытку.',
        });
    }


    const logout = () => {
        cleanDataMemory('auth')
        dispatch(deleteUser())
        navigate('/')
    }

    const login = () => {
        navigate('/login')
    }

    const showModal = () => {
        setVisible(state => {
            return{
                ...state,
                modal: true
            }
        });
    };


    return (
        <Header className={classes.header}>
            <div className={classes.header__container}>
                <div className={classes.header__flex}>
                    <div>
                        <div className={classes.header__links}>
                            <Button onClick = {()=>navigate('/')} ghost icon={<HomeOutlined />}/>
                            <Button onClick = {()=>navigate('/calendar')} ghost icon={<CalendarOutlined />}>Календарь</Button>
                            <Button onClick = {!isAuth?warning: showModal} ghost icon={<PlusOutlined />}>Добавить событие</Button>
                        </div>
                    <AddTaskComponent isVisible = {isVisible} setVisible = {setVisible}/>
                    </div>
                    <div className={classes.header__wrapper}>
                        <div
                            className = {classes.header__user}
                        >{
                            isAuth ?
                                <span>
                                    <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                                    &nbsp;&nbsp;{isAuth}
                                </span>
                                :<span>Войдите, чтобы добавить событие</span>
                        }</div>
                        <ul className={classes.header__menu}>
                            <li
                                className={classes.header__link}
                                onClick = {isAuth?logout: login}
                            >
                                {
                                    isAuth
                                        ? 'Выйти'
                                        :'Войти'
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </Header>
    )
}

export default HeaderComponent