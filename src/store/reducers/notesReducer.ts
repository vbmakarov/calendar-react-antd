import {NotesState} from "../states/notesState";
import {NotesAction, notesActionsEnum} from "../actions/notes/actionTypes";

export const NotesReducer = (state = NotesState, action:NotesAction) => {
    switch(action.type){
        case notesActionsEnum.SET_NOTE:
            const username = Object.keys(action.payload)[0]
            const dateNotes =  action.payload[username]
            const date = Object.keys(dateNotes)[0]
            const timeNotes = dateNotes[date]
            if (!state[username]) {
                return {...state, [username]: {...dateNotes}}
            }
            if(!state[username][date]) {
                return {...state, [username]: {...state[username], [date]: timeNotes}}
            }
            return {...state, [username]: {...state[username], [date]: {...state[username][date], ...timeNotes}}}
        case notesActionsEnum.DELETE_NOTE:
            const data = action.payload
            if(state[data.user][data.date]) {
                return {...state, [data.user]: {...state[data.user], [data.date]: { ...data.correctTasks}}}

            }
            return state

        default: return state
    }

}