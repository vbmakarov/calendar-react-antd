import {Button, Form, Input} from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React, {useEffect, useState} from "react";
import styles from './form.module.css'
import {useDispatch} from "react-redux";
import {getGithubUser} from "../../store/asyncActions/asyncActions";
import {User} from "../../types/usersTypes";

export const FormComponent = () => {
    const dispatch = useDispatch()
    const [form] = Form.useForm();

    const [isError, setError] = useState('')

    const onFinish = (values: User) => {
        dispatch(getGithubUser(values, setError))
    }

    useEffect(()=>{
        return () => form.resetFields();
    })

    const onFinishFailed = () => {

    }


    const getFormRules = (str:string) => {
        return{
            required: true,
            message: str
        }
    }

    return (
        <>
        <div className={styles.forma}>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                form={form}
            >
                {isError && <h1 style = {{color:'red'}}>{isError}</h1>}
                <Form.Item
                    name="username"
                    rules={[getFormRules("Введите имя")]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Github username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[getFormRules("Введите пароль")]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Github id"
                    />

                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Войти
                    </Button>
                </Form.Item>
                <Form.Item>
                    или <a href="https://github.com/signup" target="__blank">Зарегистрироваться на GitHub!</a>
                </Form.Item>
            </Form>
        </div>
        </>
    )
}