import ACTIONS from "./index";

export const dispatchGetAllUsers = (users) => {
	return {
		type: ACTIONS.GET_ALL_USERS,
		payload: users,
	};
};
