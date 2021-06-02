import ACTIONS from "../actions";

const initialState = {
	products: [],
	isLoading: false,
};

const productsReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTIONS.PRODUCT_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case ACTIONS.PRODUCT_ERROR:
			return {
				...state,
				isLoading: false,
			};
		case ACTIONS.PRODUCT_LOADED:
			return {
				...state,
				products: action.payload.Products,
				isLoading: false,
			};
		default:
			return state;
	}
};

export default productsReducer;
