import { makeStyles } from "@material-ui/core";

const drawerWidth = 400;

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
	};
});
