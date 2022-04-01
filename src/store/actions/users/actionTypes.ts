import {User} from "../../../types/usersTypes";

export enum userActionsEnum{
    GET_USER = 'GET_USER',
    DELETE_USER = 'DELETE_USER'
}


export interface UserDataAction {
    type: userActionsEnum,
    payload: User
}