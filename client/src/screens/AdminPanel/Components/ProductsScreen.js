import React from "react";
import axios from "axios";
import NumberFormat from "react-number-format";
import {
	Button,
	Card,
	CardMedia,
	CircularProgress,
	Container,
	InputAdornment,
	MenuItem,
	TextField,
	Toolbar,
	Typography,
	useTheme,
} from "@material-ui/core";
import { useStyles } from "../useStyles";

import "../adminPanel.css";
import { useDispatch, useSelector } from "react-redux";
import { returnErrors } from "../../../redux/actions/errAction";

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
	{
		value: "Electroménager",
	},
	{
		value: "Meuble",
	},
	{
		value: "Visselle",
	},
	{
		value: "Décoration",
	},
	{
		value: "Litterie",
	},
];

const initialState = {
	name: "",
	brand: "",
	price: "",
	stock: 0,
	categorie: "",
	description: "",
	receipt: "",
};

export default function ProductsScreen() {
	const classes = useStyles();
	const [product, setProduct] = React.useState(initialState);
	const [categorie, setCategorie] = React.useState("");
	const [fileName, setFileName] = React.useState("");
	const [file, setFile] = React.useState("");
	const [msg, setMsg] = React.useState("");
	const [isLoading, setIsLoading] = React.useState(false);

	const dispatch = useDispatch();
	const token = useSelector((state) => state.auth.token);
	const nameMsg = useSelector((state) => state.err);
	const brandMsg = useSelector((state) => state.err);
	const priceMsg = useSelector((state) => state.err);
	const stockMsg = useSelector((state) => state.err);
	const categorieMsg = useSelector((state) => state.err);
	const descriptionMsg = useSelector((state) => state.err);
	let imageMsg = useSelector((state) => state.err);

	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setProduct({ ...product, [name]: value });
	};
	const handleCategorieChange = (e) => {
		setCategorie(e.target.value);
		setProduct({ ...product, categorie: e.target.value });
	};
	function handleImageChange(e) {
		let url = URL.createObjectURL(e.target.files[0]);
		setFile(url);
		setFileName(e.target.files[0]);
		setProduct({ ...product, receipt: fileName });
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		setMsg("");

		//Header
		const config = {
			headers: {
				"x-auth-token": token,
			},
		};

		const formData = new FormData();

		formData.append("name", product.name);
		formData.append("brand", product.brand);
		formData.append("price", product.price);
		formData.append("stock", product.stock);
		formData.append("categorie", product.categorie);
		formData.append("description", product.description);
		formData.append("receipt", fileName);

		axios
			.post("/products/add_product", formData, config)
			.then((res) => {
				setIsLoading(false);
				setMsg(res.data.msg);
				imageMsg.msg = "";
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

	return (
		<Container maxWidth="xl" className="dashbord_container">
			<Toolbar />

			<Typography variant="h5" className={classes.dashboardText}>
				Produit
			</Typography>
			<Typography variant="h6" className={classes.dashboardText}>
				Ajouter un produit
			</Typography>

			<Container maxWidth="xl" className={classes.productInputContainer}>
				<form
					onSubmit={handleSubmit}
					className={classes.productForm}
					encType="multipart/form-data"
				>
					<div className={classes.productInputContainer_2}>
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
									<InputAdornment position="start">DZD</InputAdornment>
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
							className={classes.productInput}
							fullWidth
							helperText={stockMsg.id === 3 ? stockMsg.msg : null}
							error={stockMsg.id === 3 ? true : false}
						/>
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
						>
							{categories.map((option) => (
								<MenuItem key={option.value} value={option.value}>
									{option.value}
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
								Ajouter une image
							</Button>
						</label>
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
					{file.length > 0 && (
						<Card className={classes.imageCard} variant="outlined">
							<CardMedia
								component="img"
								alt="Image Produit"
								image={file}
								title="Image Produit"
							/>
						</Card>
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
							<CircularProgress size={24} className={classes.buttonProgress} />
						)}
						{msg && (
							<Typography className={classes.successMsg}>{msg}</Typography>
						)}
					</div>
				</form>
			</Container>
			<Container maxWidth="xl">
				<Typography variant="h6" className={classes.dashboardText}>
					List des produit
				</Typography>
			</Container>
		</Container>
	);
}
