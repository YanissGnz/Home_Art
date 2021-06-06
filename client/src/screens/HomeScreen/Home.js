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
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CircularProgress,
	Container,
	CssBaseline,
	Drawer,
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
import Masonry from "react-masonry-css";

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

/*For The Masonary Container*/
const breakpoints = {
	default: 5,
	1600: 4,
	1100: 3,
	700: 2,
	600: 1,
};

export default function Home(props) {
	const classes = useStyles();
	const handleSearch = (event) => event.preventDefault();

	const history = useHistory();
	const dispatch = useDispatch();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [state, setState] = React.useState({
		right: false,
	});
	const open = Boolean(anchorEl);

	// Get token from localstorage
	const token = useSelector((state) => state.auth.token);
	const auth = useSelector((state) => state.auth);
	const isLoading = useSelector((state) => state.auth.isLoading);
	const [products, setProducts] = React.useState([]);

	// product.productImages.forEach((image, index) =>
	// 	images.push(`/uploads/${product.productImages[index]}`)
	// );

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

	const toggleCart = (anchor, open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}

		setState({ right: open });
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
					dispatch(returnErrors(err.response.data.msg, err.response.status));
				});
		};
		loadUser();
	}, [dispatch, token]);

	React.useEffect(() => {
		const loadProduct = async () => {
			function shuffle(array) {
				array.sort(() => Math.random() - 0.5);
			}
			dispatch(productLoading());
			await axios
				.get("/products/get_products")
				.then(async (res) => {
					dispatch(productsLoaded(res));
					setProducts(res.data.Products);
					shuffle(products);
				})
				.catch((err) => {
					dispatch(productErrors());
					console.log(err);
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
									onClick={toggleCart("right", true)}
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
					<Drawer
						anchor={"right"}
						open={state["right"]}
						onClose={toggleCart("right", false)}
						className={classes.drawer}
						classes={{
							paper: classes.drawerPaper,
						}}
					>
						<Card className={classes.root} variant="outlined">
							<CardContent>
								<div>
									<img
										src="/uploads/Red.jpg"
										alt="product"
										className="card_image"
									/>
									<Typography gutterBottom variant="h5" component="h2">
										Product
									</Typography>
									<br />
									<Typography gutterBottom variant="h5" component="h2">
										20000 da
									</Typography>
								</div>
							</CardContent>
							<CardActions>
								<Button size="small" color="primary">
									Share
								</Button>
								<Button size="small" color="primary">
									Learn More
								</Button>
							</CardActions>
						</Card>
					</Drawer>

					{/*                          Main Home Screen (Product Page)                          */}
					<Container maxWidth="xl" className="main">
						<Container
							maxWidth="xl"
							style={{ height: 500, display: "flex", flexDirection: "row" }}
						>
							{products.map(
								(product) =>
									product.categorie === "Electroménager" && (
										<Card style={{ width: 300, height: 300, marginRight: 30 }}>
											<CardActionArea disableRipple>
												<img
													style={{ width: "100%", maxHeight: "200px" }}
													src={`/uploads/${product.productImages[0]}`}
													alt="Product"
												/>

												<CardContent>
													<Typography
														gutterBottom
														style={{ fontSize: 18, fontWeight: 500 }}
														variant="h6"
														component="h2"
														noWrap={true}
													>
														{product.name}
													</Typography>
													<Typography
														style={{ fontSize: 18, fontWeight: 600 }}
														gutterBottom
														color="primary"
													>
														{[
															product.price.slice(0, product.price.length - 3),
															" ",
															product.price.slice(product.price.length - 3),
														]}{" "}
														Da
													</Typography>
												</CardContent>
											</CardActionArea>
										</Card>
									)
							)}
						</Container>
					</Container>
				</div>
			)}
		</div>
	);
}
