import React from "react";
import axios from "axios";
import NumberFormat from "react-number-format";
import {
	Button,
	Card,
	CardMedia,
	Container,
	InputAdornment,
	MenuItem,
	TextField,
	Toolbar,
	Typography,
} from "@material-ui/core";
import { useStyles } from "../useStyles";

import "../adminPanel.css";

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
	const [categorie, setCategorie] = React.useState("");
	const [fileName, setFileName] = React.useState("");
	const [file, setFile] = React.useState("");
	const [product, setProduct] = React.useState(initialState);
	const [msg, setMsg] = React.useState("");

	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setProduct({ ...product, [name]: value });
	};
	const handleCategorieChange = (e) => {
		setCategorie(e.target.value);
		setProduct({ ...product, categorie: categorie });
	};
	function handleImageChange(e) {
		let url = URL.createObjectURL(e.target.files[0]);
		setFile(url);
		setFileName(e.target.files[0]);
		setProduct({ ...product, receipt: fileName });
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();

		formData.append("name", product.name);
		formData.append("brand", product.brand);
		formData.append("price", product.price);
		formData.append("stock", product.stock);
		formData.append("categorie", product.categorie);
		formData.append("description", product.description);
		formData.append("receipt", fileName);

		axios
			.post("/products/add_product", formData)
			.then((res) => setMsg(res.data.msg))
			.catch((err) => setMsg(err.msg));
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
					{msg && <Typography>{msg}</Typography>}
					<div className={classes.productInputContainer_2}>
						<TextField
							variant="filled"
							label="Nom de produit"
							name="name"
							onChange={handleChangeInput}
							className={classes.productInput}
							fullWidth
						/>
						<TextField
							variant="filled"
							label="Marque"
							name="brand"
							onChange={handleChangeInput}
							className={classes.productInput}
							fullWidth
						/>
						<TextField
							variant="filled"
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
						/>
						<TextField
							variant="filled"
							label="Nombre de stock"
							name="stock"
							onChange={handleChangeInput}
							InputProps={{
								inputComponent: StockFormat,
							}}
							className={classes.productInput}
							fullWidth
						/>
						<TextField
							select
							label="Categories"
							value={categorie}
							onChange={handleCategorieChange}
							className={classes.lastProductInput}
							variant="filled"
							fullWidth
						>
							{categories.map((option) => (
								<MenuItem key={option.value} value={option.value}>
									{option.value}
								</MenuItem>
							))}
						</TextField>
					</div>
					<TextField
						variant="filled"
						label="Descreption"
						name="description"
						onChange={handleChangeInput}
						fullWidth
						multiline
						rowsMax={6}
						className={classes.descriptionInput}
					/>
					<TextField
						id="outlined-full-width"
						label="Ajouter une image"
						name="upload-photo"
						accept="image/*"
						type="file"
						fullWidth
						InputLabelProps={{
							shrink: true,
						}}
						variant="filled"
						onChange={handleImageChange}
						className={classes.descriptionInput}
					/>
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
					<Button
						variant="contained"
						color="primary"
						className={classes.addProductBtn}
						type="submit"
						size="large"
					>
						Ajouter produit
					</Button>
				</form>
			</Container>
			<Container maxWidth="xl" className={classes.productInputContainer}>
				<Typography variant="h6" className={classes.dashboardText}>
					List des produit
				</Typography>
			</Container>
		</Container>
	);
}
