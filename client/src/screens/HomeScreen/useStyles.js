import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => {
	return {
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
		iconButton: {
			padding: 6,
		},
		button: {
			fontFamily: "Poppins",
			textTransform: "capitalize",
			padding: 10,
		},
	};
});
