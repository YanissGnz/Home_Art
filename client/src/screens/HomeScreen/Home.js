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
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MyAppBar from "../../utils/AppBar";
import Fotter from "../../utils/Footer";
import { Skeleton } from "@material-ui/lab";
import Slider from "react-slick";
import PromotionIcon from "../../Icons/PromotionIcon";
import CouchIcon from "../../Icons/CouchIcon";
import BedIcon from "../../Icons/BedIcon";
import PlateIcon from "../../Icons/PlateIcon";
import DecorationIcon from "../../Icons/DecorationIcon";
import RobotsIcon from "../../Icons/RobotsIcon";
import PlusIcon from "../../Icons/PlusIcon";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import ProductCard from "../../utils/ProductCard";
import PackIcon from "../../Icons/PackIcon";

function SamplePrevArrow(props) {
	const { className, style, onClick } = props;
	return (
		<ArrowBackIosRoundedIcon
			className={className}
			style={{ ...style, background: "white", borderRadius: 20, padding: 3 }}
			onClick={onClick}
			color="primary"
		/>
	);
}
function SampleNextArrow(props) {
	const { className, style, onClick } = props;
	return (
		<ArrowForwardIosRoundedIcon
			className={className}
			style={{ ...style, background: "white", borderRadius: 20, padding: 3 }}
			onClick={onClick}
			color="primary"
		/>
	);
}

