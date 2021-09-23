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
	Button,
	Tooltip,
	Snackbar,
	TextField,
	useTheme,
	CircularProgress,
} from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
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
import Fotter from "../../utils/Footer";
import HeartIcon from "../../Icons/HeartIcon";
import ActiveHeartIcon from "../../Icons/ActiveHeartIcon";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import IndeterminateCheckBoxOutlinedIcon from "@material-ui/icons/IndeterminateCheckBoxOutlined";
import Masonry from "react-masonry-css";
import ProductCard from "../../utils/ProductCard";

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ProductDetails(props) {
	const dispatch = useDispatch();
	const token = useSelector((state) => state.auth.token);
	const [user, setUser] = React.useState(null);
	const [cartLength, setCartLength] = React.useState(0);
	const product_Id = props.match.params.productId;
	const [product, setProduct] = React.useState({
		price: "0000",
		newPrice: "0000",
	});
	const [similaireProducts, setSimilaireProducts] = React.useState([]);
	const [productImages, setProductImages] = React.useState([]);
	const [ratingValue, setRatingValue] = React.useState(0);
	const [ratingsNumber, setRatingsNumber] = React.useState(0);
	const [isLoading, setIsLoading] = React.useState(false);
	const [commentLoading, setCommentLoading] = React.useState(false);
	const [addProductLoading, setAddProductLoading] = React.useState(false);
	const [favorite, setFavorite] = React.useState(
		user ? user.favoriteProducts.indexOf(product_Id) !== -1 : false
	);
	const [msg, setMsg] = React.useState("");
	const [alertOpen, setAlertOpen] = React.useState(false);
	const [alertType, setAlertType] = React.useState("");
	const [comments, setComments] = React.useState([]);
	const [comment, setComment] = React.useState("");
	const [commentError, setCommentError] = React.useState("");
	const theme = useTheme();

	/*For The Masonary Container*/
	const breakpoints = {
		default: 2,
		1000: 1,
	};

	const productBreakpoints = {
		default: 5,
		1000: 3,
		600: 2,
	};
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

	const handleChangeInput = (e) => {
		setComment(e.target.value);
		setCommentError("");
	};

	const handleComment = async () => {
		setCommentLoading(true);
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
		} else if (comment !== "") {
			await axios
				.post(
					`/products/add_comment?id=${product_Id}&type=single`,
					{ comment },
					config
				)
				.then((res) => {
					setMsg(res.data.msg);
					setAlertType("success");
					handleAlertOpen();
					const newComments = comments;
					newComments.push(res.data.newComment);
					setComments(newComments);
					setComment("");
					setCommentLoading(false);
				})
				.catch((err) => {
					console.log(err.message);
					setCommentLoading(false);
				});
		} else {
			setCommentError("Entrer votre commentaire");
			setCommentLoading(false);
		}
		setCommentLoading(false);
	};

	const handleAddToCart = async () => {
		setAddProductLoading(true);
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
		} else {
			await axios
				.post(`/users/add_to_cart?id=${product_Id}&type=single`, null, config)
				.then((res) => {
					setAddProductLoading(false);
					setMsg(res.data.msg);
					setAlertType("success");
					handleAlertOpen();
					if (res.data.msg === "Le produit a été ajouter.") {
						setCartLength(cartLength + 1);
					}
				})
				.catch((err) => {
					setAlertType(err.status === 400 ? "error" : "info");
					setMsg(err.response.data.msg);
					handleAlertOpen();
					setAddProductLoading(false);
				});
		}
		setAddProductLoading(false);
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
					setUser(res.data.user);
					setCartLength(res.data.user.cart.length);
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
					setProduct(res.data.product[0]);
					console.log(res.data.product[0]);
					setProductImages(res.data.product[0].productImages);
					setIsLoading(false);

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

					setComments(res.data.product[0].comments);
					setRatingsNumber(res.data.product[0].ratingsNumber);
				})
				.catch((err) => {
					dispatch(productErrors(err));
					console.log(err);
				});
		};
		loadProduct();
	}, [dispatch, product_Id]);

	React.useEffect(() => {
		const loadSimilaireProducts = async () => {
			const skip = Math.floor(Math.random() * 5);
			const limit = 5;
			await axios
				.post(
					`/products/get_products_by_categorie?categorie=${product.categorie}&type=single`,
					{ skip, limit }
				)
				.then((res) => {
					setSimilaireProducts(res.data.products);
				})
				.catch((err) => {
					dispatch(productErrors(err));
					console.log(err);
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
			<MyAppBar cartLength={cartLength} />

			<Container maxWidth="lg" style={{ marginTop: 50 }}>
				<Snackbar
					open={alertOpen}
					autoHideDuration={3000}
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
					<a
						style={{ textDecoration: "none", color: "black", fontWeight: 450 }}
						href={`/categorie/${product.categorie}`}
					>
						{product.subCategorie}
					</a>
					<Typography color="textSecondary">{product.name}</Typography>
				</Breadcrumbs>

				<Container
					maxWidth="lg"
					style={{
						backgroundColor: "white",
						display: "flex",
						borderRadius: 20,
					}}
					className="main"
				>
					<Masonry
						breakpointCols={breakpoints}
						className="my-masonry-grid"
						columnClassName="my-masonry-grid_column"
						style={{ width: "100%", height: "100%" }}
					>
						<Container style={{ width: "100%", margin: 20 }}>
							{isLoading ? (
								<Skeleton height="600px" style={{ transform: "none" }} />
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
								width: "100%",
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
							<div style={{ display: "flex" }}>
								<Typography style={{ marginBottom: 20, fontWeight: 400 }}>
									{isLoading ? <Skeleton width="50%" /> : "Categorie: "}
								</Typography>
								<a
									href={`/categorie/${product.categorie}`}
									style={{
										fontSize: 16,
										fontWeight: 400,
										marginLeft: 5,
										color: "#F58634",
									}}
								>
									{product.categorie}
								</a>
							</div>
							<Typography
								color={product.stock > 0 ? "secondary" : "error"}
								style={{
									fontSize: 16,
									fontWeight: 400,
									marginBottom: 20,
									display: "flex",
									alignItems: "center",
								}}
							>
								{product.stock > 0 ? (
									<CheckBoxOutlinedIcon
										fontSize="small"
										style={{ marginRight: 5 }}
									/>
								) : (
									<IndeterminateCheckBoxOutlinedIcon
										fontSize="small"
										style={{ marginRight: 5 }}
									/>
								)}
								{product.stock > 0 ? "En stock" : "Hors stock"}
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
							<Typography
								style={{ marginBottom: 10, fontWeight: 550, fontSize: 20 }}
								color="primary"
							>
								{isLoading ? <Skeleton width="50%" /> : [product.price, " Da"]}
							</Typography>
							{product.promoted === true && (
								<Typography
									style={{ marginBottom: 10, fontWeight: 550, fontSize: 20 }}
									color="textSecondary"
									className={product.promoted === true ? "old-price" : null}
								>
									{isLoading ? (
										<Skeleton width="50%" />
									) : (
										[product.oldPrice, " Da"]
									)}
								</Typography>
							)}
							<div
								style={{
									margin: 0,
									position: "relative",
									alignSelf: "center",
									marginBottom: "1em",
									width: "100%",
								}}
							>
								<Button
									color="primary"
									variant="contained"
									size="large"
									fullWidth
									startIcon={<AddShoppingCartIcon />}
									style={{
										alignSelf: "center",
										color: "white",
										textTransform: "none",
										marginTop: 50,
									}}
									onClick={handleAddToCart}
									disabled={product.stock === 0 || addProductLoading}
								>
									Ajouter au panier
								</Button>
								{addProductLoading && (
									<CircularProgress
										size={24}
										style={{
											color: theme.palette.primary,
											position: "absolute",
											top: "50%",
											left: "50%",
											marginTop: 11,
										}}
									/>
								)}
							</div>
						</Container>
					</Masonry>
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
					<div style={{ display: "flex" }}>
						<Typography
							style={{ marginBottom: 10, fontWeight: 500, flexGrow: 1 }}
							variant="h5"
						>
							Produit simulaire
						</Typography>
						<a
							href={`/categorie/${product.categorie}`}
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

					{similaireProducts.length === 0 && (
						<Masonry
							breakpointCols={productBreakpoints}
							className="my-masonry-grid"
							columnClassName="my-masonry-grid_column"
							style={{ width: "100%", height: 250, paddingLeft: 30 }}
						>
							<Skeleton
								height="100%"
								style={{
									transform: "none",
								}}
							/>
							<Skeleton
								height="100%"
								style={{
									transform: "none",
								}}
							/>
							<Skeleton
								height="100%"
								style={{
									transform: "none",
								}}
							/>
							<Skeleton
								height="100%"
								style={{
									transform: "none",
								}}
							/>
							<Skeleton height="100%" style={{ transform: "none" }} />
						</Masonry>
					)}
					{similaireProducts.length > 0 && (
						<div style={{ width: "100%", height: "100%", display: "flex" }}>
							{similaireProducts.map(
								(element) =>
									product._id !== element._id && (
										<ProductCard product={element} />
									)
							)}
						</div>
					)}
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
							<Typography variant="h6">Évaluations</Typography>
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
									{ratingValue === undefined || ratingValue === null
										? ratingValue.toFixed(2)
										: ratingValue.toFixed(2)}
									/5
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
								Commentaire ({comments.length})
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
												par {comment.name}
											</Typography>
										</div>
									))}
								</div>
							)}
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									justifyContent: "center",
									alignItems: "flex-start",
									marginTop: 30,
									marginBottom: 30,
									width: "98%",
								}}
							>
								<Typography
									style={{
										fontSize: 16,
										fontWeight: 450,
										marginBottom: 10,
									}}
								>
									Ajouter un commentaires :
								</Typography>
								<div
									style={{
										display: "flex",
										flexDirection: "row",
										width: "100%",
									}}
								>
									<TextField
										variant="outlined"
										label="Votre Commentaire"
										name="comment"
										value={comment}
										fullWidth
										multiline
										rowsMax={5}
										onChange={handleChangeInput}
										helperText={commentError}
										error={commentError !== ""}
									/>
									<div
										style={{
											margin: 0,
											position: "relative",
											alignSelf: "center",
											marginBottom: "1em",
										}}
									>
										<Button
											variant="contained"
											size="large"
											color="primary"
											component="span"
											onClick={handleComment}
											style={{
												color: "white",
												textTransform: "none",
												marginLeft: 10,
												height: 55,
											}}
											disabled={commentLoading}
										>
											Commenter
										</Button>
										{commentLoading && (
											<CircularProgress
												size={24}
												style={{
													color: theme.palette.primary,
													position: "absolute",
													top: "50%",
													left: "50%",
													marginTop: -12,
													marginLeft: -13,
												}}
											/>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</Container>
			</Container>

			<Fotter />
		</div>
	);
}
