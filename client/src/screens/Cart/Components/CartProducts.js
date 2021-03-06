import { Typography, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import { Tooltip } from "@material-ui/core";
export default function UserCard({
	item,
	handleRemoveItem,
	handleTotalPriceReduce,
	handleTotalPriceIncrease,
}) {
	const [product, setProduct] = React.useState({});
	const [image, setImage] = React.useState("");
	const [state, setState] = React.useState(item.quantity);
	const token = useSelector((state) => state.auth.token);
	const [loading, setLoading] = useState(false);

	const handleIncrement = async () => {
		// Headers
		const config = {
			headers: {
				"x-auth-token": token,
			},
		};
		setLoading(true);

		setState(state + 1);
		await axios
			.post(
				`/users/add_to_cart?id=${item.product._id.toString()}&type=single`,
				null,
				config
			)
			.then((res) => {
				setLoading(false);
				setState(res.data.quantity);
				handleTotalPriceIncrease(item.product.price);
			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
			});
	};
	const handleReduce = async () => {
		if (state > 1) {
			// Headers
			const config = {
				headers: {
					"x-auth-token": token,
				},
			};
			setLoading(true);
			setState(state - 1);
			await axios
				.post(
					`/users/reduce_quantity?id=${item.product._id.toString()}&type=single`,
					null,
					config
				)
				.then((res) => {
					if (res.data.msg === "La quantity de produit a été décrémenter.") {
						setState(res.data.quantity);
					}
					handleTotalPriceReduce(item.product.price);
					setLoading(false);
				})
				.catch((err) => {
					console.log(err);
					setLoading(false);
				});
		}
	};

	React.useEffect(() => {
		if (item) setProduct(item.product);
		if (item.product.productImages) setImage(item.product.productImages[0]);
	}, [item]);

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
			<Tooltip
				title="Retirer du panier"
				aria-label="delete"
				placement="left-center"
			>
				<IconButton
					style={{ position: "absolute", left: "95.4%", top: 10 }}
					onClick={() => {
						handleRemoveItem(item);
					}}
					disabled={loading}
					size="medium"
				>
					<DeleteOutlineOutlinedIcon />
				</IconButton>
			</Tooltip>
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
					src={`/uploads/${image}`}
					alt="product"
				/>
				<a
					href={`/product/${product._id}`}
					style={{
						color: "black",
						fontWeight: 450,
						overflow: "hidden",
						height: 200,
					}}
					className="fotter_links"
				>
					<Typography variant="h6">{product.name}</Typography>
				</a>
			</div>
			<div
				variant="outlined"
				style={{
					display: "flex",
					alignItems: "center",
					width: "23%",
					height: "100%",
				}}
			>
				<IconButton
					aria-label="add"
					size="large"
					onClick={handleReduce}
					style={{ marginRight: 10 }}
					disabled={loading}
				>
					<RemoveIcon fontSize="inherit" />
				</IconButton>
				<Typography variant="h6" color="textPrimary">
					{state}
				</Typography>
				<IconButton
					aria-label="add"
					size="large"
					style={{ marginLeft: 10 }}
					onClick={handleIncrement}
					disabled={loading}
				>
					<AddIcon fontSize="inherit" />
				</IconButton>
			</div>
			<div style={{ width: "23%", height: "100%" }}>
				<Typography color="primary" style={{ fontWeight: 450, fontSize: 20 }}>
					{product.price} Da
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
