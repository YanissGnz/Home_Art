import clsx from "clsx";
import axios from "axios";
import React from "react";
import { useHistory } from "react-router";
import Scrollbars from "react-custom-scrollbars";

//Redux imports
import { useDispatch, useSelector } from "react-redux";
import {
	dispatchAdminError,
	dispatchAdminLoaded,
	dispatchAdminLoading,
	dispatchLogout,
} from "../../redux/actions/authAction";
import { returnErrors } from "../../redux/actions/errAction";
import {
	productLoading,
	productsLoaded,
	productErrors,
} from "../../redux/actions/productsAction";
import { dispatchGetAllUsers } from "../../redux/actions/usersAction";

//Material-ui imports
import {
	AppBar,
	Badge,
	Button,
	CssBaseline,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Menu,
	Paper,
	Toolbar,
	Tooltip,
	Typography,
	useScrollTrigger,
	useTheme,
	withStyles,
} from "@material-ui/core";
import { useStyles } from "./useStyles";
import "./adminPanel.css";

//Icons imports
import Logo from "../../Icons/Logo";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsOffOutlinedIcon from "@material-ui/icons/NotificationsOffOutlined";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import Catalog from "../../Icons/Catalog";
import Dashboard from "../../Icons/Dashboard";
import Users from "../../Icons/Users";
import OrdersMenuIcon from "../../Icons/OrdersMenuIcon";

//Pages imports
import DashboardScreen from "./Components/Dashboard/DashboardScreen";
import ProductsScreen from "./Components/Products/ProductsScreen";
import UsersScreen from "./Components/Users/UsersScreen";
import OrdersScreen from "./Components/Orders/OrdersScreen";
import GiftCardsScreen from "./Components/GiftCards/GiftCardsScreen";
import GiftCardIcon from "../../Icons/GiftCardIcon";

//AppBar Elevation Trigger
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

//Notification Styled Menu
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

const monthNames = [
	"Janvier",
	"F??vrier ",
	"Mars",
	"Avril",
	"Mai",
	"Juin",
	"Juillet",
	"Ao??t ",
	"Septembre",
	"Octobre",
	"November",
	"Decembre",
];
const weekdayNames = [
	"Dimanche",
	"Lundi",
	"Mardi",
	"Mercredi",
	"Jeudi",
	"Vendredi",
	"Samedi",
];

//Transform date function
function transformDate(date) {
	const dateObj = new Date(date);

	const weekday = weekdayNames[dateObj.getDay()];
	const day = String(dateObj.getDate()).padStart(2, "0");
	const month = monthNames[dateObj.getMonth()];
	const year = dateObj.getFullYear();

	return `${weekday}, ${day} ${month} ${year}`;
}

