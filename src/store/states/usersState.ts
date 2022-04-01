import {User} from '../../types/usersTypes'
import {getDataMemory} from "../../service/dataMemoryService";

export const usersState:User = {
    username: getDataMemory('auth') || '',
    password: ''
}