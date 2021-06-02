import { combineReducers } from "redux";
import auth from "./authReducer";
import err from "./errReducer";
import users from "./usersReducer";
import products from "./productsReducer";
export default combineReducers({
	auth,
	err,
	users,
	products,
});
