import {usersState} from '../states/usersState'
import {userActionsEnum, UserDataAction} from "../actions/users/actionTypes";

export const usersReducer = (state=usersState, action:UserDataAction) => {
    switch(action.type){
        case userActionsEnum.GET_USER: return {...state, ...action.payload}
        case userActionsEnum.DELETE_USER: return {...action.payload}
        default: return state
    }
}