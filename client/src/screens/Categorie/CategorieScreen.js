import axios from "axios";
import React, { useState } from "react";
import {
	CircularProgress,
	Container,
	CssBaseline,
	Divider,
	Typography,
	Slider,
	InputBase,
	Paper,
	FormGroup,
	FormControlLabel,
	Checkbox,
	Button,
	FormControl,
} from "@material-ui/core";
import Masonry from "react-masonry-css";
import { useDispatch, useSelector } from "react-redux";
import {
	dispatchUserError,
	dispatchUserLoaded,
	dispatchUserLoading,
} from "../../redux/actions/authAction";
import { returnErrors } from "../../redux/actions/errAction";
import { productErrors } from "../../redux/actions/productsAction";
import MyAppBar from "../../utils/AppBar";
import Footer from "../../utils/Footer";
import ProductCard from "../../utils/ProductCard";
import { useStyles } from "./useStyles";
import EmptyBoxIcon from "../../Icons/EmptyBoxIcon";

function valuetext(value) {
	return `${value} Da`;
}

const categories = [
	"Meuble",
	"Vaisselle",
	"Literie",
	"Décoration",
	"Electroménager",
	"Autre",
];

const subCategories = [
	[
		"Meuble de chambre à coucher",
		"Meuble de salon",
		"Meuble de cuisine",
		"Meuble d'entrée",
		"Autre",
	],
	[
		"Art de table",
		"Casseroles, cocottes, poêles & faitouts",
		"Ustensiles & accessoires de cuisine",
		"Autre",
	],
	["Matelas", "Couvre-lits et draps", "Couette et housse", "Autre"],
	[
		"Moquettes et tapis",
		"Horloges",
		"Plantes et vases",
		"Lustres",
		"Miroire",
		"Figurines & accessoires",
		"Autre",
	],
	[
		"Blenders, mixeurs et robots de cuisine",
		"Appareils de cuisson à induction",
		"Grills, friteuses & plaques de cuissons",
		"Cafetières et moulins électriques",
		"Autre",
	],
	["Autre"],
];

