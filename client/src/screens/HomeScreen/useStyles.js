import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => {
	return {
		loader: {
			marginTop: "22%",
			marginLeft: "49%",
		},
		paper: {
			padding: "2px 4px",
			display: "flex",
			alignItems: "center",
			height: 40,
			marginRight: "3em",
			marginLeft: "3em",
			flex: 0.5,
		},
		input: {
			marginLeft: theme.spacing(1),
			flex: 1,
		},
		search_Button: {
			padding: 6,
		},
		cart_button: {
			marginRight: 20,
			padding: 10,
			fontWeight: "450",
			fontSize: "16px",
			textTransform: "capitalize",
			"&:hover": {
				backgroundColor: theme.palette.common.white,
			},
		},
		logout_button: {
			marginRight: 20,
			padding: 10,
			fontWeight: "550",
			fontSize: "16px",
			textTransform: "capitalize",
			"&:hover": {
				backgroundColor: theme.palette.common.white,
			},
		},
	};
});
