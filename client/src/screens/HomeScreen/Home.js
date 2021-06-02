import React from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
	dispatchUserError,
	dispatchUserLoaded,
	dispatchUserLoading,
	dispatchLogout,
} from "../../redux/actions/authAction";
import {
	AppBar,
	Button,
	CircularProgress,
	Container,
	CssBaseline,
	IconButton,
	InputBase,
	Menu,
	MenuItem,
	Paper,
	Toolbar,
	Typography,
	useScrollTrigger,
} from "@material-ui/core";

import { useStyles } from "./useStyles";
import axios from "axios";
import { returnErrors } from "../../redux/actions/errAction";
import "./Home.css";
import Logo from "../../Icons/Logo";
import SearchIcon from "@material-ui/icons/Search";
import Cart from "../../Icons/Cart";
import Menus from "./Menu";
import { AccountCircle } from "@material-ui/icons";
import {
	productErrors,
	productLoading,
	productsLoaded,
} from "../../redux/actions/productsAction";

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

export default function Home(props) {
	const classes = useStyles();
	const handleSearch = (event) => event.preventDefault();

	const history = useHistory();
	const dispatch = useDispatch();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	// Get token from localstorage
	const token = useSelector((state) => state.auth.token);
	const auth = useSelector((state) => state.auth);
	const isLoading = useSelector((state) => state.auth.isLoading);

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
		const loadUser = async () => {
			dispatch(dispatchUserLoading());

			// Headers
			const config = {
				headers: {
					"x-auth-token": token,
				},
			};

			await axios
				.get("/users/load_User", config)
				.then((res) => {
					dispatch(dispatchUserLoaded(res));
				})
				.catch((err) => {
					dispatch(dispatchUserError());
					returnErrors(err.response.data.msg, err.response.status);
				});
		};
		loadUser();
	}, [dispatch, token]);

	React.useEffect(() => {
		const loadProduct = async () => {
			dispatch(productLoading());

			await axios
				.get("/products/get_products")
				.then((res) => {
					dispatch(productsLoaded(res));
				})
				.catch((err) => {
					dispatch(productErrors());
					console.log(err);
					//dispatch(returnErrors(err.response.data.msg, err.response.status));
				});
		};
		loadProduct();
	}, [dispatch]);

	return (
		<div>
			{isLoading && (
				<CircularProgress size={80} thickness={5} className={classes.loader} />
			)}

			{!isLoading && (
				<div className="home_body">
					<CssBaseline />
					<ElevationScroll {...props}>
						<AppBar color="white" position="sticky">
							<Toolbar className="appbar">
								<div className="Logo">
									<Logo />
									<Typography variant="subtitle2">Home Art</Typography>
								</div>

								<Paper
									component="form"
									className={classes.paper}
									variant="outlined"
								>
									<InputBase
										className={classes.input}
										placeholder="Rechercher"
									/>
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
									startIcon={<Cart />}
									className={classes.cart_button}
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
											<AccountCircle />
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

					<Container maxWidth="xl" className="main"></Container>
				</div>
			)}
		</div>
	);
}
