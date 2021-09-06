import React, { useState } from "react";
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
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { dispatchLogout, dispatchUserError } from "../redux/actions/authAction";
import Menus from "./Menu";
import Logo from "../Icons/Logo";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import { returnErrors } from "../redux/actions/errAction";
import axios from "axios";
import { Divider } from "@material-ui/core";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import NotificationsOffOutlinedIcon from "@material-ui/icons/NotificationsOffOutlined";
import { Tooltip } from "@material-ui/core";
import Scrollbars from "react-custom-scrollbars";
import { withStyles } from "@material-ui/core";
const drawerWidth = 400;

const StyledMenu = withStyles({
	paper: {
		border: "1px solid #d3d4d5",
	},
})((props) => (
	<Menu
		elevation={5}
		getContentAnchorEl={null}
		anchorOrigin={{
			vertical: "bottom",
			horizontal: "center",
		}}
		transformOrigin={{
			vertical: "top",
			horizontal: "center",
		}}
		{...props}
	/>
));

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

const monthNames = [
	"Janvier",
	"Février ",
	"Mars",
	"Avril",
	"Mai",
	"Juin",
	"Juillet",
	"Août ",
	"Septembre",
	"Octobre",
	"November",
	"Decembre",
];
var weekdayNames = [
	"Dimanche",
	"Lundi",
	"Mardi",
	"Mercredi",
	"Jeudi",
	"Vendredi",
	"Samedi",
];

function transformDate(date) {
	const dateObj = new Date(date);

	const weekday = weekdayNames[dateObj.getDay()];
	const day = String(dateObj.getDate()).padStart(2, "0");
	const month = monthNames[dateObj.getMonth()];
	const year = dateObj.getFullYear();

	return `${weekday}, ${day} ${month} ${year}`;
}

export default function MyAppBar(props) {
	const classes = useStyles();

	// Get token from localstorage
	const token = useSelector((state) => state.auth.token);
	const history = useHistory();
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	const [cart, setCart] = React.useState(0);
	const [notifications, setNotifications] = useState([]);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [notificationAnchorEl, setNotificationAnchorEl] = React.useState(null);
	const [searchTerm, setSearchTerm] = React.useState("");

	const open = Boolean(anchorEl);

	React.useEffect(() => {
		const loadUser = async () => {
			// Headers
			const config = {
				headers: {
					"x-auth-token": token,
				},
			};

			await axios
				.get("/users/load_User", config)
				.then((res) => {
					setNotifications(res.data.user.notifications);
				})
				.catch((err) => {
					dispatch(dispatchUserError());
					dispatch(returnErrors(err.response.data.msg, err.response.status));
				});
		};
		loadUser();
	}, [dispatch, token]);

	const handleChange = (e) => {
		setSearchTerm(e.target.value);
	};

	const handleSearch = (event) => {
		event.preventDefault();
		if (searchTerm !== "") {
			history.push(`/search/${searchTerm}`);
		}
	};

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

	const handleDeleteNotification = (notification) => {
		const deleteNotification = async () => {
			// Headers
			const config = {
				headers: {
					"x-auth-token": token,
				},
			};

			await axios
				.post("/users/delete_notification", { notification }, config)
				.then((res) => {
					setNotifications(res.data.notifications);
				})
				.catch((err) => {
					dispatch(dispatchUserError());
					dispatch(returnErrors(err.response.data.msg, err.response.status));
				});
		};

		deleteNotification();
	};

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
							value={searchTerm}
							onChange={handleChange}
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
								<Badge
									badgeContent={notifications.length}
									color="primary"
									classes={{ anchorOriginTopRightRectangle: classes.badge }}
								>
									<NotificationsNoneOutlinedIcon />
								</Badge>
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

							<StyledMenu
								id="customized-menu"
								anchorEl={notificationAnchorEl}
								keepMounted
								open={Boolean(notificationAnchorEl)}
								onClose={handleClose}
								PaperProps={{
									style: {
										width: 320,
									},
								}}
							>
								<Scrollbars style={{ width: "100%", height: 320 }}>
									{notifications.length === 0 && (
										<div
											style={{
												display: "flex",
												flexDirection: "column",
												justifyContent: "center",
												alignItems: "center",
												height: "100%",
											}}
										>
											<NotificationsOffOutlinedIcon
												style={{ fontSize: 60, marginBottom: 10 }}
											/>
											<Typography variant="h6">Pas de notification</Typography>
										</div>
									)}
									{notifications.map((notification, index) => (
										<div style={{ display: "flex", flexDirection: "column" }}>
											{index !== 0 && <Divider />}
											<div
												style={{ display: "flex", alignItems: "flex-start" }}
											>
												<div style={{ width: "100%", padding: 10 }}>
													<Typography variant="body1">
														{notification.value}
													</Typography>
													<Typography variant="caption" color="textSecondary">
														{transformDate(notification.date)}
													</Typography>
												</div>
												<Tooltip title="Supprimer le notification">
													<IconButton
														size="small"
														onClick={() =>
															handleDeleteNotification(notification)
														}
														style={{ margin: 5, marginTop: 10 }}
													>
														<ClearRoundedIcon fontSize="small" />
													</IconButton>
												</Tooltip>
											</div>
										</div>
									))}
								</Scrollbars>
							</StyledMenu>
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
