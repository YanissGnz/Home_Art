import ACTIONS from "./index";
import axios from "axios";

//Login Action
export const dispatchLogin = (res) => {
	return {
		type: ACTIONS.LOGIN,
		payload: res.data,
	};
};
export const dispatchLogin2 = (res) => {
	return {
		type: ACTIONS.LOGIN2,
		payload: res.data,
	};
};
//Logout Action

export const dispatchLogout = () => {
	return {
		type: ACTIONS.LOGOUT,
	};
};

export const dispatchAdminLoading = () => {
	return {
		type: ACTIONS.ADMIN_LOADING,
	};
};
export const dispatchUserLoading = () => {
	return {
		type: ACTIONS.USER_LOADING,
	};
};
export const dispatchAdminLoaded = (res) => {
	return {
		type: ACTIONS.ADMIN_LOADED,
		payload: res.data,
	};
};
export const dispatchUserLoaded = (res) => {
	return {
		type: ACTIONS.USER_LOADED,
		payload: res.data,
	};
};
export const dispatchAdminError = (res) => {
	return {
		type: ACTIONS.ADMIN_ERROR,
	};
};
export const dispatchUserError = (res) => {
	return {
		type: ACTIONS.USER_ERROR,
	};
};

export const fetchUser = async (token) => {
	const res = await axios.get("/users/admin_info", {
		headers: { Authorization: token },
	});
	return res;
};
export const fetchUser2 = async (token) => {
	const res = await axios.get("/users/User_info", {
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
