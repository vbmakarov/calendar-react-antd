import axios from  'axios'
import {User} from "../types/usersTypes";

export const getUser = async (value:User) => {
    const response = await axios.get(`https://api.github.com/users/${value.username}`)
    return response.data
}