import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { productErrors } from "../../redux/actions/productsAction";
import {
	Breadcrumbs,
	Container,
	CssBaseline,
	IconButton,
	Typography,
	Divider,
	Card,
	CardActionArea,
	CardContent,
	Button,
} from "@material-ui/core";

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import {
	dispatchUserError,
	dispatchUserLoaded,
	dispatchUserLoading,
} from "../../redux/actions/authAction";
import { returnErrors } from "../../redux/actions/errAction";

import "./index.css";
import { Rating, Skeleton } from "@material-ui/lab";
import MyAppBar from "../../utils/AppBar";
import CommentIcon from "../../Icons/CommentsIcon";
import Fotter from "../../utils/Fotter";
import AddToCart from "../../Icons/AddToCartIcon";

export default function ProductDetails(props) {
	const dispatch = useDispatch();
	const token = useSelector((state) => state.auth.token);

	const product_Id = props.match.params.productId;
	const [product, setProduct] = React.useState({});
	const [similaireProducts, setSimilaireProducts] = React.useState([]);
	const [productImages, setProductImages] = React.useState([]);
	const [ratingValue, setRatingValue] = React.useState(4.5);
	const [isLoading, setIsLoading] = React.useState(false);

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
			setIsLoading(true);
			await axios
				.get(`/products/get_product_by_id?id=${product_Id}&type=single`)
				.then((res) => {
					setProduct(res.data.product[0]);
					setProductImages(res.data.product[0].productImages);
					setIsLoading(false);
				})
				.catch((err) => {
					dispatch(productErrors(err));
					console.log(err);
					setIsLoading(false);
				});
		};
		loadProduct();
	}, [dispatch, product_Id]);
	React.useEffect(() => {
		const loadSimilaireProducts = async () => {
			setIsLoading(true);

			await axios
				.get(
					`/products/get_similaire_products?categorie=${product.categorie}&type=single`
				)
				.then((res) => {
					setSimilaireProducts(res.data.products);
					setIsLoading(false);
				})
				.catch((err) => {
					dispatch(productErrors(err));
					console.log(err);
					setIsLoading(false);
				});
		};
		loadSimilaireProducts();
	}, [dispatch, product]);

	const images = [];
	console.log(similaireProducts);
	productImages.forEach((image, index) =>
		images.push({
			original: `/uploads/${productImages[index]}`,
			thumbnail: `/uploads/${productImages[index]}`,
		})
	);

	const properties = {
		useBrowserFullscreen: false,
		showPlayButton: false,
	};

	return (
		<div style={{ backgroundColor: "#f1f1f1" }}>
			<CssBaseline />
			<MyAppBar />
			<Container maxWidth="lg" style={{ marginTop: 50 }}>
				<Breadcrumbs
					separator={<NavigateNextIcon fontSize="small" />}
					aria-label="breadcrumb"
					style={{
						marginLeft: 10,
					}}
				>
					<a
						style={{ textDecoration: "none", color: "black", fontWeight: 450 }}
						href="/"
					>
						Accueil
					</a>
					<a
						style={{ textDecoration: "none", color: "black", fontWeight: 450 }}
						href={`/categorie/${product.categorie}`}
					>
						{product.categorie}
					</a>
					<Typography color="textSecondary">{product.name}</Typography>
				</Breadcrumbs>
				<Container
					maxWidth="lg"
					style={{
						backgroundColor: "white",
						display: "flex",
						borderRadius: 20,
						height: 800,
					}}
					className="main"
				>
					<Container style={{ width: 600, margin: 20 }}>
						{isLoading ? (
							<Skeleton height="600px" />
						) : (
							<ImageGallery
								className="image-gallery-slide"
								items={images}
								{...properties}
							/>
						)}
					</Container>
					<Container
						maxWidth="sm"
						style={{
							position: "relative",
							height: "100%",
							width: 600,
							display: "flex",
							flexDirection: "column",
						}}
					>
						<IconButton
							style={{ position: "absolute", right: 0, top: 10 }}
							size="medium"
						>
							<FavoriteBorderIcon fontSize="inherit" />
						</IconButton>

						<Typography
							style={{ marginTop: 50, marginBottom: 15, fontWeight: 500 }}
							variant="h5"
						>
							{isLoading ? <Skeleton width="50%" /> : product.name}
						</Typography>
						<Typography style={{ marginBottom: 20, fontWeight: 400 }}>
							{isLoading ? (
								<Skeleton width="50%" />
							) : (
								"Marque: " + product.brand
							)}
						</Typography>
						<div
							style={{
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "flex-start",
								marginBottom: 10,
							}}
						>
							<Rating
								style={{ marginRight: 10 }}
								defaultValue={ratingValue}
								precision={0.5}
								readOnly
							/>
							<Typography
								variant="subtitle1
							"
								color="primary"
							>
								1 avis
							</Typography>
						</div>
						<Divider style={{ marginBottom: 10 }} />
						<Typography style={{ marginBottom: 10 }} variant="h6">
							{isLoading ? <Skeleton width="50%" /> : product.price + " Da"}
						</Typography>
						<Button
							color="primary"
							variant="contained"
							size="large"
							fullWidth
							startIcon={<AddToCart />}
							style={{
								alignSelf: "center",
								color: "white",
								textTransform: "none",
								marginTop: 50,
							}}
						>
							Ajouter au panier
						</Button>
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
					<Typography
						style={{ marginBottom: 10, fontWeight: 500 }}
						variant="h5"
					>
						Desciption
					</Typography>
					<Divider style={{ marginBottom: 10 }} />

					<Typography
						style={{ marginBottom: 50, fontSize: 18, whiteSpace: "pre-wrap" }}
						variant="body1"
					>
						{isLoading ? (
							<div>
								<Skeleton width="50%" /> <Skeleton width="50%" />{" "}
								<Skeleton width="50%" />{" "}
							</div>
						) : (
							product.description
						)}
					</Typography>
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
					<Typography
						style={{ marginBottom: 10, fontWeight: 500 }}
						variant="h5"
					>
						Produit simulaire
					</Typography>
					<Divider style={{ marginBottom: 10 }} />
					<div
						style={{
							display: "flex",
							width: "100%",
						}}
					>
						{similaireProducts.map(
							(element) =>
								product._id !== element._id && (
									<a
										href={`/product/${element._id}`}
										style={{ width: "22%", textDecoration: "none" }}
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
								)
						)}
					</div>
				</Container>
				<Container
					maxWidth="lg"
					style={{
						backgroundColor: "white",
						borderRadius: 20,
						display: "grid",
						padding: 20,
					}}
					className="main"
				>
					<Typography
						style={{ marginBottom: 10, fontWeight: 500 }}
						variant="h5"
					>
						Commantaire et Avis
					</Typography>
					<Divider style={{ marginBottom: 10 }} />
					<div style={{ display: "flex", width: "100%" }}>
						<div style={{ width: "25%" }}>
							<Typography variant="h6">Évaliations</Typography>
							<div
								style={{
									width: "80%",
									height: 200,
									display: "flex",
									flexDirection: "column",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<Typography
									variant="h6"
									color="primary"
									style={{ fontSize: 25, fontWeight: 500, marginBottom: 5 }}
								>
									{ratingValue}/5
								</Typography>
								<Rating
									style={{ marginRight: 10 }}
									defaultValue={ratingValue}
									precision={0.5}
									onChange={(e, v) => {
										e.preventDefault();
										setRatingValue(v);
									}}
								/>
								<Typography
									variant="h6"
									color="primary"
									style={{ fontSize: 16, fontWeight: 450, marginTop: 5 }}
								>
									1 avis
								</Typography>
							</div>
						</div>
						<div style={{ width: "70%" }}>
							<Typography variant="h6">Commantaire</Typography>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									justifyContent: "center",
									alignItems: "center",
									marginTop: 30,
									marginBottom: 30,
								}}
							>
								<div style={{ marginBottom: 20 }}>
									<CommentIcon />
								</div>
								<Typography variant="h6">
									Ce produit n'a pas encore de commentaires.{" "}
								</Typography>
							</div>
						</div>
					</div>
				</Container>
			</Container>
			<Fotter />
		</div>
	);
}
