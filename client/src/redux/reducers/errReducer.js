import ACTIONS from "../actions/";

const initialState = {
	msg: "",
	status: null,
	id: null,
};

const errReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTIONS.GET_ERRORS:
			return {
				msg: action.payload.msg,
				status: action.payload.status,
				id: action.payload.id,
			};
		case ACTIONS.CLEAR_ERRORS:
			return {
				msg: "",
				status: null,
				id: null,
			};
		default:
			return state;
	}
};
export default errReducer;
