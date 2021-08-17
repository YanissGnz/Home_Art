import React from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
	AppBar,
	Badge,
	Button,
	IconButton,
	InputBase,
	Menu,
	MenuItem,
	Paper,
	Toolbar,
	Typography,
	useScrollTrigger,
	ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { dispatchLogout } from "../redux/actions/authAction";
import Menus from "./Menu";
import Logo from "../Icons/Logo";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";

const drawerWidth = 400;

const useStyles = makeStyles((theme) => {
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
		drawer: {
			width: drawerWidth,
		},
		drawerPaper: {
			width: drawerWidth,
		},
		inline: {
			display: "inline",
		},
		badge: {
			color: "white",
			fontSize: 12,
			fontWeight: 550,
		},

		iconButton: {
			padding: 5,
		},
	};
});

function ElevationScroll(props) {
	const { children } = props;

	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
	});

	return React.cloneElement(children, {
		elevation: trigger ? 4 : 0,
	});
}

export default function MyAppBar(props) {
	const classes = useStyles();

	const history = useHistory();
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	const [cart, setCart] = React.useState(0);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [notificationAnchorEl, setNotificationAnchorEl] = React.useState(null);

	const open = Boolean(anchorEl);
	const openNotificaion = Boolean(notificationAnchorEl);

	const handleSearch = (event) => event.preventDefault();

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleNotification = (event) => {
		setNotificationAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
		setNotificationAnchorEl(null);
	};

	const handleLogout = (event) => {
		dispatch(dispatchLogout());
		history.push("/login");
	};

	React.useEffect(() => {
		setCart(props.cartLength);
	}, [props]);

	return (
		<ElevationScroll {...props}>
			<AppBar color="inherit" position="sticky">
				<Toolbar className="appbar">
					<a
						style={{
							textDecoration: "none",
							color: "black",
						}}
						href="/"
					>
						<div className="Logo">
							<Logo />
							<Typography variant="subtitle2">Home Art</Typography>
						</div>
					</a>

					<Paper component="form" className={classes.paper} variant="outlined">
						<InputBase
							className={classes.input}
							placeholder="Rechercher"
							inputProps={{ "aria-label": "search" }}
						/>
						<IconButton
							type="submit"
							className={classes.iconButton}
							aria-label="search"
							onClick={handleSearch}
						>
							<SearchIcon />
						</IconButton>
					</Paper>

					{auth.isAuthenticated === "false" && <Menus />}

					<Button
						disableRipple
						startIcon={
							<Badge
								badgeContent={cart}
								color="primary"
								classes={{ anchorOriginTopRightRectangle: classes.badge }}
							>
								<ShoppingCartOutlinedIcon />
							</Badge>
						}
						className={classes.cart_button}
						onClick={() => history.push("/cart")}
					>
						Panier
					</Button>

					{auth.isAuthenticated === "true" && !auth.isAdmin && (
						<div>
							<IconButton
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleNotification}
								color="inherit"
							>
								<NotificationsNoneOutlinedIcon />
							</IconButton>

							<IconButton
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleMenu}
								color="inherit"
							>
								<AccountCircleOutlinedIcon />
							</IconButton>

							<Menu
								id="menu-appbar"
								anchorEl={notificationAnchorEl}
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "center",
								}}
								transformOrigin={{
									vertical: "bottom",
									horizontal: "center",
								}}
								keepMounted
								open={openNotificaion}
								onClose={handleClose}
							>
								<MenuItem disableRipple>
									<ListItemText primary="Sent mail" />
								</MenuItem>
							</Menu>

							<Menu
								id="menu-appbar"
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "center",
								}}
								transformOrigin={{
									vertical: "center",
									horizontal: "center",
								}}
								open={open}
								onClose={handleClose}
							>
								<MenuItem onClick={() => history.push("/profile/info")}>
									Profile
								</MenuItem>
								<MenuItem onClick={handleLogout}>Se déconnecter</MenuItem>
							</Menu>
						</div>
					)}
				</Toolbar>
			</AppBar>
		</ElevationScroll>
	);
}
