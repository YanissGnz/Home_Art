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
import {
	dispatchUserError,
	dispatchUserLoaded,
	dispatchUserLoading,
} from "../../redux/actions/authAction";
import MyAppBar from "../../utils/AppBar";
import Fotter from "../../utils/Footer";
import CartProducts from "./Components/CartProducts";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";

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
	const [totalPrice, setTotalPrice] = useState("");
	const [cartLength, setCartLength] = useState(cart.length);
	const [someProducts, setProducts] = useState([]);
	const [open, setOpen] = React.useState(false);

	const handleClose = () => {
		setOpen(false);
	};
	const handleToggle = () => {
		setOpen(!open);
	};

	const handleTotalPriceIncrease = (price) => {
		setTotalPrice((parseInt(totalPrice) + parseInt(price)).toString());
	};

	const handleTotalPriceReduce = (price) => {
		setTotalPrice((parseInt(totalPrice) - parseInt(price)).toString());
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
				setCartLength(cartLength - 1);
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
		var totalPrice = 0;
		if (cart.length !== 0) {
			// eslint-disable-next-line array-callback-return
			cart.map((item) => {
				totalPrice = totalPrice + parseInt(item.product.price) * item.quantity;
			});
			setTotalPrice(totalPrice.toString());
		}
	}, [cart]);

	React.useEffect(() => {
		const loadSomeProducts = async () => {
			const skip = Math.floor(Math.random() * 20);
			const limit = 5;

			await axios
				.post("/products/get_products", { skip, limit })
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
					<ShoppingCartOutlinedIcon style={{ fontSize: 100 }} />
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
									Sous-total
								</Typography>
							</CardContent>
							{cart.length > 0 &&
								cart.map((item) => (
									<CartProducts
										item={item}
										handleRemoveItem={handleRemoveItem}
										handleTotalPriceIncrease={handleTotalPriceIncrease}
										handleTotalPriceReduce={handleTotalPriceReduce}
									/>
								))}
							<div
								style={{
									display: "flex",
									borderTop: "1px solid grey",
									borderBottom: "1px solid grey",
									alignItems: "center",
									padding: 10,
									position: "relative",
									justifyContent: "flex-end",
								}}
							>
								<Typography
									style={{ fontSize: 28, fontWeight: 400, marginRight: 10 }}
								>
									Prix Total:{" "}
								</Typography>
								<Typography
									style={{ fontSize: 28, fontWeight: 550 }}
									color="primary"
								>
									{[
										totalPrice.slice(0, totalPrice.length - 3),
										" ",
										totalPrice.slice(totalPrice.length - 3),
										" Da",
									]}
								</Typography>
							</div>
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
				</Container>
			)}
			<Container
				maxWidth="xl"
				style={{
					backgroundColor: "white",
					borderRadius: 20,
					padding: 20,
					marginTop: 50,
					width: "85%",
				}}
			>
				<Typography style={{ marginBottom: 10, fontWeight: 500 }} variant="h5">
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
										marginRight: 20,
									}}
								>
									<Card style={{ width: "100%", height: 300, marginRight: 30 }}>
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
														element.price.slice(0, element.price.length - 3),
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

			<Fotter />
		</div>
	);
}