export default function CategorieScreen(props) {
	const classes = useStyles();
	const categorie = props.match.params.categorie;

	const dispatch = useDispatch();
	// Get token from localstorage
	const token = useSelector((state) => state.auth.token);
	const isLoading = useSelector((state) => state.auth.isLoading);
	const [products, setProducts] = React.useState([]);
	const [user, setUser] = React.useState(null);
	const [skip, setSkip] = useState(0);
	const [limit, setLimit] = useState(8);
	const [priceRange, setPriceRange] = React.useState([0, 1000000]);
	const [selectedCategories, setSelectedCategories] = React.useState([]);
	const [selectPromotion, setselectPromotion] = useState(false);
	const [productLoading, setProductLoading] = useState(true);

	const handleCategorieChange = (categorie) => {
		var checkedCategorie = selectedCategories;
		if (checkedCategorie.indexOf(categorie) === -1) {
			checkedCategorie.push(categorie);
		} else {
			checkedCategorie.splice(checkedCategorie.indexOf(categorie), 1);
		}
		setSelectedCategories(checkedCategorie);
	};

	const applyFilters = async () => {
		setProductLoading(true);
		setSkip(0);
		setLimit(8);
		var checkedCategorie;

		if (
			selectedCategories.indexOf("Meuble de chambre à coucher") === -1 &&
			selectedCategories.indexOf("Meuble de salon") === -1 &&
			selectedCategories.indexOf("Meuble de cuisine") === -1 &&
			selectedCategories.indexOf("Meuble d'entrée") === -1 &&
			selectedCategories.indexOf("Art de table") === -1 &&
			selectedCategories.indexOf("Casseroles, cocottes, poêles & faitouts") ===
				-1 &&
			selectedCategories.indexOf("Ustensiles & accessoires de cuisine") ===
				-1 &&
			selectedCategories.indexOf("Ustensiles & accessoires de cuisine") ===
				-1 &&
			selectedCategories.indexOf("Matelas") === -1 &&
			selectedCategories.indexOf("Couvre-lits et draps") === -1 &&
			selectedCategories.indexOf("Couette et housse") === -1 &&
			selectedCategories.indexOf("Moquettes et tapis") === -1 &&
			selectedCategories.indexOf("Horloges") === -1 &&
			selectedCategories.indexOf("Plantes et vases") === -1 &&
			selectedCategories.indexOf("Lustres") === -1 &&
			selectedCategories.indexOf("Miroire") === -1 &&
			selectedCategories.indexOf("Figurines & accessoires") === -1 &&
			selectedCategories.indexOf("Blenders, mixeurs et robots de cuisine") ===
				-1 &&
			selectedCategories.indexOf("Appareils de cuisson à induction") === -1 &&
			selectedCategories.indexOf("Grills, friteuses & plaques de cuissons") ===
				-1 &&
			selectedCategories.indexOf("Cafetières et moulins électriques") === -1 &&
			selectedCategories.indexOf("Autre") === -1
		) {
			checkedCategorie = subCategories[categories.indexOf(categorie)];
		} else {
			checkedCategorie = selectedCategories;
		}
		await axios
			.post(
				`/products/get_products_by_categorie?categorie=${categorie}&type=single`,
				{ skip: 0, limit: 8, priceRange, checkedCategorie, selectPromotion }
			)
			.then((res) => {
				setProductLoading(false);
				setProducts(res.data.products);
			})
			.catch((err) => {
				setProductLoading(false);
				dispatch(productErrors(err));
				console.log(err);
			});
	};

	const handleLoadMore = async () => {
		var checkedCategorie;
		var Skip = skip + limit;
		setSkip(Skip);

		if (
			selectedCategories.indexOf("Meuble de chambre à coucher") === -1 &&
			selectedCategories.indexOf("Meuble de salon") === -1 &&
			selectedCategories.indexOf("Meuble de cuisine") === -1 &&
			selectedCategories.indexOf("Meuble d'entrée") === -1 &&
			selectedCategories.indexOf("Art de table") === -1 &&
			selectedCategories.indexOf("Casseroles, cocottes, poêles & faitouts") ===
				-1 &&
			selectedCategories.indexOf("Ustensiles & accessoires de cuisine") ===
				-1 &&
			selectedCategories.indexOf("Ustensiles & accessoires de cuisine") ===
				-1 &&
			selectedCategories.indexOf("Matelas") === -1 &&
			selectedCategories.indexOf("Couvre-lits et draps") === -1 &&
			selectedCategories.indexOf("Couette et housse") === -1 &&
			selectedCategories.indexOf("Moquettes et tapis") === -1 &&
			selectedCategories.indexOf("Horloges") === -1 &&
			selectedCategories.indexOf("Plantes et vases") === -1 &&
			selectedCategories.indexOf("Lustres") === -1 &&
			selectedCategories.indexOf("Miroire") === -1 &&
			selectedCategories.indexOf("Figurines & accessoires") === -1 &&
			selectedCategories.indexOf("Blenders, mixeurs et robots de cuisine") ===
				-1 &&
			selectedCategories.indexOf("Appareils de cuisson à induction") === -1 &&
			selectedCategories.indexOf("Grills, friteuses & plaques de cuissons") ===
				-1 &&
			selectedCategories.indexOf("Cafetières et moulins électriques") === -1 &&
			selectedCategories.indexOf("Autre") === -1
		) {
			checkedCategorie = subCategories[categories.indexOf(categorie)];
		} else {
			checkedCategorie = selectedCategories;
		}

		await axios
			.post(
				`/products/get_products_by_categorie?categorie=${categorie}&type=single`,
				{ skip: Skip, limit, priceRange, checkedCategorie, selectPromotion }
			)
			.then((res) => {
				setProducts([...products, ...res.data.products]);
			})
			.catch((err) => {
				dispatch(productErrors(err));
				console.log(err);
			});
	};

	const handleChange = (event, newValue) => {
		setPriceRange(newValue);
	};
	const handlMaxPriceValueChange = (e) => {
		const newValue = [priceRange[0], e.target.value];
		setPriceRange(newValue);
	};

	const handlMinPriceValueChange = (e) => {
		const newValue = [e.target.value, priceRange[1]];
		setPriceRange(newValue);
	};
	/*For The Masonary Container*/
	const breakpoints = {
		default: 4,
		1100: 3,
		700: 2,
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
				})
				.catch((err) => {
					dispatch(dispatchUserError());
					dispatch(returnErrors(err.response.data.msg, err.response.status));
				});
		};
		loadUser();
	}, [dispatch, token]);

	React.useEffect(() => {
		const loadProducts = async () => {
			setProductLoading(true);

			await axios
				.post(
					`/products/get_products_by_categorie?categorie=${categorie}&type=single`,
					{ skip: 0, limit: 8 }
				)
				.then((res) => {
					setProductLoading(false);
					setProducts(res.data.products);
				})
				.catch((err) => {
					dispatch(productErrors(err));
					setProductLoading(false);
					console.log(err);
				});
		};
		loadProducts();
	}, [categorie, dispatch]);

	return (
		<div>
			{isLoading && (
				<CircularProgress size={80} thickness={5} className={classes.loader} />
			)}

			{!isLoading && (
				<div className="home_body">
					<CssBaseline />
					<MyAppBar cartLength={user ? user.cart.length : 0} />
					<div
						style={{
							display: "flex",
							width: "100%",
							paddingLeft: 50,
							paddingRight: 50,
						}}
					>
						<Container
							maxWidth="xl"
							style={{
								backgroundColor: "white",
								borderRadius: 20,
								padding: 20,
								width: "20%",
								marginRight: "1%",
								height: "fit-content",
							}}
							className="main"
						>
							<Typography
								style={{ marginBottom: 10, fontWeight: 500, flexGrow: 1 }}
								variant="h5"
							>
								Filtrer
							</Typography>
							<Divider style={{ marginBottom: 10 }} />
							<div
								style={{
									display: "flex",
									alignItems: "center",
									marginBottom: 10,
								}}
							>
								<Typography style={{ fontWeight: 450, flexGrow: 1 }}>
									Sous-catégories
								</Typography>
								<Button
									color="primary"
									size="small"
									style={{ textTransform: "none", fontSize: 12 }}
									onClick={applyFilters}
								>
									Appliquer
								</Button>
							</div>
							<FormControl component="fieldset" className={classes.formControl}>
								<FormGroup>
									{subCategories[categories.indexOf(categorie)].map(
										(categorie) => (
											<FormControlLabel
												control={
													<Checkbox
														color="primary"
														name={categorie}
														size="small"
														disableRipple
														onChange={() => handleCategorieChange(categorie)}
													/>
												}
												label={categorie}
												classes={{
													root: classes.formControlRoot,
													label: classes.formControlLable,
												}}
											/>
										)
									)}
								</FormGroup>
							</FormControl>
							<Divider style={{ marginBottom: 10 }} />
							<div
								style={{
									display: "flex",
									alignItems: "center",
									marginBottom: 10,
								}}
							>
								<Typography style={{ fontWeight: 450, flexGrow: 1 }}>
									Prix
								</Typography>
								<Button
									color="primary"
									size="small"
									style={{ textTransform: "none", fontSize: 12 }}
									onClick={applyFilters}
								>
									Appliquer
								</Button>
							</div>
							<Slider
								value={priceRange}
								max={1000000}
								step={100}
								onChange={handleChange}
								valueLabelDisplay="off"
								aria-labelledby="range-slider"
								getAriaValueText={valuetext}
							/>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									marginBottom: 10,
								}}
							>
								<Paper
									style={{
										padding: "2px 4px",
										height: 40,
										width: "50%",
										marginRight: 5,
									}}
									variant="outlined"
								>
									<InputBase
										value={priceRange[0]}
										onChange={handlMinPriceValueChange}
									/>
								</Paper>
								-
								<Paper
									style={{
										padding: "2px 4px",
										height: 40,
										width: "50%",
										marginLeft: 5,
									}}
									variant="outlined"
								>
									<InputBase
										value={priceRange[1]}
										onChange={handlMaxPriceValueChange}
									/>
								</Paper>
							</div>
							<Divider style={{ marginBottom: 10 }} />
							<div
								style={{
									display: "flex",
									alignItems: "center",
									marginBottom: 10,
								}}
							>
								<Typography style={{ fontWeight: 450, flexGrow: 1 }}>
									Offre et Promotion
								</Typography>
								<Button
									color="primary"
									size="small"
									style={{ textTransform: "none", fontSize: 12 }}
									onClick={applyFilters}
								>
									Appliquer
								</Button>
							</div>
							<FormControl component="fieldset">
								<FormGroup>
									<FormControlLabel
										control={
											<Checkbox
												color="primary"
												name="Promotion"
												size="small"
												disableRipple
												checked={selectPromotion}
												onChange={() => setselectPromotion(!selectPromotion)}
											/>
										}
										label="Promotion"
									/>
								</FormGroup>
							</FormControl>
						</Container>
						<Container
							style={{
								backgroundColor: "white",
								borderRadius: 20,
								padding: 20,
								width: "80%",
							}}
							className="main"
						>
							<Typography
								style={{ marginBottom: 10, fontWeight: 500, flexGrow: 1 }}
								variant="h5"
							>
								{categorie}
							</Typography>

							<Divider style={{ marginBottom: 10 }} />
							<div style={{ display: "flex", flexDirection: "column" }}>
								{productLoading && (
									<div
										style={{
											width: "100%",
											height: "100%",
											display: "flex",
											justifyContent: "center",
											marginTop: 50,
										}}
									>
										<CircularProgress thickness={3} size={50} />
									</div>
								)}
								{!productLoading && products.length !== 0 && (
									<Masonry
										breakpointCols={breakpoints}
										className="my-masonry-grid"
										columnClassName="my-masonry-grid_column"
										style={{ width: "100%" }}
									>
										{products.map((product) => (
											<ProductCard product={product} />
										))}
									</Masonry>
								)}
								{!productLoading && products.length === 0 && (
									<div
										style={{
											width: "100%",
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
											marginTop: 50,
										}}
									>
										<EmptyBoxIcon />
										<Typography
											variant="h6"
											color="textSecondary"
											style={{
												marginTop: 10,
												color: "#424242",
											}}
										>
											Désolé, il n'y a pas de produits avec cette spécification
										</Typography>
										<Typography
											variant="h6"
											style={{
												marginTop: 5,
												color: "#424242",
											}}
										>
											choisissez d'autres spécifications
										</Typography>
									</div>
								)}
								{!productLoading && (
									<Button
										color="primary"
										variant="outlined"
										style={{
											alignSelf: "center",
											textTransform: "none",
											marginTop: 20,
										}}
										onClick={handleLoadMore}
									>
										Afficher plus
									</Button>
								)}
							</div>
						</Container>
					</div>
					{/*Footer */}
					<Footer />
				</div>
			)}
		</div>
	);
}