export default function Home(props) {
	const classes = useStyles();
	const dispatch = useDispatch();

	const settings = {
		infinite: true,
		speed: 1000,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		dots: false,
		arrows: true,
		adaptiveHeight: true,
		autoplaySpeed: 5000,
		prevArrow: <SamplePrevArrow />,
		nextArrow: <SampleNextArrow color="primary" />,
	};

	// Get token from localstorage
	const token = useSelector((state) => state.auth.token);
	const isLoading = useSelector((state) => state.auth.isLoading);
	const [newProducts, setNewProducts] = React.useState([]);
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

	React.useEffect(() => {
		const loadSomeProducts = async () => {
			const skip = 0;
			const limit = 5;

			await axios
				.post("/products/get_products", { skip, limit })
				.then((res) => {
					setNewProducts(res.data.Products);
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
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							paddingRight: 0,
							paddingLeft: 0,
							marginBottom: 10,
							height: 400,
							paddingTop: 15,
							paddingBottom: 15,
						}}
					>
						<Container
							maxWidth="xs"
							style={{
								backgroundColor: "white",
								borderRadius: 20,
								padding: 20,
								width: "20%",
								height: "100%",
							}}
						>
							<Typography
								color="primary"
								style={{ fontSize: 22, fontWeight: 550 }}
							>
								Catégorie
							</Typography>
							<a
								href="/categorie/Meuble"
								style={{
									textDecoration: "none",
									display: "flex",
									alignItems: "center",
									marginTop: 15,
								}}
							>
								<CouchIcon />
								<Typography
									style={{
										marginLeft: 10,
										color: "black",
										textDecoration: "none",
										fontSize: 16,
										fontWeight: 450,
									}}
								>
									Meuble
								</Typography>
							</a>
							<a
								href="/categorie/Literie"
								style={{
									textDecoration: "none",
									display: "flex",
									alignItems: "center",
									marginTop: 15,
								}}
							>
								<BedIcon />
								<Typography
									style={{
										marginLeft: 10,
										color: "black",
										textDecoration: "none",
										fontSize: 16,
										fontWeight: 450,
									}}
								>
									Literie
								</Typography>
							</a>
							<a
								href="/categorie/Vaisselle"
								style={{
									textDecoration: "none",
									display: "flex",
									alignItems: "center",
									marginTop: 15,
								}}
							>
								<PlateIcon />
								<Typography
									style={{
										marginLeft: 10,
										color: "black",
										textDecoration: "none",
										fontSize: 16,
										fontWeight: 450,
									}}
								>
									Vaisselle
								</Typography>
							</a>
							<a
								href="/categorie/Décoration"
								style={{
									textDecoration: "none",
									display: "flex",
									alignItems: "center",
									marginTop: 15,
								}}
							>
								<DecorationIcon />
								<Typography
									style={{
										marginLeft: 10,
										color: "black",
										textDecoration: "none",
										fontSize: 16,
										fontWeight: 450,
									}}
								>
									Décoration
								</Typography>
							</a>

							<a
								href="/categorie/Robots"
								style={{
									textDecoration: "none",
									display: "flex",
									alignItems: "center",
									marginTop: 15,
								}}
							>
								<RobotsIcon />
								<Typography
									style={{
										marginLeft: 10,
										color: "black",
										textDecoration: "none",
										fontSize: 16,
										fontWeight: 450,
									}}
								>
									Robots
								</Typography>
							</a>
							<a
								href="/categorie/Autre"
								style={{
									textDecoration: "none",
									display: "flex",
									alignItems: "center",
									marginTop: 15,
								}}
							>
								<PlusIcon />
								<Typography
									style={{
										marginLeft: 10,
										color: "black",
										textDecoration: "none",
										fontSize: 16,
										fontWeight: 450,
									}}
								>
									Autre
								</Typography>
							</a>
						</Container>
						<Container
							maxWidth="lg"
							style={{
								paddingRight: 20,
								paddingLeft: 20,
								width: "60%",
								marginRight: 10,
								marginLeft: 10,
								height: "100%",
							}}
						>
							<Slider {...settings}>
								{newProducts.map((product) => (
									<a
										href={`/product/${product._id}`}
										style={{
											width: "19%",
											textDecoration: "none",
											marginRight: 15,
										}}
									>
										<Card
											style={{
												width: "100%",
												height: "370px",
												marginRight: 30,
											}}
										>
											<CardActionArea
												disableRipple
												style={{
													width: "100%",
													height: "100%",
													position: "relative",
												}}
											>
												<img
													style={{
														width: "100%",
														maxHeight: "100%",
														objectFit: "contain",
													}}
													src={`/uploads/${product.productImages[0]}`}
													alt="Product"
												/>

												<CardContent
													style={{
														position: "absolute",
														bottom: 0,
														width: "100%",
													}}
												>
													<Typography
														gutterBottom
														style={{
															fontSize: 22,
															fontWeight: 600,
															textDecoration: "none",
														}}
														noWrap={true}
														className="slider-txt"
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
									</a>
								))}
							</Slider>
						</Container>
						<Container
							maxWidth="sm"
							style={{
								backgroundColor: "white",
								borderRadius: 20,
								padding: 20,
								width: "20%",
								height: "100%",
							}}
						>
							<Typography
								color="primary"
								style={{ fontSize: 22, fontWeight: 550 }}
							>
								Offre et Promotion
							</Typography>
							<a
								href="/categorie/Meuble"
								style={{
									textDecoration: "none",
									display: "flex",
									alignItems: "center",
									marginTop: 15,
								}}
							>
								<PromotionIcon />
								<Typography
									style={{
										marginLeft: 10,
										color: "black",
										textDecoration: "none",
										fontSize: 16,
										fontWeight: 450,
									}}
								>
									Offre et promotion
								</Typography>
							</a>
							<a
								href="/categorie/Meuble"
								style={{
									textDecoration: "none",
									display: "flex",
									alignItems: "center",
									marginTop: 15,
								}}
							>
								<PackIcon />
								<Typography
									style={{
										marginLeft: 10,
										color: "black",
										textDecoration: "none",
										fontSize: 16,
										fontWeight: 450,
									}}
								>
									Pack
								</Typography>
							</a>
						</Container>
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
								Nouveauté
							</Typography>
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
						{newProducts.length > 0 && (
							<div
								style={{
									display: "flex",
									width: "100%",
								}}
							>
								{newProducts.map((product) => (
									<ProductCard product={product} />
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
								{meubleProducts.map((product) => (
									<ProductCard product={product} />
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
								{literieProducts.map((product) => (
									<ProductCard product={product} />
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
								{decorationProducts.map((product) => (
									<ProductCard product={product} />
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
								{vaisselleProducts.map((product) => (
									<ProductCard product={product} />
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
								{robotsProducts.map((product) => (
									<ProductCard product={product} />
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
