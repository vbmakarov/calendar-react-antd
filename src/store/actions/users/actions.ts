import {User} from "../../../types/usersTypes";
import {userActionsEnum} from "./actionTypes";

export const setUserData = (data:User) => {
    return {
        type: userActionsEnum.GET_USER,
        payload: data
    }
}

export const deleteUser = () => {
    return {
        type: userActionsEnum.DELETE_USER,
        payload: {
            user: '',
            password: ''
        }
    }
}