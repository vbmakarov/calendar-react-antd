import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {weatherReducer} from './weatherReducer'
import {usersReducer} from './usersReducer'
import {NotesReducer} from "./notesReducer";


const rootReducer = combineReducers({
    weather:weatherReducer,
    users: usersReducer,
    notes: NotesReducer
})

export const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch