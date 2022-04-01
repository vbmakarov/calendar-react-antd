import React, {FC, useState} from "react";
import {Calendar, ConfigProvider} from 'antd';
import ruRu from 'antd/lib/locale/ru_RU';
import moment from 'moment';
import 'moment/locale/ru';
import {useSelector} from "react-redux";
import {RootState} from "../store/reducers/rootReducer";
import {TaskTypes} from "../types/taskTypes";
import {EditTaskComponent} from "../components/modal/EditTaskComponent";
import {Tasks} from "../types/taskTypes";


const TasksBoard: FC = () => {

    moment.locale('ru')
    const notes:any = useSelector<RootState>(state=>state.notes)
    const user:any = useSelector<RootState>(state=>state.users.username)

    const [isVisibleTasks, setVisibleTasks] = useState <Tasks>({
        visible:false,
        tasks:[],
        date: ''
    });

    function getListData(value:any, date:string) {
        const sortValues =  Object.entries(value).sort()
        const listData = sortValues.map((value, index)=>{
            const time = new Date(+value[0]).toLocaleTimeString([], {timeStyle: 'short'})
            const text = String(value[1])
            return {
                type: 'warning',
                dt:value[0],
                date: date,
                time: time,
                content: text
            }

        })
        return listData || [];
    }

    function showModal (listData:TaskTypes[], foundDate:string) {
        setVisibleTasks((state)=>{
            return {
                ...state,
                visible: true,
                tasks: listData,
                date: foundDate
            }
        })
    }

    function dateCellRender(value:any) {
        const date = value.format('YYYY-MM-DD')
        let listData:TaskTypes[] = []
        let foundDate = ''
        if(notes[user] && notes[user].hasOwnProperty(date)){
            listData = getListData(notes[user][date], date);
            foundDate = date
        }
        return (
            <ul
                className="events"
                onClick = {()=>showModal(listData, foundDate)}
            >
                {listData.map((item, index) => (
                    <li key={item.content + '775548' + index} >
                        <span>{item.time} </span> {item.content}
                    </li>
                ))}
            </ul>
        );
    }

    function getMonthData(value:any) {
        if (value.month() === 8) {
            return '1 сентября';
        }
    }

    function monthCellRender(value:any) {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>День рождения!</span>
            </div>
        ) : null;
    }
    return (
        <div style = {{padding:'5px'}}>
            <EditTaskComponent isVisibleTasks = {isVisibleTasks} setVisible = {setVisibleTasks}/>
            <ConfigProvider locale={ruRu}>
                <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender}/>
            </ConfigProvider>
        </div>
    )
}

export default TasksBoard