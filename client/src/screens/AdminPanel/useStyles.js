import { makeStyles } from "@material-ui/core";

const drawerWidth = 250;

export const useStyles = makeStyles((theme) => {
	return {
		appBar: {
			zIndex: theme.zIndex.drawer + 1,
			transition: theme.transitions.create(["width", "margin"], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
		},
		appBarShift: {
			marginLeft: drawerWidth,
			width: `calc(100% - ${drawerWidth}px)`,
			transition: theme.transitions.create(["width", "margin"], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
		},
		menuButton: {
			marginRight: 36,
		},
		hide: {
			display: "none",
		},
		drawer: {
			width: drawerWidth,
			flexShrink: 0,
			whiteSpace: "nowrap",
		},
		drawerOpen: {
			width: drawerWidth,
			transition: theme.transitions.create("width", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
		},
		drawerClose: {
			transition: theme.transitions.create("width", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			overflowX: "hidden",
			width: theme.spacing(7) + 1,
			[theme.breakpoints.up("sm")]: {
				width: theme.spacing(9) + 1,
			},
		},
		active: {
			background: "#f4f4f4",
		},
		toolbar: {
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-end",
			padding: theme.spacing(0, 1),
			// necessary for content to be below app bar
			...theme.mixins.toolbar,
		},

		appBarLogo: {
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "center",
			marginRight: "30%",
		},
		searchDiv: {
			flex: 0.98,
		},
		searchPaper: {
			width: "30em",
			padding: "2px 4px",
			display: "flex",
			alignItems: "center",
			height: 40,
			marginRight: "3em",
			marginLeft: "3em",
		},
		input: {
			width: "20em",
			marginLeft: theme.spacing(1),
			flex: 1,
		},
		search_Button: {
			padding: 6,
		},
		logout_button: {
			padding: 10,
			fontWeight: "450",
			fontSize: "16px",
			textTransform: "capitalize",
			"&:hover": {
				backgroundColor: theme.palette.common.white,
			},
		},
		nested: {
			paddingLeft: theme.spacing(4),
		},
		content: {
			flexGrow: 1,
			backgroundColor: theme.palette.background.default,
			padding: theme.spacing(3),
		},
		cart: {
			borderRadius: 10,
		},
		card_header: {
			color: theme.palette.primary,
		},
		title: {
			fontSize: 14,
		},
		pos: {
			marginBottom: 12,
		},
		dashboardText: {
			marginBottom: 20,
		},
		productInputContainer: {
			paddingLeft: "0em",
			display: "flex",
			flexDirection: "column",
		},
		productForm: {
			paddingLeft: "0em",
			display: "flex",
			flexDirection: "column",
		},
		productInputContainer_2: {
			width: "100%",
			padding: "0em",
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "flex-start",
		},
		productInput: {
			marginBottom: "2em",
			marginRight: "1em",
		},
		lastProductInput: {
			marginBottom: "2em",
		},
		descriptionInput: {
			marginBottom: "2em",
			marginRight: "1em",
		},
		imageCard: {
			maxWidth: 350,
			maxHeight: 350,
			alignSelf: "center",
			marginBottom: "2em",
		},
		addProductBtn: {
			textTransform: "capitalize",
			color: theme.palette.common.white,
			width: "20em",
			marginBottom: "1em",
			alignSelf: "center",
		},
	};
});
