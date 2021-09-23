import ACTIONS from "./index";

export const productLoading = () => {
	return {
		type: ACTIONS.PRODUCT_LOADING,
	};
};

export const productErrors = () => {
	return {
		type: ACTIONS.PRODUCT_ERROR,
	};
};

export const productsLoaded = (res) => {
	return {
		type: ACTIONS.PRODUCT_LOADED,
		payload: res.data,
	};
};
