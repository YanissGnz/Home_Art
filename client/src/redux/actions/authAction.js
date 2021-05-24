import ACTIONS from "./index";
import axios from "axios";

export const dispatchLogin = () => {
	return {
		type: ACTIONS.LOGIN,
	};
};

export const dispatchLogout = () => {
	return {
		type: ACTIONS.LOGOUT,
	};
};

export const removeToken = () => {
	return {
		type: ACTIONS.REMOVE_TOKEN,
	};
};

export const fetchUser = async (token) => {
	const res = await axios.get("/users/info", {
		headers: { Authorization: token },
	});
	return res;
};

export const dispatchGetUser = (res) => {
	return {
		type: ACTIONS.GET_USER,
		payload: {
			user: res.data,
			isAdmin: res.data.role === 1 ? true : false,
		},
	};
};
