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
	Tooltip,
	Snackbar,
} from "@material-ui/core";
import Zoom from "@material-ui/core/Zoom";
import MuiAlert from "@material-ui/lab/Alert";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import {
	dispatchUserError,
	dispatchUserLoaded,
	dispatchUserLoading,
} from "../../redux/actions/authAction";

import "./index.css";
import { Rating, Skeleton } from "@material-ui/lab";
import MyAppBar from "../../utils/AppBar";
import CommentIcon from "../../Icons/CommentsIcon";
import Fotter from "../../utils/Fotter";
import AddToCart from "../../Icons/AddToCartIcon";
import HeartIcon from "../../Icons/HeartIcon";
import ActiveHeartIcon from "../../Icons/ActiveHeartIcon";

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ProductDetails(props) {
	const dispatch = useDispatch();
	const token = useSelector((state) => state.auth.token);
	const user = useSelector((state) => state.auth.user);

	const product_Id = props.match.params.productId;
	const [product, setProduct] = React.useState({});
	const [similaireProducts, setSimilaireProducts] = React.useState([]);

	const [productImages, setProductImages] = React.useState([]);
	const [ratingValue, setRatingValue] = React.useState(0);
	const [ratingsNumber, setRatingsNumber] = React.useState(0);
	const [isLoading, setIsLoading] = React.useState(false);
	const [favorite, setFavorite] = React.useState(
		user ? user.favoriteProducts.indexOf(product_Id) !== -1 : false
	);
	const [msg, setMsg] = React.useState("");
	const [alertOpen, setAlertOpen] = React.useState(false);
	const [alertType, setAlertType] = React.useState("");
	const [comments, setComments] = React.useState([]);

	const handleAlertOpen = () => {
		setAlertOpen(true);
	};
	const handleAlertClose = () => {
		setAlertOpen(false);
	};

	const handleFavorites = async () => {
		// Headers
		const config = {
			headers: {
				"x-auth-token": token,
			},
		};

		if (user === null) {
			setAlertOpen(true);
			setMsg("Vous devez ètre connecter!");
			setAlertType("error");
		} else if (favorite) {
			await axios
				.post(`/users/remove_from_favorite/${product_Id}`, null, config)
				.then((res) => {
					// favoriteProducts.push(product_Id);
					setFavorite(false);
					setMsg(res.data.msg);
					setAlertType("success");
					handleAlertOpen();
				})
				.catch((err) => {
					console.log(err.message);
					setFavorite(true);
				});
		} else {
			await axios
				.post(`/users/add_to_favorite/${product_Id}`, null, config)
				.then((res) => {
					// favoriteProducts.push(product_Id);
					setFavorite(true);
					setMsg(res.data.msg);
					setAlertType("success");
					handleAlertOpen();
				})
				.catch((err) => {
					console.log(err.message);
					setFavorite(false);
				});
		}
	};

	const handleRating = async (event, value) => {
		event.preventDefault();
		// Headers
		const config = {
			headers: {
				"x-auth-token": token,
			},
		};

		await axios
			.post(
				`/products/update_rating?id=${product_Id}&type=single`,
				{ value },
				config
			)
			.then((res) => {
				setRatingsNumber(res.data.newRatingNumber);
				setRatingValue(
					(5 * res.data.rating[4] +
						4 * res.data.rating[3] +
						3 * res.data.rating[2] +
						2 * res.data.rating[1] +
						1 * res.data.rating[0]) /
						(res.data.rating[0] +
							res.data.rating[1] +
							res.data.rating[2] +
							res.data.rating[3] +
							res.data.rating[4])
				);
			})
			.catch((err) => {
				console.log(err);
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
					setFavorite(
						res.data.user.favoriteProducts.indexOf(product_Id) !== -1
					);
				})
				.catch((err) => {
					dispatch(dispatchUserError());
				});
		};
		loadUser();
	}, [dispatch, token, product_Id]);

	React.useEffect(() => {
		const loadProduct = async () => {
			setIsLoading(true);
			await axios
				.get(`/products/get_product_by_id?id=${product_Id}&type=single`)
				.then((res) => {
					const rating = res.data.product[0].rating;
					console.log(rating);
					setProduct(res.data.product[0]);
					setProductImages(res.data.product[0].productImages);
					setIsLoading(false);
					setRatingValue(
						(5 * rating[4] +
							4 * rating[3] +
							3 * rating[2] +
							2 * rating[1] +
							1 * rating[0]) /
							(rating[0] + rating[1] + rating[2] + rating[3] + rating[4])
					);
					setComments(res.data.product[0].comments);
					setRatingsNumber(res.data.product[0].ratingsNumber);
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
				<Snackbar
					open={alertOpen}
					autoHideDuration={2500}
					onClose={handleAlertClose}
				>
					<Alert severity={alertType}>
						<Typography>{msg}</Typography>
					</Alert>
				</Snackbar>
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
						<Tooltip
							title={
								favorite
									? "Supprimer du produit favoris"
									: "Ajouter au produit favoris"
							}
							aria-label="add"
							placement="left"
							TransitionComponent={Zoom}
							style={{ fontSize: 16 }}
						>
							<IconButton
								style={{ position: "absolute", right: 0, top: 10 }}
								size="medium"
								onClick={handleFavorites}
							>
								{favorite ? <ActiveHeartIcon /> : <HeartIcon />}
							</IconButton>
						</Tooltip>

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
								value={ratingValue.toFixed(2)}
								precision={0.5}
								readOnly
							/>

							<Typography
								variant="subtitle1
							"
								color="primary"
							>
								{ratingsNumber} Avis
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
										style={{
											width: "22%",
											textDecoration: "none",
											marginRight: 10,
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
						Commentaires et Avis
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
									{ratingValue.toFixed(2)}/5
								</Typography>
								<Rating
									style={{ marginRight: 10 }}
									value={ratingValue.toFixed(2)}
									precision={0.5}
									onChange={handleRating}
								/>
								<Typography
									variant="h6"
									color="primary"
									style={{ fontSize: 16, fontWeight: 450, marginTop: 5 }}
								>
									{ratingsNumber} Avis
								</Typography>
							</div>
						</div>
						<div style={{ width: "100%" }}>
							<Typography variant="h6">
								Commantaire ({comments.length})
							</Typography>
							{comments.length === 0 ? (
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
							) : (
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										alignItems: "flex-start",
										marginTop: 5,
										marginBottom: 5,
									}}
								>
									{comments.map((comment) => (
										<div
											style={{
												width: "98%",
												borderBottom: "1px solid rgb(217 217 217)",
												padding: 10,
											}}
										>
											<Typography
												style={{
													fontSize: 18,
													fontWeight: 400,
													marginBottom: 5,
												}}
											>
												{comment.comment}
											</Typography>
											<Typography
												color="textSecondary"
												style={{ fontSize: 15, fontWeight: 400 }}
											>
												par {comment.user}
											</Typography>
										</div>
									))}
								</div>
							)}
						</div>
					</div>
				</Container>
			</Container>
			<Fotter />
		</div>
	);
}
