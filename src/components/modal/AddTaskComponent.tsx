import {ConfigProvider, DatePicker, Input, Modal, Space} from "antd";
import moment from "moment";
import 'moment/locale/ru';
import ruRu from "antd/lib/locale/ru_RU";
import locale from 'antd/es/date-picker/locale/ru_RU';
import React, {useEffect, useState} from "react";
import {IModal, VisibleData} from "../../types/modalTypes";
import {useDispatch, useSelector} from "react-redux";
import {setUserData} from "../../store/actions/notes/actions";
import {INotes} from "../../types/notesTypes";
import {RootState} from "../../store/reducers/rootReducer";
import {saveDataMemory} from "../../service/dataMemoryService";

const initialState = {
    date: {
        value: '',
        time: 0,
        error:'',
    },
    note: {
        value: '',
        error:'',
    },
    isValidate: false
}

export const AddTaskComponent = ({isVisible, setVisible}:IModal) => {
    moment.locale('ru')
    const dispatch = useDispatch()
    const user:any = useSelector<RootState>(state=>state.users.username)
    const notes:any = useSelector<RootState>(state=>state.notes)

    const [state, setState] = useState(initialState)

    useEffect(()=>{
        saveDataMemory('notes', notes)
    }, [notes])

    const setDate = (date: any, dateString: string) => {
        const timeAndDate = dateString.split(' ')
        const time = new Date(dateString).getTime()
        const dateStr = timeAndDate[0]
        setState((state)=>{
            return {
                ...state,
                date: {
                    value: dateStr,
                    time: time,
                    error: ''
                }
            }
        })
    }

    const handleOk = () => {
        const checkingFields = checking()
        if(checkingFields.valid && user) {
            const note:INotes = {
                [user]:{
                    [state.date.value]: {
                        [state.date.time]:state.note.value
                    }
                }
            }
            dispatch(setUserData(note))
            setState((state)=>{
                return {
                    ...state,
                    ...initialState
                }
            })
            setVisible({
                ...isVisible,
                modal: false,
                success: true
            });
        } else {
            setState((state)=>{
                return{
                    ...state,
                    date : {
                        value: state.date.value,
                        time: state.date.time,
                        error: checkingFields.errorDate,
                    },
                    note : {
                        value: state.note.value,
                        error: checkingFields.errorNote
                    },
                    isValidate: checkingFields.valid
                }
            })
        }
    }

    function checking () {
        let valid = true
        let errorDate= ''
        let errorNote = ''
        if(!state.date.value) {
            errorDate = "Введите дату"
            valid = false
        }
        if(!state.note.value) {
            errorNote = "Введите текст заметки"
            valid = false
        }

        return {
            valid: valid,
            errorDate: errorDate,
            errorNote: errorNote
        }
    }

    const handleCancel = () => {
        setVisible({
            ...isVisible,
            modal: false
        });
    }

    const onChange = (value:string) => {
        setState((state)=>{
            return {
                ...state,
                note: {
                    value: value,
                    error: ''
                }
            }
        })
    }

    function onOk(value:any) {
        console.log('onOk: ', value);
    }

    function disabledDate(current:any) {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
    }


  return (
      <Modal title="Создайте заметку" visible={isVisible.modal} onOk={handleOk} onCancel={handleCancel} cancelText="Отмена">
          <Space direction="vertical" size={12}>
              <ConfigProvider locale={ruRu}>
                  {state.date.error && <h5 style = {{color:'red'}}>* {state.date.error}</h5>}
                  <DatePicker
                      showTime={{ format: 'HH:mm' }}
                      onChange={setDate}
                      onOk={onOk}
                      disabledDate={disabledDate}
                  />
              </ConfigProvider>
              {state.note.error && <h5 style = {{color:'red'}}>* {state.note.error}</h5>}
              <Input value = {state.note.value} showCount maxLength={60} onChange={(event) => onChange(event.target.value)}/>
          </Space>
      </Modal>
  )
}