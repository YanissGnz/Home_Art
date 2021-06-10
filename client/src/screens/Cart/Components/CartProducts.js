import { Typography, Select, FormControl, IconButton } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import React from "react";

export default function UserCard({ product }) {
	const [state, setState] = React.useState(1);
	const handleChange = (event) => {
		setState(event.target.value);
	};

	return (
		<div
			style={{
				display: "flex",
				borderTop: "1px solid grey",
				borderBottom: "1px solid grey",
				alignItems: "center",
				padding: 10,
				position: "relative",
			}}
		>
			<IconButton style={{ position: "absolute", left: "95.4%", top: 10 }}>
				<ClearIcon />
			</IconButton>
			<div
				style={{
					display: "flex",
					width: "30%",
					height: "100%",
					alignItems: "center",
				}}
			>
				<img
					style={{
						width: 200,
						height: 200,
						objectFit: "contain",
						marginRight: 8,
					}}
					src={`/uploads/${product.productImages[0]}`}
					alt="product"
				/>
				<Typography variant="h6">{product.name}</Typography>
			</div>
			<FormControl variant="outlined" style={{ width: "23%", height: "100%" }}>
				<Select
					native
					value={state}
					onChange={handleChange}
					inputProps={{
						quantite: "state",
					}}
					style={{ width: 80, fontSize: 20 }}
				>
					<option value={1}>1</option>
					<option value={2}>2</option>
					<option value={3}>3</option>
					<option value={4}>4</option>
					<option value={5}>5</option>
					<option value={6}>6</option>
					<option value={7}>7</option>
					<option value={8}>8</option>
				</Select>
			</FormControl>
			<div style={{ width: "23%", height: "100%" }}>
				<Typography color="primary" style={{ fontWeight: 450, fontSize: 20 }}>
					{[
						product.price.slice(0, product.price.length - 3),
						" ",
						product.price.slice(product.price.length - 3),
					]}{" "}
					Da
				</Typography>
			</div>
			<div style={{ width: "23%", height: "100%" }}>
				<Typography color="primary" style={{ fontWeight: 450, fontSize: 20 }}>
					{parseInt(product.price) * state} Da
				</Typography>
			</div>
		</div>
	);
}
