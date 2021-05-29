import { combineReducers } from "redux";
import auth from "./authReducer";
import err from "./errReducer";
import users from "./usersReducer";
export default combineReducers({
	auth,
	err,
	users,
});
