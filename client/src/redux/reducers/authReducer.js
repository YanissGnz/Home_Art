import ACTIONS from "../actions/";

const initialState = {
	user: null,
	token: localStorage.getItem("token"),
	isLoading: false,
	isAuthenticated: localStorage.getItem("isAuthenticated"),
	isAdmin: false,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTIONS.ADMIN_LOADING:
			localStorage.setItem("isAuthenticated", false);
			return {
				...state,
				isLoading: true,
				isAuthenticated: localStorage.getItem("isAuthenticated"),
			};
		case ACTIONS.USER_LOADING:
			localStorage.setItem("isAuthenticated", false);
			return {
				...state,
				isLoading: true,
				isAuthenticated: localStorage.getItem("isAuthenticated"),
			};
		case ACTIONS.ADMIN_LOADED:
			localStorage.setItem("isAuthenticated", true);
			return {
				...state,
				user: action.payload.user,
				isAuthenticated: localStorage.getItem("isAuthenticated"),
				isAdmin: true,
				isLoading: false,
			};
		case ACTIONS.USER_LOADED:
			localStorage.setItem("isAuthenticated", true);
			return {
				...state,
				user: action.payload.user,
				isAuthenticated: localStorage.getItem("isAuthenticated"),
				isAdmin: false,
				isLoading: false,
			};
		case ACTIONS.LOGIN:
			localStorage.setItem("token", action.payload.access_token);
			localStorage.setItem("isAuthenticated", true);
			return {
				...state,
				token: localStorage.getItem("token"),
				isAuthenticated: localStorage.getItem("isAuthenticated"),
				isAdmin: true,
			};
		case ACTIONS.LOGIN2:
			localStorage.setItem("token", action.payload.access_token);
			localStorage.setItem("isAuthenticated", true);
			return {
				...state,
				token: localStorage.getItem("token"),
				isAuthenticated: localStorage.getItem("isAuthenticated"),
				isAdmin: false,
			};
		case ACTIONS.RECOVER_PASSWORD:
			localStorage.setItem("token", action.payload.access_token);
			localStorage.setItem("isAuthenticated", false);
			return {
				...state,
				token: localStorage.getItem("token"),
				isAuthenticated: localStorage.getItem("isAuthenticated"),
			};
		case ACTIONS.ADMIN_ERROR:
			localStorage.setItem("isAuthenticated", false);
			return {
				...state,
				user: null,
				token: null,
				isAuthenticated: localStorage.getItem("isAuthenticated"),
				isAdmin: false,
			};
			case ACTIONS.USER_ERROR:
			localStorage.setItem("isAuthenticated", false);
			return {
				...state,
				user: null,
				token: null,
				isAuthenticated: localStorage.getItem("isAuthenticated"),
				isAdmin: false,
			};
		case ACTIONS.LOGOUT:
			localStorage.removeItem("token");
			localStorage.removeItem("isAuthenticated");
			return {
				...state,
				user: null,
				token: null,
				isAuthenticated: false,
				isAdmin: false,
			};

		default:
			return state;
	}
};

export default authReducer;
