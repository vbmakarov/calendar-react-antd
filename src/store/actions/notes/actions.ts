import {INotes} from "../../../types/notesTypes";
import {notesActionsEnum} from "../notes/actionTypes";
import {IDeleteNotes} from "../../../types/taskTypes";

export const setUserData = (data:INotes) => {
    return {
        type: notesActionsEnum.SET_NOTE,
        payload: data
    }
}

export const deleteNotes = (data:IDeleteNotes) => {
    return {
        type: notesActionsEnum.DELETE_NOTE,
        payload: data
    }
}