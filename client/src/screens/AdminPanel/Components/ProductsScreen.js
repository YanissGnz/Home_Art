import React from "react";
import NumberFormat from "react-number-format";
import {
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
		value: "USD",
	},
	{
		value: "EUR",
	},
	{
		value: "BTC",
	},
	{
		value: "JPY",
	},
];

export default function ProductsScreen() {
	const classes = useStyles();
	const [categorie, setCategorie] = React.useState("EUR");

	const handleChange = (event) => {
		setCategorie(event.target.value);
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
						className={classes.productInput}
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
					multiline
					rowsMax={6}
					className={classes.descriptionInput}
				/>
			</Container>
		</Container>
	);
}
