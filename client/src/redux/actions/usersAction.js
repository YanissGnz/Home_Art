import ACTIONS from './index'
import axios from 'axios'

export const fetchAllUsers = async (token) => {
    const res = await axios.get('/users/All_User_info', {
        headers: {Authorization: token}
    })
    return res
}

export const dispatchGetAllUsers = (res) => {
    return {
        type: ACTIONS.GET_ALL_USERS,
        payload: res.data
           
        
    }
}