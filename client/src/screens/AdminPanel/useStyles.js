import { makeStyles } from "@material-ui/core";

const drawerWidth = 250;

export const useStyles = makeStyles((theme) => {
	return {
		loader: {
			marginTop: "22%",
			marginLeft: "49%",
		},
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
		},
		searchDiv: {
			flex: 1,
		},
		searchPaper: {
			padding: "2px 4px",
			display: "flex",
			alignItems: "center",
			height: 40,
			marginRight: "3em",
			marginLeft: "3em",
			flexGrow: 1,
		},
		input: {
			width: "20em",
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

		addProductFab: {
			color: theme.palette.common.white,
			textTransform: "capitalize",
			position: "fixed",
			bottom: theme.spacing(4),
			right: theme.spacing(1),
		},
		fabIcon: {
			marginRight: theme.spacing(1),
		},

		productForm: {
			paddingLeft: "0em",
			display: "flex",
			flexDirection: "column",
		},
		productInputContainer: {
			width: "100%",
			padding: "0em",
			display: "flex",
			flexDirection: "row",
			justifyContent: "flex-start",
			marginBottom: "2em",
		},

		productInput: {
			marginRight: "1em",
			backgroundColor: theme.palette.common.white,
		},
		lastProductInput: {
			backgroundColor: theme.palette.common.white,
		},
		descriptionInput: {
			marginBottom: "2em",
			marginRight: "1em",
			backgroundColor: theme.palette.common.white,
		},
		imageInputContainer: {
			width: "15em",
			display: "flex",
			flexWrap: "wrap",
			alignItems: "center",
			justifyContent: "center",
			marginTop: "0",
			marginRight: "0",
			marginLeft: "0",
			marginBottom: "2em",
			padding: "0",
			alignSelf: "center",
			position: "relative",
		},
		imageInput: {
			display: "none",
		},
		imageLabel: {
			alignSelf: "center",
		},
		imageButton: {
			textTransform: "capitalize",
			alignItems: "center",
		},
		imageCard: {
			maxWidth: 300,
			maxHeight: 300,
			alignSelf: "center",
			marginBottom: "2em",
		},
		addProductImage: {
			maxWidth: "inherit",
			maxHeight: "inherit",
			objectFit: "fill",
		},
		wrapper: {
			margin: 0,
			position: "relative",
			alignSelf: "center",
			marginBottom: "1em",
		},
		addProductBtn: {
			textTransform: "capitalize",
			color: theme.palette.common.white,
			width: "20em",
		},
		buttonProgress: {
			color: theme.palette.primary,
			position: "absolute",
			top: "50%",
			left: "50%",
			marginTop: -12,
			marginLeft: -13,
		},
		successMsg: {
			color: theme.palette.primary,
			position: "absolute",
			left: "20%",
			marginBottom: 10,
		},
		productCardContent: {
			padding: 0,
			paddingBottom: 0,
		},
		productCardDescription: {
			marginTop: 10,
			marginLeft: 10,
		},
		expand: {
			transform: "rotate(0deg)",
			marginLeft: "auto",
			transition: theme.transitions.create("transform", {
				duration: theme.transitions.duration.shortest,
			}),
		},
		expandOpen: {
			transform: "rotate(180deg)",
		},
		productCard: {
			borderRadius: 10,
		},
		archivedproductCard: {
			border: "solid 4px #F58634",
			borderRadius: 10,
		},
		productCardActionDiv: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "center",
			alignItems: "center",
			paddingLeft: 10,
			paddingRight: 10,
		},
		MenuIcon: {
			marginRight: theme.spacing(1),
		},
		padding: {
			paddingLeft: 10,
			paddingRight: 10,
		},
		productDescriptionWrapper: {
			marginLeft: 10,
			marginRight: 10,
		},
		productDescription: {
			paddingTop: 0,
			paddingBottom: 0,

			whiteSpace: "pre-wrap",
		},
		snackbar: {
			backgroundColor: "#f5f5f5",
		},
		backdrop: {
			zIndex: theme.zIndex.drawer + 1,
			color: "#fff",
		},
		UsersContainer: {
			display: "flex",
			marginBottom: 50,
		},
		badge: {
			color: "white",
			fontSize: 12,
			fontWeight: 550,
		},
	};
});
