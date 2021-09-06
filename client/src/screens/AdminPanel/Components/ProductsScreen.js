import React from "react";
import axios from "axios";
import NumberFormat from "react-number-format";
import {
	Backdrop,
	Button,
	Card,
	CircularProgress,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Fab,
	InputAdornment,
	MenuItem,
	Snackbar,
	TextField,
	Toolbar,
	Typography,
	Divider,
	useTheme,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

import { useStyles } from "../useStyles";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import Masonry from "react-masonry-css";

import "../adminPanel.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, returnErrors } from "../../../redux/actions/errAction";
import ProductCard from "./ProductCard";

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function PriceFormat(props) {
	const { inputRef, onChange, ...other } = props;

	return (
		<NumberFormat
			{...other}
			getInputRef={inputRef}
			onValueChange={(values) => {
				onChange({
					target: {
						name: props.name,
						value: values.value,
					},
				});
			}}
			thousandSeparator
			isNumericString
		/>
	);
}

function StockFormat(props) {
	const { inputRef, onChange, ...other } = props;

	return (
		<NumberFormat
			{...other}
			getInputRef={inputRef}
			onValueChange={(values) => {
				onChange({
					target: {
						name: props.name,
						value: values.value,
					},
				});
			}}
			isNumericString
		/>
	);
}

const categories = [
	"",
	"Meuble",
	"Vaisselle",
	"Literie",
	"Décoration",
	"Electroménager",
	"Autre",
];

const subCategories = [
	[""],
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

const initialState = {
	name: "",
	brand: "",
	price: 0,
	stock: 0,
	categorie: "",
	subCategorie: "",
	description: "",
	newPrice: 0,
	promoted: false,
};

export default function ProductsScreen() {
	const classes = useStyles();
	const theme = useTheme();

	const [product, setProduct] = React.useState(initialState);
	const [categorie, setCategorie] = React.useState("");
	const [subCategorie, setSubCategorie] = React.useState("");
	var images = [];
	const [imageSlide, setImageSlide] = React.useState("");
	const [productImage, setProductImage] = React.useState("");
	const [msg, setMsg] = React.useState("");
	const [isLoading, setIsLoading] = React.useState(false);
	const [addOpen, setAddOpen] = React.useState(false);
	const [editOpen, setEditOpen] = React.useState(false);
	const [promotionOpen, setPromotionOpen] = React.useState(false);
	const [editedProdcutId, setEditedProductId] = React.useState("");
	const [promotedProductId, setPromotedProductId] = React.useState("");
	const [alertOpen, setAlertOpen] = React.useState(false);
	const [backdropOpen, setBackdropOpen] = React.useState(false);

	const [products, setProducts] = React.useState(
		useSelector((state) => state.products.products)
	);
	const dispatch = useDispatch();
	const token = useSelector((state) => state.auth.token);
	const nameMsg = useSelector((state) => state.err);
	const brandMsg = useSelector((state) => state.err);
	const priceMsg = useSelector((state) => state.err);
	const stockMsg = useSelector((state) => state.err);
	const categorieMsg = useSelector((state) => state.err);
	const descriptionMsg = useSelector((state) => state.err);
	const [newPriceMsg, setNewPriceMsg] = React.useState("");
	let imageMsg = useSelector((state) => state.err);

	/*For The Masonary Container*/
	const breakpoints = {
		default: 5,
		1600: 4,
		1100: 2,
		700: 1,
	};

	/*For Add Product Dialog */
	const handleAddOpen = () => {
		setAddOpen(true);
	};
	const handleAddClose = () => {
		setAddOpen(false);
		setProductImage("");
		images = [];
		setImageSlide("");
		dispatch(clearErrors());
		setMsg("");
		setCategorie("");
		setSubCategorie("");
	};
	/*______________________*/

	/*          For Edit Product Dialog          */
	const handleClickEditOpen = (editedProduct) => {
		setProductImage("");
		images = [];
		setEditOpen(true);
		setProduct({
			name: editedProduct.name,
			brand: editedProduct.brand,
			price: editedProduct.price,
			stock: editedProduct.stock,
			description: editedProduct.description,
			newPrice: editedProduct.newPrice ? editedProduct.newPrice : 0,
			promoted: editedProduct.promoted ? editedProduct.promoted : false,
		});
		setCategorie(editedProduct.categorie);
		setSubCategorie(editedProduct.subCategorie);
		setEditedProductId(editedProduct._id);
	};
	const handleClickPromotionOpen = (PromotedProduct) => {
		setPromotionOpen(true);
		setPromotedProductId(PromotedProduct);
	};
	const handleEditClose = () => {
		setEditOpen(false);
		setProductImage("");
		images = [];
		setImageSlide("");
		dispatch(clearErrors());
		setMsg("");
		setCategorie("");
		setSubCategorie("");
	};
	const handlePromotionClose = () => {
		setPromotionOpen(false);
		dispatch(clearErrors());
		setMsg("");
		setProduct(initialState);
	};
	/*__________________________________________ */

	const handleAlertOpen = () => {
		setAlertOpen(true);
	};
	const handleAlertClose = () => {
		setAlertOpen(false);
	};

	const handleBackdropOpen = () => {
		setBackdropOpen(true);
	};

	const handleBackdropClose = () => {
		setBackdropOpen(false);
	};

	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setProduct({ ...product, [name]: value });
	};

	const handleCategorieChange = (e) => {
		setCategorie(e.target.value);
		setProduct({ ...product, categorie: e.target.value });
	};

	const handleSubCategorieChange = (e) => {
		setSubCategorie(e.target.value);
		setProduct({ ...product, subCategorie: e.target.value });
	};

	const handleImageChange = (e) => {
		for (var i = 0; i < e.target.files.length; i++) {
			images.push(URL.createObjectURL(e.target.files[i]));
		}

		setImageSlide(images.reverse());
		setProductImage(e.target.files);
	};

	const handleAddProduct = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		setMsg("");
		dispatch(clearErrors());

		//Header
		const config = {
			headers: {
				"x-auth-token": token,
			},
		};

		//Body
		const formData = new FormData();

		formData.append("name", product.name);
		formData.append("brand", product.brand);
		formData.append("price", product.price);
		formData.append("stock", product.stock);
		formData.append("categorie", product.categorie);
		formData.append("subCategorie", product.subCategorie);
		formData.append("description", product.description);
		formData.append("newPrice", product.description);
		formData.append("promoted", product.promoted);
		for (const key of Object.keys(productImage)) {
			formData.append("productImage", productImage[key]);
		}

		axios
			.post("/products/add_product", formData, config)
			.then((res) => {
				setIsLoading(false);
				dispatch(clearErrors());
				setMsg(res.data.msg);
				imageMsg.msg = "";
				handleAlertOpen();
			})
			.catch((err) => {
				setIsLoading(false);
				dispatch(
					returnErrors(
						err.response.data.msg,
						err.response.status,
						err.response.data.id
					)
				);
			});
	};
	const handleEdit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		setMsg("");
		dispatch(clearErrors());

		//Header
		const config = {
			headers: {
				"x-auth-token": token,
			},
		};

		//Body
		const formData = new FormData();

		formData.append("name", product.name);
		formData.append("brand", product.brand);
		formData.append("price", product.price);
		formData.append("stock", product.stock);
		formData.append("categorie", categorie);
		formData.append("subCategorie", subCategorie);
		formData.append("description", product.description);
		formData.append("newPrice", product.newPrice);
		formData.append("promoted", product.promoted);

		for (const key of Object.keys(productImage)) {
			formData.append("productImage", productImage[key]);
		}

		axios
			.put(`/products/edit_product/${editedProdcutId}`, formData, config)
			.then((res) => {
				setIsLoading(false);
				dispatch(clearErrors());
				setMsg(res.data.msg);
				imageMsg.msg = "";
				handleAlertOpen();
			})
			.catch((err) => {
				setIsLoading(false);
				dispatch(
					returnErrors(
						err.response.data.msg,
						err.response.status,
						err.response.data.id
					)
				);
			});
	};
	const handlePromote = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		setMsg("");
		dispatch(clearErrors());

		//Header
		const config = {
			headers: {
				"x-auth-token": token,
			},
		};

		//Body
		const formData = new FormData();

		formData.append("newPrice", product.newPrice);
		axios
			.put(`/products/promote_product/${promotedProductId}`, formData, config)
			.then((res) => {
				setIsLoading(false);
				dispatch(clearErrors());
				setMsg(res.data.msg);
				handleAlertOpen();
			})
			.catch((err) => {
				setIsLoading(false);
				setNewPriceMsg(err.response.data.msg);
			});
	};

	const handleDelete = async (deletedProductId, deletedProductImage) => {
		handleBackdropOpen();
		//Header
		const config = {
			headers: {
				"x-auth-token": token,
			},
		};

		await axios
			.delete(`/products/delete_product/${deletedProductId}`, config)
			.then((res) => {
				setMsg(res.data.msg);
				const newProducts = products.filter(
					(product) => product._id !== deletedProductId
				);
				setProducts(newProducts);
				handleAlertOpen();
				handleBackdropClose();
			})
			.catch((err) => {
				setMsg(err.response.data.msg);
				dispatch(
					returnErrors(
						err.response.data.msg,
						err.response.status,
						err.response.data.id
					)
				);
				handleBackdropClose();
			});
	};
	const handleArchive = (archiveProductId) => {
		handleBackdropOpen();
		//Header
		const config = {
			headers: {
				"x-auth-token": token,
			},
		};

		axios
			.put(`/products/archive_product/${archiveProductId}`, null, config)
			.then((res) => {
				setMsg(res.data.msg);
				handleAlertOpen();
				handleBackdropClose();
			})
			.catch((err) => {
				setMsg(err.response.data.msg);
				dispatch(
					returnErrors(
						err.response.data.msg,
						err.response.status,
						err.response.data.id
					)
				);
				handleBackdropClose();
			});
	};
	const handleReveal = (revealedProductId) => {
		handleBackdropOpen();
		//Header
		const config = {
			headers: {
				"x-auth-token": token,
			},
		};

		axios
			.put(`/products/reveal_product/${revealedProductId}`, null, config)
			.then((res) => {
				setMsg(res.data.msg);
				handleAlertOpen();
				handleBackdropClose();
			})
			.catch((err) => {
				setMsg(err.response.data.msg);
				dispatch(
					returnErrors(
						err.response.data.msg,
						err.response.status,
						err.response.data.id
					)
				);
				handleBackdropClose();
			});
	};

	return (
		<Container maxWidth="xl" className="dashbord_container">
			<Toolbar />
			{/*_________________Add Product Button_________________*/}
			<Fab
				color="primary"
				variant="extended"
				onClick={handleAddOpen}
				className={classes.addProductFab}
			>
				<AddRoundedIcon className={classes.fabIcon} />
				Ajouter un produit
			</Fab>

			<Typography variant="h5" className={classes.dashboardText}>
				Produit
			</Typography>

			{/*_____________________Add Dialog_____________________*/}
			<Dialog
				open={addOpen}
				onClose={handleAddClose}
				aria-labelledby="form-dialog-title"
				maxWidth="lg"
			>
				<DialogTitle id="form-dialog-title">Ajouter un produit</DialogTitle>
				<DialogContent>
					<form
						onSubmit={handleAddProduct}
						className={classes.productForm}
						encType="multipart/form-data"
					>
						<div className={classes.productInputContainer}>
							<TextField
								variant="outlined"
								label="Nom de produit"
								name="name"
								onChange={handleChangeInput}
								className={classes.productInput}
								fullWidth
								helperText={nameMsg.id === 0 ? nameMsg.msg : null}
								error={nameMsg.id === 0 ? true : false}
							/>
							<TextField
								variant="outlined"
								label="Marque"
								name="brand"
								onChange={handleChangeInput}
								className={classes.productInput}
								fullWidth
								helperText={brandMsg.id === 1 ? brandMsg.msg : null}
								error={brandMsg.id === 1 ? true : false}
							/>
							<TextField
								variant="outlined"
								label="Prix	"
								name="price"
								onChange={handleChangeInput}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">Da</InputAdornment>
									),

									inputComponent: PriceFormat,
								}}
								className={classes.productInput}
								fullWidth
								helperText={priceMsg.id === 2 ? priceMsg.msg : null}
								error={priceMsg.id === 2 ? true : false}
							/>
							<TextField
								variant="outlined"
								label="Nombre de stock"
								name="stock"
								onChange={handleChangeInput}
								InputProps={{
									inputComponent: StockFormat,
								}}
								fullWidth
								helperText={stockMsg.id === 3 ? stockMsg.msg : null}
								error={stockMsg.id === 3 ? true : false}
							/>
						</div>
						<div className={classes.productInputContainer}>
							<TextField
								select
								label="Categories"
								value={categorie}
								onChange={handleCategorieChange}
								variant="outlined"
								fullWidth
								className={classes.lastProductInput}
								helperText={categorieMsg.id === 4 ? categorieMsg.msg : null}
								error={categorieMsg.id === 4 ? true : false}
								style={{ marginRight: 15 }}
							>
								{categories.map((option) => (
									<MenuItem key={option} value={option}>
										{option}
									</MenuItem>
								))}
							</TextField>
							<TextField
								select
								label="Sous-categories"
								value={subCategorie}
								onChange={handleSubCategorieChange}
								variant="outlined"
								fullWidth
								className={classes.lastProductInput}
								helperText={categorieMsg.id === 5 ? categorieMsg.msg : null}
								error={categorieMsg.id === 5 ? true : false}
							>
								{subCategories[categories.indexOf(categorie)].map((option) => (
									<MenuItem key={option} value={option}>
										{option}
									</MenuItem>
								))}
							</TextField>
						</div>
						<TextField
							variant="outlined"
							label="Description"
							name="description"
							onChange={handleChangeInput}
							fullWidth
							multiline
							rowsMax={20}
							className={classes.descriptionInput}
							helperText={descriptionMsg.id === 6 ? descriptionMsg.msg : null}
							error={descriptionMsg.id === 6 ? true : false}
						/>

						<Container className={classes.imageInputContainer}>
							<input
								accept="image/*"
								className={classes.imageInput}
								id="contained-button-file"
								type="file"
								multiple
								onChange={handleImageChange}
							/>
							<label htmlFor="contained-button-file">
								<Button
									variant="outlined"
									size="large"
									color="primary"
									component="span"
									className={classes.imageButton}
								>
									Ajouter des images
								</Button>
							</label>
							<Typography className={classes.imageMsgDiv} variant="body2">
								(6 images maximum)
							</Typography>
							{imageMsg.id === 7 && (
								<Typography
									className={classes.imageMsgDiv}
									color="error"
									variant="caption"
								>
									{imageMsg.msg}
								</Typography>
							)}
						</Container>

						{imageSlide.length > 0 && (
							<div
								style={{
									display: "flex",
									flexDirection: "row",
									alignContent: "center",
									justifyContent: "center",
									width: "100%",
									margin: "5px",
									flexWrap: "wrap",
								}}
							>
								{imageSlide.map((each, index) => (
									<Card
										style={{ margin: "5px" }}
										className={classes.imageCard}
										variant="outlined"
									>
										<img
											key={index}
											src={each}
											alt="product"
											className={classes.addProductImage}
										/>
									</Card>
								))}
							</div>
						)}

						<div className={classes.wrapper}>
							<Button
								variant="contained"
								color="primary"
								className={classes.addProductBtn}
								type="submit"
								size="large"
								disabled={isLoading}
							>
								Ajouter produit
							</Button>
							{isLoading && (
								<CircularProgress
									size={24}
									className={classes.buttonProgress}
								/>
							)}
						</div>
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleAddClose} color="primary">
						Annuler
					</Button>
				</DialogActions>
			</Dialog>

			{/*_____________________Edit Dialog_____________________*/}
			<Dialog open={editOpen} onClose={handleEditClose} maxWidth="lg">
				<DialogTitle>Modifier le produit</DialogTitle>
				<DialogContent>
					<form
						onSubmit={handleEdit}
						className={classes.productForm}
						encType="multipart/form-data"
					>
						<div className={classes.productInputContainer}>
							<TextField
								variant="outlined"
								label="Nom de produit"
								name="name"
								value={product.name}
								onChange={handleChangeInput}
								className={classes.productInput}
								fullWidth
								helperText={nameMsg.id === 0 ? nameMsg.msg : null}
								error={nameMsg.id === 0 ? true : false}
							/>
							<TextField
								variant="outlined"
								label="Marque"
								name="brand"
								value={product.brand}
								onChange={handleChangeInput}
								className={classes.productInput}
								fullWidth
								helperText={brandMsg.id === 1 ? brandMsg.msg : null}
								error={brandMsg.id === 1 ? true : false}
							/>
							<TextField
								variant="outlined"
								label="Prix	"
								name="price"
								value={product.price}
								onChange={handleChangeInput}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">Da</InputAdornment>
									),

									inputComponent: PriceFormat,
								}}
								className={classes.productInput}
								fullWidth
								helperText={priceMsg.id === 2 ? priceMsg.msg : null}
								error={priceMsg.id === 2 ? true : false}
							/>
							<TextField
								variant="outlined"
								label="Nombre de stock"
								name="stock"
								value={product.stock}
								onChange={handleChangeInput}
								InputProps={{
									inputComponent: StockFormat,
								}}
								className={classes.productInput}
								fullWidth
								helperText={stockMsg.id === 3 ? stockMsg.msg : null}
								error={stockMsg.id === 3 ? true : false}
							/>
						</div>
						<div className={classes.productInputContainer}>
							<TextField
								select
								label="Categories"
								value={categorie}
								onChange={handleCategorieChange}
								variant="outlined"
								fullWidth
								className={classes.lastProductInput}
								helperText={categorieMsg.id === 4 ? categorieMsg.msg : null}
								error={categorieMsg.id === 4 ? true : false}
								style={{ marginRight: 15 }}
							>
								{categories.map((option) => (
									<MenuItem key={option} value={option}>
										{option}
									</MenuItem>
								))}
							</TextField>
							<TextField
								select
								label="Categories"
								value={subCategorie}
								onChange={handleSubCategorieChange}
								variant="outlined"
								fullWidth
								className={classes.lastProductInput}
								helperText={categorieMsg.id === 4 ? categorieMsg.msg : null}
								error={categorieMsg.id === 4 ? true : false}
							>
								{subCategories[categories.indexOf(categorie)].map((option) => (
									<MenuItem key={option} value={option}>
										{option}
									</MenuItem>
								))}
							</TextField>
						</div>
						<TextField
							variant="outlined"
							label="Description"
							name="description"
							value={product.description}
							onChange={handleChangeInput}
							fullWidth
							multiline
							rowsMax={6}
							className={classes.descriptionInput}
							helperText={descriptionMsg.id === 5 ? descriptionMsg.msg : null}
							error={descriptionMsg.id === 5 ? true : false}
						/>

						<Container className={classes.imageInputContainer}>
							<input
								accept="image/*"
								className={classes.imageInput}
								id="contained-button-file"
								type="file"
								multiple
								onChange={handleImageChange}
							/>
							<label htmlFor="contained-button-file">
								<Button
									variant="outlined"
									size="large"
									color="primary"
									component="span"
									className={classes.imageButton}
								>
									Modifier l'image
								</Button>
							</label>
							<Typography className={classes.imageMsgDiv} variant="body2">
								(Optionnelle)
							</Typography>
							{imageMsg.id === 6 && (
								<Typography
									className={classes.imageMsgDiv}
									color="error"
									variant="caption"
								>
									{imageMsg.msg}
								</Typography>
							)}
						</Container>
						{imageSlide.length > 0 && (
							<div
								style={{
									display: "flex",
									flexDirection: "row",
									alignContent: "center",
									justifyContent: "center",
									width: "100%",
									margin: "5px",
									flexWrap: "wrap",
								}}
							>
								{imageSlide.map((each, index) => (
									<Card
										style={{ margin: "5px" }}
										className={classes.imageCard}
										variant="outlined"
									>
										<img
											key={index}
											src={each}
											alt="product"
											className={classes.addProductImage}
										/>
									</Card>
								))}
							</div>
						)}
						<div className={classes.wrapper}>
							<Button
								variant="contained"
								color="primary"
								className={classes.addProductBtn}
								type="submit"
								size="large"
								disabled={isLoading}
							>
								Modifer Produit
							</Button>
							{isLoading && (
								<CircularProgress
									size={24}
									className={classes.buttonProgress}
								/>
							)}
						</div>
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleEditClose} color="primary">
						Annuler
					</Button>
				</DialogActions>
			</Dialog>
			{/*_________________Promotion Dialog________________*/}
			<Dialog open={promotionOpen} onClose={handlePromotionClose} maxWidth="lg">
				<DialogTitle>Promoter le produit</DialogTitle>
				<DialogContent>
					<form
						onSubmit={handlePromote}
						className={classes.productForm}
						encType="multipart/form-data"
					>
						<TextField
							variant="outlined"
							label="Nouveau Prix"
							name="newPrice"
							value={product.newPrice}
							onChange={handleChangeInput}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">Da</InputAdornment>
								),

								inputComponent: PriceFormat,
							}}
							fullWidth
							style={{ marginBottom: 30 }}
							helperText={newPriceMsg !== "" ? newPriceMsg.msg : null}
							error={newPriceMsg !== "" ? true : false}
						/>
						<div className={classes.wrapper}>
							<Button
								variant="contained"
								color="primary"
								className={classes.addProductBtn}
								type="submit"
								size="large"
								disabled={isLoading}
							>
								Promoter le produit
							</Button>
							{isLoading && (
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
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={handlePromotionClose} color="primary">
						Annuler
					</Button>
				</DialogActions>
			</Dialog>
			{/*_________________Backdrop (LOADING...)________________*/}
			<Backdrop className={classes.backdrop} open={backdropOpen}>
				<CircularProgress size={60} thickness={5} color="primary" />
			</Backdrop>

			{/*____________________Alert Snackbar___________________*/}
			<Snackbar
				open={alertOpen}
				autoHideDuration={2500}
				onClose={handleAlertClose}
			>
				<Alert severity="success">
					<Typography>{msg}</Typography>
				</Alert>
			</Snackbar>

			{/*__________________Product Container__________________*/}
			<Container maxWidth="xl">
				<Typography variant="h5" className={classes.dashboardText}>
					List des produit
				</Typography>
				<Container
					maxWidth="xl"
					style={{
						backgroundColor: "white",
						borderRadius: 20,
						padding: 20,
					}}
					className="main"
				>
					<Typography variant="h6" className={classes.dashboardText}>
						Meuble
					</Typography>
					<Divider style={{ marginBottom: 10 }} />
					<Masonry
						breakpointCols={breakpoints}
						className="my-masonry-grid"
						columnClassName="my-masonry-grid_column"
						style={{ width: "100%" }}
					>
						{products.map(
							(product) =>
								product.categorie === "Meuble" && (
									<ProductCard
										product={product}
										handleClickEditOpen={handleClickEditOpen}
										handleDelete={handleDelete}
										handleArchive={handleArchive}
										handleReveal={handleReveal}
										handleClickPromotionOpen={handleClickPromotionOpen}
									/>
								)
						)}
					</Masonry>
				</Container>
				<Container
					maxWidth="xl"
					style={{
						backgroundColor: "white",
						borderRadius: 20,
						padding: 20,
					}}
					className="main"
				>
					<Typography variant="h6" className={classes.dashboardText}>
						Décoration
					</Typography>
					<Divider style={{ marginBottom: 10 }} />
					<Masonry
						breakpointCols={breakpoints}
						className="my-masonry-grid"
						columnClassName="my-masonry-grid_column"
						style={{ width: "100%" }}
					>
						{products.map(
							(product) =>
								product.categorie === "Décoration" && (
									<ProductCard
										product={product}
										handleClickEditOpen={handleClickEditOpen}
										handleDelete={handleDelete}
										handleArchive={handleArchive}
										handleReveal={handleReveal}
										handleClickPromotionOpen={handleClickPromotionOpen}
									/>
								)
						)}
					</Masonry>
				</Container>
				<Container
					maxWidth="xl"
					style={{
						backgroundColor: "white",
						borderRadius: 20,
						padding: 20,
					}}
					className="main"
				>
					<Typography variant="h6" className={classes.dashboardText}>
						Literie
					</Typography>
					<Divider style={{ marginBottom: 10 }} />
					<Masonry
						breakpointCols={breakpoints}
						className="my-masonry-grid"
						columnClassName="my-masonry-grid_column"
						style={{ width: "100%" }}
					>
						{products.map(
							(product) =>
								product.categorie === "Literie" && (
									<ProductCard
										product={product}
										handleClickEditOpen={handleClickEditOpen}
										handleDelete={handleDelete}
										handleArchive={handleArchive}
										handleReveal={handleReveal}
										handleClickPromotionOpen={handleClickPromotionOpen}
									/>
								)
						)}
					</Masonry>
				</Container>
				<Container
					maxWidth="xl"
					style={{
						backgroundColor: "white",
						borderRadius: 20,
						padding: 20,
					}}
					className="main"
				>
					<Typography variant="h6" className={classes.dashboardText}>
						Vaisselle
					</Typography>
					<Divider style={{ marginBottom: 10 }} />
					<Masonry
						breakpointCols={breakpoints}
						className="my-masonry-grid"
						columnClassName="my-masonry-grid_column"
						style={{ width: "100%" }}
					>
						{products.map(
							(product) =>
								product.categorie === "Vaisselle" && (
									<ProductCard
										product={product}
										handleClickEditOpen={handleClickEditOpen}
										handleDelete={handleDelete}
										handleArchive={handleArchive}
										handleReveal={handleReveal}
										handleClickPromotionOpen={handleClickPromotionOpen}
									/>
								)
						)}
					</Masonry>
				</Container>
				<Container
					maxWidth="xl"
					style={{
						backgroundColor: "white",
						borderRadius: 20,
						padding: 20,
					}}
					className="main"
				>
					<Typography variant="h6" className={classes.dashboardText}>
						Robots
					</Typography>
					<Divider style={{ marginBottom: 10 }} />
					<Masonry
						breakpointCols={breakpoints}
						className="my-masonry-grid"
						columnClassName="my-masonry-grid_column"
						style={{ width: "100%" }}
					>
						{products.map(
							(product) =>
								product.categorie === "Robots" && (
									<ProductCard
										product={product}
										handleClickEditOpen={handleClickEditOpen}
										handleDelete={handleDelete}
										handleArchive={handleArchive}
										handleReveal={handleReveal}
										handleClickPromotionOpen={handleClickPromotionOpen}
									/>
								)
						)}
					</Masonry>
				</Container>
			</Container>
		</Container>
	);
}
