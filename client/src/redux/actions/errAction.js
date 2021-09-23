import ACTIONS from "./index";

// RETURN ERRORS
export const returnErrors = (msg, status, id) => {
	return {
		type: ACTIONS.GET_ERRORS,
		payload: { msg, status, id },
	};
};

// CLEAR ERRORS
export const clearErrors = () => {
	return {
		type: ACTIONS.CLEAR_ERRORS,
	};
};
