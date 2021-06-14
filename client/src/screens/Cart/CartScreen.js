import {
	Backdrop,
	Button,
	Card,
	CardActionArea,
	CardContent,
	CircularProgress,
	Container,
	Divider,
	makeStyles,
	Typography,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import EmptyCart from "../../Icons/EmptyCart";
import {
	dispatchUserError,
	dispatchUserLoaded,
	dispatchUserLoading,
} from "../../redux/actions/authAction";
import MyAppBar from "../../utils/AppBar";
import Fotter from "../../utils/Fotter";
import CartProducts from "./Components/CartProducts";

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: "#fff",
	},
}));

export default function CartScreen() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();
	const token = useSelector((state) => state.auth.token);
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const [user, setUser] = React.useState(null);

	const [cart, setCart] = useState([]);
	const [cartLength, setCartLength] = useState(cart.length);
	const [someProducts, setProducts] = useState([]);
	const [open, setOpen] = React.useState(false);

	const handleClose = () => {
		setOpen(false);
	};
	const handleToggle = () => {
		setOpen(!open);
	};

	const handleRemoveItem = async (item) => {
		handleToggle();
		// Headers
		const config = {
			headers: {
				"x-auth-token": token,
			},
		};
		await axios
			.post(`/users/remove_item_from_cart`, { item }, config)
			.then((res) => {
				setCart(res.data.newCart);
				handleClose();
			})
			.catch((err) => {
				console.log(err);
				handleClose();
			});
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
					setUser(res.data.user);
					setCart(res.data.user.cart);
				})
				.catch((err) => {
					dispatch(dispatchUserError());
				});
		};
		loadUser();
	}, [dispatch, token]);

	React.useEffect(() => {
		if (user !== null) {
			setCart(user.cart);
			setCartLength(user.cart.length);
		}
	}, [user]);

	React.useEffect(() => {
		const loadSomeProducts = async () => {
			const skip = Math.floor(Math.random() * 5);
			const limit = 5;

			const body = {
				skip: skip,
				limit: limit,
			};

			await axios
				.post("/products/get_products", body)
				.then((res) => {
					setProducts(res.data.Products);
				})
				.catch((err) => {
					console.log(err.message);
				});
		};
		loadSomeProducts();
	}, []);

	return (
		<div style={{ background: "#f1f1f1" }}>
			<MyAppBar cartLength={cartLength} />
			<Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
				<CircularProgress color="primary" />
			</Backdrop>
			{cart.length === 0 ? (
				//Hadi ki ykon l panier faregh
				<Container
					maxWidth="xl"
					style={{
						marginTop: 50,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						padding: 80,
					}}
				>
					<EmptyCart />
					<Typography
						variant="h5"
						style={{
							marginTop: 20,
							fontSize: 28,
							fontWeight: 550,
						}}
					>
						Votre panier est vide!
					</Typography>
					{isAuthenticated === "false" && (
						<div>
							<Typography
								style={{
									marginTop: 20,
									fontSize: 25,
									fontWeight: 400,
								}}
							>
								Vous avez déjà un compte?{" "}
								<a
									href="/login"
									title="Connecter vous"
									style={{ color: "#F58634" }}
								>
									Connecter vous
								</a>{" "}
								pour voir votre panier
							</Typography>
						</div>
					)}
					<Button
						variant="contained"
						color="primary"
						size="large"
						style={{
							marginTop: 30,
							width: 300,
							color: "white",
							textTransform: "none",
							fontSize: 16,
						}}
						onClick={() => history.push("/")}
					>
						Commancer vos achats
					</Button>
					<Container
						maxWidth="xl"
						style={{
							backgroundColor: "white",
							borderRadius: 20,
							padding: 20,
							marginTop: 50,
						}}
						className="main"
					>
						<Typography
							style={{ marginBottom: 10, fontWeight: 500 }}
							variant="h5"
						>
							Voir aussi
						</Typography>
						<Divider style={{ marginBottom: 10 }} />
						<div
							style={{
								display: "flex",
								width: "100%",
							}}
						></div>
					</Container>
				</Container>
			) : (
				<Container
					maxWidth="xl"
					style={{
						marginTop: 50,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						padding: 80,
					}}
				>
					<Container maxWidth="xl" style={{ display: "flex" }}>
						<Card
							style={{
								width: "100%",
								margin: 0,
							}}
							variant="outlined"
						>
							<CardContent
								style={{
									display: "flex",
									flexDirection: "row",
									position: "relative",
									height: 20,
								}}
							>
								<Typography
									style={{ width: "30%", fontSize: 22, fontWeight: 400 }}
									variant="h5"
								>
									Produit
								</Typography>
								<Typography
									style={{ width: "23%", fontSize: 22, fontWeight: 400 }}
									variant="h5"
								>
									Quantité
								</Typography>
								<Typography
									style={{ width: "23%", fontSize: 22, fontWeight: 400 }}
									variant="h5"
								>
									Prix unitaire
								</Typography>
								<Typography
									style={{
										width: "23%",
										fontSize: 22,
										fontWeight: 400,
									}}
									variant="h5"
								>
									Prix total
								</Typography>
							</CardContent>
							{cart.length > 0 &&
								cart.map((item) => (
									<CartProducts
										item={item}
										handleRemoveItem={handleRemoveItem}
									/>
								))}
						</Card>
					</Container>
					<Button
						variant="contained"
						color="primary"
						size="large"
						style={{
							marginTop: 20,
							width: 300,
							color: "white",
							textTransform: "none",
							fontSize: 16,
						}}
					>
						Valider vos achats
					</Button>
					<Container
						maxWidth="xl"
						style={{
							backgroundColor: "white",
							borderRadius: 20,
							padding: 20,
							marginTop: 50,
						}}
						className="main"
					>
						<Typography
							style={{ marginBottom: 10, fontWeight: 500 }}
							variant="h5"
						>
							Voir aussi
						</Typography>
						<Divider style={{ marginBottom: 10 }} />
						{someProducts.length === 0 && (
							<div
								style={{
									display: "flex",
									width: "100%",
									height: 400,
								}}
							>
								<Skeleton
									height="100%"
									width="19%"
									style={{
										marginRight: 15,
										marginTop: 0,
									}}
								/>
								<Skeleton
									height="100%"
									width="19%"
									style={{
										marginRight: 15,
										marginTop: 0,
									}}
								/>
								<Skeleton
									height="100%"
									width="19%"
									style={{
										marginRight: 15,
										marginTop: 0,
									}}
								/>
								<Skeleton
									height="100%"
									width="19%"
									style={{
										marginRight: 15,
										marginTop: 0,
									}}
								/>
								<Skeleton height="100%" width="19%" />
							</div>
						)}

						{someProducts.length > 0 && (
							<div
								style={{
									display: "flex",
									width: "100%",
								}}
							>
								{someProducts.length > 0 &&
									someProducts.map((element) => (
										<a
											href={`/product/${element._id}`}
											style={{
												width: "19%",
												textDecoration: "none",
												marginRight: 15,
											}}
										>
											<Card
												style={{ width: "100%", height: 300, marginRight: 30 }}
											>
												<CardActionArea
													disableRipple
													style={{ width: "100%", height: "100%" }}
												>
													<img
														style={{
															width: "100%",
															maxHeight: "200px",
															objectFit: "contain",
														}}
														src={`/uploads/${element.productImages[0]}`}
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
															{element.name}
														</Typography>
														<Typography
															style={{ fontSize: 18, fontWeight: 600 }}
															gutterBottom
															color="primary"
														>
															{[
																element.price.slice(
																	0,
																	element.price.length - 3
																),
																" ",
																element.price.slice(element.price.length - 3),
															]}{" "}
															Da
														</Typography>
													</CardContent>
												</CardActionArea>
											</Card>
										</a>
									))}
							</div>
						)}
					</Container>
				</Container>
			)}
			<Fotter />
		</div>
	);
}
