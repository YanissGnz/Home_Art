import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => {
	return {
		loader: {
			marginTop: "22%",
			marginLeft: "49%",
		},
		root: {
			width: "100%",
		},
		button: {
			marginTop: theme.spacing(1),
			marginRight: theme.spacing(1),
		},
		actionsContainer: {
			marginBottom: theme.spacing(2),
		},
		resetContainer: {
			padding: theme.spacing(3),
		},
		connectorLine: {
			flex: "0 1 auto",
		},
		wrapper: {
			margin: 0,
			position: "relative",
		},
		buttonProgress: {
			color: theme.palette.primary,
			position: "absolute",
			top: "50%",
			left: "50%",
			marginTop: -10,
			marginLeft: -12,
		},
	};
});
