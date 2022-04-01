import React from 'react';
import {Button, Modal} from 'antd';
import {TasksModal, TaskTypes} from "../../types/taskTypes";
import {DeleteOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";
import {deleteNotes} from "../../store/actions/notes/actions";
import {RootState} from "../../store/reducers/rootReducer";

export const EditTaskComponent = (props:TasksModal) => {

    const dispatch = useDispatch()
    const user:any = useSelector<RootState>(state=>state.users.username)
    console.log(props.isVisibleTasks.tasks, user)

    const handleOk = () => {
        const prepareData = props.isVisibleTasks.tasks.reduce(function(previousValue, currentValue, index, array) {
            return {...previousValue, [currentValue['dt']]: currentValue['content']}
        },{})
        const data = {
            user: user,
            date: props.isVisibleTasks.date,
            correctTasks: prepareData
        }
        dispatch(deleteNotes(data))
        props.setVisible(
            {
                ...props.isVisibleTasks,
                visible: false
            }
        )
    }

    const handleCancel = () => {
        props.setVisible(
            {
                ...props.isVisibleTasks,
                visible: false
            }
        )
    }

    const deleteItem = (item:TaskTypes) => {
        props.setVisible(
            {
                ...props.isVisibleTasks,
                tasks: props.isVisibleTasks.tasks.filter((task,index)=>{
                    return task.time!==item.time
                })
            }
        )
    }

    return (
        <>
            <Modal title={`События за ${props.isVisibleTasks.date}`} visible={props.isVisibleTasks.visible} onOk={handleOk} onCancel={handleCancel}>
                <ul className="events">
                    {props.isVisibleTasks.tasks.map((item, index) => (
                        <li key={item.content + '884411' + index} className = "events__item">
                            <div className = "events__text">{item.time}&nbsp;&nbsp;{item.content}</div>
                            <Button onClick = {()=>deleteItem(item)} type="primary" danger icon={<DeleteOutlined/>}/>
                        </li>
                    ))}
                </ul>
            </Modal>
        </>
    );
};