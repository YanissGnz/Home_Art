import React from "react";
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

export default function ProductsScreen() {
	const classes = useStyles();
	const [categorie, setCategorie] = React.useState("");
	const [file, setFile] = React.useState("");

	function handleImageChange(e) {
		let url = URL.createObjectURL(e.target.files[0]);
		setFile(url);
	}

	const handleChange = (event) => {
		setCategorie(event.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
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
				<form onSubmit={handleSubmit} className={classes.productForm}>
					<div className={classes.productInputContainer_2}>
						<TextField
							variant="filled"
							label="Nom de produit"
							className={classes.productInput}
							fullWidth
						/>
						<TextField
							variant="filled"
							label="Marque"
							className={classes.productInput}
							fullWidth
						/>
						<TextField
							variant="filled"
							label="Prix	"
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
							onChange={handleChange}
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
