import {
	Typography,
	IconButton,
	Backdrop,
	CircularProgress,
	makeStyles,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import ClearIcon from "@material-ui/icons/Clear";
import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: "#fff",
	},
}));

export default function UserCard({ item, handleRemoveItem }) {
	const classes = useStyles();
	const [product, setProduct] = React.useState({});
	const [image, setImage] = React.useState("");
	const [state, setState] = React.useState(item.quantity);
	const token = useSelector((state) => state.auth.token);
	const [open, setOpen] = React.useState(false);

	const handleClose = () => {
		setOpen(false);
	};
	const handleToggle = () => {
		setOpen(!open);
	};

	const handleIncrement = async () => {
		handleToggle();
		// Headers
		const config = {
			headers: {
				"x-auth-token": token,
			},
		};
		await axios
			.post(
				`/users/add_to_cart?id=${item.product._id.toString()}&type=single`,
				null,
				config
			)
			.then((res) => {
				setState(state + 1);
				handleClose();
			})
			.catch((err) => {
				console.log(err);
				handleClose();
			});
	};
	const handleReduce = async () => {
		if (state > 1) {
			handleToggle();

			// Headers
			const config = {
				headers: {
					"x-auth-token": token,
				},
			};
			await axios
				.post(
					`/users/reduce_quantity?id=${item.product._id.toString()}&type=single`,
					null,
					config
				)
				.then((res) => {
					if (res.data.msg === "La quantity de produit a été décrémenter.") {
						setState(state - 1);
					}
					handleClose();
				})
				.catch((err) => {
					console.log(err);
					handleClose();
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
			<Backdrop className={classes.backdrop} open={open}>
				<CircularProgress color="primary" />
			</Backdrop>
			<IconButton
				style={{ position: "absolute", left: "95.4%", top: 10 }}
				onClick={() => {
					handleRemoveItem(item);
				}}
			>
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
					src={`/uploads/${image}`}
					alt="product"
				/>
				<a
					href={`/product/${product._id}`}
					style={{ color: "black", fontWeight: 450 }}
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
