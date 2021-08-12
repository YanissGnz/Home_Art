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
import { dispatchLogout } from "../redux/actions/authAction";
import { useStyles } from "../screens/HomeScreen/useStyles";
import Menus from "./Menu";
import Logo from "../Icons/Logo";
import Cart from "../Icons/Cart";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import { Autocomplete } from "@material-ui/lab";
import { List } from "@material-ui/icons";
import { ListItem } from "@material-ui/core";

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

	const [productsNames, setProductsNames] = React.useState([]);

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

					<Autocomplete
						freeSolo
						options={productsNames.map((option) => option.name)}
						style={{ width: "50%", padding: 0 }}
						renderInput={(params) => (
							<Paper
								component="form"
								className={classes.paper}
								variant="outlined"
								style={{ padding: 0 }}
							>
								<div
									ref={params.InputProps.ref}
									style={{ width: "100%", padding: 0 }}
								>
									<InputBase
										type="text"
										placeholder="Rechercher"
										{...params.inputProps}
										style={{ width: "100%", padding: 10 }}
										startAdornment={<SearchIcon style={{ paddingRight: 1 }} />}
									/>
								</div>
							</Paper>
						)}
					/>

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
