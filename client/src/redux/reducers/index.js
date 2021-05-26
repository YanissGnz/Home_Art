import {combineReducers} from 'redux'
import auth from './AuthReducer'

import token from './tokenReducer'
import users from './usersReducer'
export default combineReducers({
    auth,
    
    token,
    users
})