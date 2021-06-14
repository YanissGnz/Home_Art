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
} from "@material-ui/core";
import { dispatchLogout } from "../redux/actions/authAction";
import { useStyles } from "../screens/HomeScreen/useStyles";
import Menus from "./Menu";
import Logo from "../Icons/Logo";
import Cart from "../Icons/Cart";
import SearchIcon from "@material-ui/icons/Search";
import { AccountCircle } from "@material-ui/icons";

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

	const open = Boolean(anchorEl);

	const handleSearch = (event) => event.preventDefault();

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
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
						<InputBase className={classes.input} placeholder="Rechercher" />
						<IconButton
							type="submit"
							className={classes.search_Button}
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
								<Cart />
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
								onClick={handleMenu}
								color="inherit"
							>
								<AccountCircle size={50} />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								open={open}
								onClose={handleClose}
							>
								<MenuItem>Profile</MenuItem>
								<MenuItem onClick={handleLogout}>Se déconnecter</MenuItem>
							</Menu>
						</div>
					)}
				</Toolbar>
			</AppBar>
		</ElevationScroll>
	);
}
