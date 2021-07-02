import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	dispatchUserError,
	dispatchUserLoaded,
	dispatchUserLoading,
} from "../../redux/actions/authAction";
import {
	Card,
	CardActionArea,
	CardContent,
	CircularProgress,
	Container,
	CssBaseline,
	Divider,
	Typography,
} from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { useStyles } from "./useStyles";
import axios from "axios";
import { returnErrors } from "../../redux/actions/errAction";
import "./Home.css";

import MyAppBar from "../../utils/AppBar";
import Fotter from "../../utils/Footer";
import { Skeleton } from "@material-ui/lab";

export default function Home(props) {
	const classes = useStyles();

	const dispatch = useDispatch();

	// Get token from localstorage
	const token = useSelector((state) => state.auth.token);
	const isLoading = useSelector((state) => state.auth.isLoading);
	const [meubleProducts, setMeubleProducts] = React.useState([]);
	const [literieProducts, setLiterieProducts] = React.useState([]);
	const [decorationProducts, setDecorationProducts] = React.useState([]);
	const [robotsProducts, setRobotsProducts] = React.useState([]);
	const [vaisselleProducts, setVaisselleProducts] = React.useState([]);
	const [user, setUser] = React.useState(null);

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
				})
				.catch((err) => {
					dispatch(dispatchUserError());
					dispatch(returnErrors(err.response.data.msg, err.response.status));
				});
		};
		loadUser();
	}, [dispatch, token]);

	React.useEffect(() => {
		const loadSomeProducts = async () => {
			const skip = 0; //Pour la version finale  Math.floor(Math.random() * 5);
			const limit = 5;

			await axios
				.post(
					`/products/get_products_by_categorie?categorie=${"Meuble"}&type=single`,
					{ skip, limit }
				)
				.then((res) => {
					setMeubleProducts(res.data.products);
				})
				.catch((err) => {
					console.log(err.message);
				});
		};
		loadSomeProducts();
	}, []);

	React.useEffect(() => {
		const loadSomeProducts = async () => {
			const skip = 0; //Pour la version finale  Math.floor(Math.random() * 5);
			const limit = 5;

			await axios
				.post(
					`/products/get_products_by_categorie?categorie=${"Literie"}&type=single`,
					{ skip, limit }
				)
				.then((res) => {
					setLiterieProducts(res.data.products);
				})
				.catch((err) => {
					console.log(err.message);
				});
		};
		loadSomeProducts();
	}, []);

	React.useEffect(() => {
		const loadSomeProducts = async () => {
			const skip = 0; //Pour la version finale  Math.floor(Math.random() * 5);
			const limit = 5;

			await axios
				.post(
					`/products/get_products_by_categorie?categorie=${"Vaisselle"}&type=single`,
					{ skip, limit }
				)
				.then((res) => {
					setVaisselleProducts(res.data.products);
				})
				.catch((err) => {
					console.log(err.message);
				});
		};
		loadSomeProducts();
	}, []);

	React.useEffect(() => {
		const loadSomeProducts = async () => {
			const skip = 0; //Pour la version finale  Math.floor(Math.random() * 5);
			const limit = 5;

			await axios
				.post(
					`/products/get_products_by_categorie?categorie=${"Décoration"}&type=single`,
					{ skip, limit }
				)
				.then((res) => {
					setDecorationProducts(res.data.products);
				})
				.catch((err) => {
					console.log(err.message);
				});
		};
		loadSomeProducts();
	}, []);

	React.useEffect(() => {
		const loadSomeProducts = async () => {
			const skip = 0; //Pour la version finale  Math.floor(Math.random() * 5);
			const limit = 5;

			await axios
				.post(
					`/products/get_products_by_categorie?categorie=${"Robots"}&type=single`,
					{ skip, limit }
				)
				.then((res) => {
					setRobotsProducts(res.data.products);
				})
				.catch((err) => {
					console.log(err.message);
				});
		};
		loadSomeProducts();
	}, []);

	return (
		<div>
			{isLoading && (
				<CircularProgress size={80} thickness={5} className={classes.loader} />
			)}
			{!isLoading && (
				<div className="home_body">
					<CssBaseline />
					<MyAppBar cartLength={user ? user.cart.length : 0} />
					<Container
						maxWidth="lg"
						style={{
							backgroundColor: "white",
							borderRadius: 20,
							padding: 20,
						}}
						className="main"
					>
						<div style={{ display: "flex" }}>
							<Typography
								style={{ marginBottom: 10, fontWeight: 500, flexGrow: 1 }}
								variant="h5"
							>
								Meuble
							</Typography>
							<a
								href={`/categorie/Meuble`}
								style={{
									textDecoration: "none",
									display: "flex",
									alignItems: "center",
								}}
							>
								<Typography
									style={{ fontWeight: 400, marginRight: 5 }}
									variant="h6"
									color="textPrimary"
								>
									Voir Plus
								</Typography>
								<ArrowForwardIosIcon style={{ color: "black", fontSize: 18 }} />
							</a>
						</div>
						<Divider style={{ marginBottom: 10 }} />
						{meubleProducts.length === 0 && (
							<div
								style={{
									display: "flex",
									width: "100%",
									height: 250,
								}}
							>
								<Skeleton
									height="100%"
									width="19%"
									style={{
										marginRight: 15,
										transform: "none",
									}}
								/>

								<Skeleton
									height="100%"
									width="19%"
									style={{
										marginRight: 15,
										transform: "none",
									}}
								/>
								<Skeleton
									height="100%"
									width="19%"
									style={{
										marginRight: 15,
										transform: "none",
									}}
								/>
								<Skeleton
									height="100%"
									width="19%"
									style={{
										marginRight: 15,
										transform: "none",
									}}
								/>
								<Skeleton
									height="100%"
									width="19%"
									style={{
										transform: "none",
									}}
								/>
							</div>
						)}
						{meubleProducts.length > 0 && (
							<div
								style={{
									display: "flex",
									width: "100%",
								}}
							>
								{meubleProducts.map((element) => (
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

					<Container
						maxWidth="lg"
						style={{
							backgroundColor: "white",
							borderRadius: 20,
							padding: 20,
						}}
						className="main"
					>
						<div style={{ display: "flex" }}>
							<Typography
								style={{ marginBottom: 10, fontWeight: 500, flexGrow: 1 }}
								variant="h5"
							>
								Literie
							</Typography>
							<a
								href={`/categorie/Literie`}
								style={{
									textDecoration: "none",
									display: "flex",
									alignItems: "center",
								}}
							>
								<Typography
									style={{ fontWeight: 400, marginRight: 5 }}
									variant="h6"
									color="textPrimary"
								>
									Voir Plus
								</Typography>
								<ArrowForwardIosIcon style={{ color: "black", fontSize: 18 }} />
							</a>
						</div>
						<Divider style={{ marginBottom: 10 }} />
						{literieProducts.length === 0 && (
							<div
								style={{
									display: "flex",
									width: "100%",
									height: 250,
								}}
							>
								<Skeleton
									height="100%"
									width="19%"
									style={{
										marginRight: 15,
										transform: "none",
									}}
								/>
								<Skeleton
									height="100%"
									width="19%"
									style={{
										marginRight: 15,
										transform: "none",
									}}
								/>
								<Skeleton
									height="100%"
									width="19%"
									style={{
										marginRight: 15,
										transform: "none",
									}}
								/>
								<Skeleton
									height="100%"
									width="19%"
									style={{
										marginRight: 15,
										transform: "none",
									}}
								/>
								<Skeleton
									height="100%"
									width="19%"
									style={{
										transform: "none",
									}}
								/>{" "}
							</div>
						)}
						{literieProducts.length > 0 && (
							<div
								style={{
									display: "flex",
									width: "100%",
								}}
							>
								{literieProducts.map((element) => (
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

					<Container
						maxWidth="lg"
						style={{
							backgroundColor: "white",
							borderRadius: 20,
							padding: 20,
						}}
						className="main"
					>
						<div style={{ display: "flex" }}>
							<Typography
								style={{ marginBottom: 10, fontWeight: 500, flexGrow: 1 }}
								variant="h5"
							>
								Décoration
							</Typography>
							<a
								href={`/categorie/Décoration`}
								style={{
									textDecoration: "none",
									display: "flex",
									alignItems: "center",
								}}
							>
								<Typography
									style={{ fontWeight: 400, marginRight: 5 }}
									variant="h6"
									color="textPrimary"
								>
									Voir Plus
								</Typography>
								<ArrowForwardIosIcon style={{ color: "black", fontSize: 18 }} />
							</a>
						</div>
						<Divider style={{ marginBottom: 10 }} />
						{decorationProducts.length === 0 && (
							<div
								style={{
									display: "flex",
									width: "100%",
									height: 250,
								}}
							>
								<Skeleton
									height="100%"
									width="19%"
									style={{
										marginRight: 15,
										transform: "none",
									}}
								/>
								<Skeleton
									height="100%"
									width="19%"
									style={{
										marginRight: 15,
										transform: "none",
									}}
								/>
								<Skeleton
									height="100%"
									width="19%"
									style={{
										marginRight: 15,
										transform: "none",
									}}
								/>
								<Skeleton
									height="100%"
									width="19%"
									style={{
										marginRight: 15,
										transform: "none",
									}}
								/>
								<Skeleton
									height="100%"
									width="19%"
									style={{
										transform: "none",
									}}
								/>
							</div>
						)}
						{decorationProducts.length > 0 && (
							<div
								style={{
									display: "flex",
									width: "100%",
								}}
							>
								{decorationProducts.map((element) => (
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

					<Container
						maxWidth="lg"
						style={{
							backgroundColor: "white",
							borderRadius: 20,
							padding: 20,
						}}
						className="main"
					>
						<div style={{ display: "flex" }}>
							<Typography
								style={{ marginBottom: 10, fontWeight: 500, flexGrow: 1 }}
								variant="h5"
							>
								Vaisselle
							</Typography>
							<a
								href={`/categorie/Vaisselle`}
								style={{
									textDecoration: "none",
									display: "flex",
									alignItems: "center",
								}}
							>
								<Typography
									style={{ fontWeight: 400, marginRight: 5 }}
									variant="h6"
									color="textPrimary"
								>
									Voir Plus
								</Typography>
								<ArrowForwardIosIcon style={{ color: "black", fontSize: 18 }} />
							</a>
						</div>
						<Divider style={{ marginBottom: 10 }} />
						{vaisselleProducts.length === 0 && (
							<div
								style={{
									display: "flex",
									width: "100%",
									height: 250,
								}}
							>
								<Skeleton
									height="100%"
									width="19%"
									style={{
										marginRight: 15,
										transform: "none",
									}}
								/>
								<Skeleton
									height="100%"
									width="19%"
									style={{
										marginRight: 15,
										transform: "none",
									}}
								/>
								<Skeleton
									height="100%"
									width="19%"
									style={{
										marginRight: 15,
										transform: "none",
									}}
								/>
								<Skeleton
									height="100%"
									width="19%"
									style={{
										marginRight: 15,
										transform: "none",
									}}
								/>
								<Skeleton
									height="100%"
									width="19%"
									style={{
										transform: "none",
									}}
								/>
							</div>
						)}
						{vaisselleProducts.length > 0 && (
							<div
								style={{
									display: "flex",
									width: "100%",
								}}
							>
								{vaisselleProducts.map((element) => (
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

					<Container
						maxWidth="lg"
						style={{
							backgroundColor: "white",
							borderRadius: 20,
							padding: 20,
						}}
						className="main"
					>
						<div style={{ display: "flex" }}>
							<Typography
								style={{ marginBottom: 10, fontWeight: 500, flexGrow: 1 }}
								variant="h5"
							>
								Robots
							</Typography>
							<a
								href={`/categorie/Robots`}
								style={{
									textDecoration: "none",
									display: "flex",
									alignItems: "center",
								}}
							>
								<Typography
									style={{ fontWeight: 400, marginRight: 5 }}
									variant="h6"
									color="textPrimary"
								>
									Voir Plus
								</Typography>
								<ArrowForwardIosIcon style={{ color: "black", fontSize: 18 }} />
							</a>
						</div>
						<Divider style={{ marginBottom: 10 }} />
						{robotsProducts.length === 0 && (
							<div
								style={{
									display: "flex",
									width: "100%",
									height: 250,
								}}
							>
								<Skeleton
									height="100%"
									width="19%"
									style={{
										marginRight: 15,
										transform: "none",
									}}
								/>
								<Skeleton
									height="100%"
									width="19%"
									style={{
										marginRight: 15,
										transform: "none",
									}}
								/>
								<Skeleton
									height="100%"
									width="19%"
									style={{
										marginRight: 15,
										transform: "none",
									}}
								/>
								<Skeleton
									height="100%"
									width="19%"
									style={{
										marginRight: 15,
										transform: "none",
									}}
								/>
								<Skeleton
									height="100%"
									width="19%"
									style={{
										transform: "none",
									}}
								/>
							</div>
						)}
						{robotsProducts.length > 0 && (
							<div
								style={{
									display: "flex",
									width: "100%",
								}}
							>
								{robotsProducts.map((element) => (
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
			)}
		</div>
	);
}