export default function AdminPanel(props) {
	const classes = useStyles();
	const history = useHistory();
	const dispatch = useDispatch();
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);
	const [screen, setScreen] = React.useState(0);
	const isLoading = useSelector((state) => state.auth.isLoading);
	const productIsLoading = useSelector((state) => state.products.isLoading);
	// Get token from localstorage
	const token = useSelector((state) => state.auth.token);
	const [usersCount, setUsersCount] = React.useState([]);
	const [notifications, setNotifications] = React.useState([]);
	const [notificationAnchorEl, setNotificationAnchorEl] = React.useState(null);

	React.useEffect(() => {
		const loadAdmin = async () => {
			dispatch(dispatchAdminLoading());

			// Headers
			const config = {
				headers: {
					"x-auth-token": token,
				},
			};

			await axios
				.get("/users/load_admin", config)
				.then((res) => {
					dispatch(dispatchAdminLoaded(res));
					setNotifications(res.data.user.notifications);
				})
				.catch((err) => {
					dispatch(dispatchAdminError());
					dispatch(returnErrors(err.response.data.msg, err.response.status));
				});
			const isAuthenticated = localStorage.getItem("isAuthenticated");
			if (isAuthenticated === "false") history.push("/admin");
		};
		loadAdmin();
	}, [dispatch, history, token]);

	React.useEffect(() => {
		const loadUsers = async () => {
			dispatch(dispatchAdminLoading());

			// Headers
			const config = {
				headers: {
					"x-auth-token": token,
				},
			};

			await axios
				.get("/users/get_users", config)
				.then((res) => {
					dispatch(dispatchGetAllUsers(res.data.users));
					setUsersCount(res.data.users);
				})
				.catch((err) => {
					console.log(err);
				});
		};
		loadUsers();
	}, [dispatch, history, token]);

	React.useEffect(() => {
		const loadProduct = async () => {
			dispatch(productLoading());
			await axios
				.post("/products/get_products")
				.then((res) => {
					dispatch(productsLoaded(res));
				})
				.catch((err) => {
					dispatch(productErrors());
					console.log(err);
				});
		};
		loadProduct();
	}, [dispatch]);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const handleNotificationOpen = (event) => {
		setNotificationAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setNotificationAnchorEl(null);
	};

	const handleLogout = (event) => {
		dispatch(dispatchLogout());
		history.push("/admin");
	};

	const handleDeleteNotification = (notification) => {
		const deleteNotification = async () => {
			// Headers
			const config = {
				headers: {
					"x-auth-token": token,
				},
			};

			await axios
				.post("/users/delete_admin_notification", { notification }, config)
				.then((res) => {
					setNotifications(res.data.notifications);
				})
				.catch((err) => {
					dispatch(returnErrors(err.response.data.msg, err.response.status));
				});
		};

		deleteNotification();
	};

	return (
		<div>
			{isLoading && productIsLoading && (
				<div className="loader_div">
					<img className="loader" src="/loader.gif" alt="loader" />
				</div>
			)}
			{!isLoading && !productIsLoading && (
				<div className="panel_body">
					<CssBaseline />
					<ElevationScroll {...props}>
						<AppBar
							color="white"
							className={clsx(classes.appBar, {
								[classes.appBarShift]: open,
							})}
						>
							<Toolbar>
								<IconButton
									color="inherit"
									aria-label="open drawer"
									onClick={handleDrawerOpen}
									edge="start"
									className={clsx(classes.menuButton, {
										[classes.hide]: open,
									})}
								>
									<MenuIcon />
								</IconButton>
								<div className={classes.appBarLogo}>
									<Logo />
									<Typography variant="subtitle2">Home Art</Typography>
								</div>
								<div className={classes.searchDiv}>
									<Paper
										component="form"
										className={classes.searchPaper}
										elevation={0}
									></Paper>
								</div>
								<IconButton
									aria-label="account of current user"
									aria-controls="menu-appbar"
									aria-haspopup="true"
									onClick={handleNotificationOpen}
									color="inherit"
									style={{ marginRight: 10 }}
								>
									<Badge
										badgeContent={notifications.length}
										color="primary"
										classes={{ anchorOriginTopRightRectangle: classes.badge }}
									>
										<NotificationsNoneOutlinedIcon />
									</Badge>
								</IconButton>

								<StyledMenu
									id="customized-menu"
									anchorEl={notificationAnchorEl}
									keepMounted
									open={Boolean(notificationAnchorEl)}
									onClose={handleClose}
									PaperProps={{
										style: {
											width: 350,
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
												<Typography variant="h6">
													Pas de notification
												</Typography>
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
													<Tooltip title="Supprimer la notification">
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
								<Button
									disableRipple
									className={classes.logout_button}
									onClick={handleLogout}
								>
									Se d??connecter
								</Button>
							</Toolbar>
						</AppBar>
					</ElevationScroll>

					<Drawer
						variant="permanent"
						className={clsx(classes.drawer, {
							[classes.drawerOpen]: open,
							[classes.drawerClose]: !open,
						})}
						classes={{
							paper: clsx({
								[classes.drawerOpen]: open,
								[classes.drawerClose]: !open,
							}),
						}}
					>
						<div className={classes.toolbar}>
							<IconButton onClick={handleDrawerClose}>
								{theme.direction === "rtl" ? (
									<ChevronRightIcon />
								) : (
									<ChevronLeftIcon />
								)}
							</IconButton>
						</div>
						<Divider />
						<List>
							<ListItem
								button
								onClick={() => setScreen(0)}
								className={screen === 0 && classes.active}
								style={{ marginBottom: 5 }}
							>
								<ListItemIcon>
									<Dashboard />
								</ListItemIcon>
								<ListItemText primary="Tableau de bord" />
							</ListItem>
							<ListItem
								button
								onClick={() => setScreen(1)}
								className={screen === 1 && classes.active}
								style={{ marginBottom: 5 }}
							>
								<ListItemIcon>
									<Catalog />
								</ListItemIcon>
								<ListItemText primary="Produits" />
							</ListItem>
							<ListItem
								button
								onClick={() => setScreen(2)}
								className={screen === 2 && classes.active}
								style={{ marginBottom: 5 }}
							>
								<ListItemIcon>
									<OrdersMenuIcon />
								</ListItemIcon>
								<ListItemText primary="Commandes" />
							</ListItem>
						</List>
						<ListItem
							button
							onClick={() => setScreen(3)}
							className={screen === 3 && classes.active}
							style={{ marginBottom: 5 }}
						>
							<ListItemIcon>
								<Users />
							</ListItemIcon>
							<ListItemText primary="Utilisateur" />
						</ListItem>
						<ListItem
							button
							onClick={() => setScreen(4)}
							className={screen === 4 && classes.active}
							style={{ marginBottom: 5 }}
						>
							<ListItemIcon>
								<GiftCardIcon />
							</ListItemIcon>
							<ListItemText primary="Cartes cadeau" />
						</ListItem>
					</Drawer>
					{screen === 0 && <DashboardScreen usersCount={usersCount} />}
					{screen === 1 && <ProductsScreen />}
					{screen === 2 && <OrdersScreen />}
					{screen === 3 && <UsersScreen />}
					{screen === 4 && <GiftCardsScreen />}
				</div>
			)}
		</div>
	);
}
