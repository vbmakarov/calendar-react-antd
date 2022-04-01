import {INotes} from "../../../types/notesTypes";
import {IDeleteNotes} from "../../../types/taskTypes";

export enum notesActionsEnum{
    SET_NOTE = 'SET_NOTE',
    DELETE_NOTE = 'DELETE_NOTE'
}

export interface NotesDataAction {
    type: notesActionsEnum.SET_NOTE,
    payload: INotes
}

export interface NotesDeleteAction {
    type: notesActionsEnum.DELETE_NOTE,
    payload: IDeleteNotes
}

export type NotesAction = NotesDataAction | NotesDeleteAction

