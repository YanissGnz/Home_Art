import React from "react";
import clsx from "clsx";
import {
	CardActionArea,
	CardHeader,
	makeStyles,
	Menu,
	Typography,
	IconButton,
	Collapse,
	Tooltip,
	Card,
	CardContent,
	MenuItem,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Masonry from "react-masonry-css";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";

/*For The Masonary Container*/
const breakpoints = {
	default: 4,
	1100: 3,
	700: 1,
};

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
	},
	media: {
		height: 0,
		paddingTop: "56.25%", // 16:9
	},
	expand: {
		transform: "rotate(0deg)",
		marginLeft: "auto",
		transition: theme.transitions.create("transform", {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: "rotate(180deg)",
	},
	MenuIcon: {
		marginRight: 5,
	},
}));

export default function OrderContainer({ order, handleCancelOrder }) {
	const classes = useStyles();

	const [expanded, setExpanded] = React.useState(false);
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	const handleMenuClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	return (
		<Card style={{ width: "100%" }} variant="outlined">
			<CardHeader
				action={
					<div>
						<IconButton aria-label="settings" onClick={handleMenuClick}>
							<MoreVertIcon />
						</IconButton>
						<Menu
							id="simple-menu"
							anchorEl={anchorEl}
							keepMounted
							open={Boolean(anchorEl)}
							onClose={handleMenuClose}
						>
							<MenuItem
								onClick={() => {
									handleMenuClose();
									handleCancelOrder(order);
								}}
							>
								<ClearRoundedIcon
									fontSize="small"
									className={classes.MenuIcon}
								/>
								Annuler
							</MenuItem>
						</Menu>
					</div>
				}
				subheader={`ID : ${order._id}`}
			/>
			<CardContent style={{ paddingTop: 0 }}>
				<div
					style={{
						display: "inline-flex",
						marginRight: 20,
						marginTop: 10,
					}}
				>
					<Typography
						style={{
							fontSize: 16,
							fontWeight: 450,
							marginRight: 5,
						}}
					>
						Date de commande :
					</Typography>
					<Typography
						style={{
							fontSize: 16,
						}}
					>
						{order.date}
					</Typography>
				</div>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Typography color="primary" style={{ fontSize: 18, fontWeight: 450 }}>
						Informations de livraison
					</Typography>
				</div>
				<div style={{ display: "flex" }}>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							marginRight: 20,
						}}
					>
						<Typography
							style={{
								fontSize: 16,
								fontWeight: 450,
								marginTop: 5,
							}}
						>
							{order.user.name} {order.user.last_name}
						</Typography>
						<Typography style={{ fontSize: 16, marginTop: 5 }}>
							+213 {order.user.phoneNumber}
						</Typography>

						<Typography style={{ fontSize: 16, marginTop: 5 }}>
							{order.deliveryAddress.address}, {order.deliveryAddress.ville},{" "}
							{order.deliveryAddress.region}, {order.deliveryMode}
						</Typography>
					</div>
				</div>

				<div
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Typography
						color="primary"
						style={{
							fontSize: 18,
							fontWeight: 450,
							marginTop: 10,
						}}
					>
						Informations de paiment
					</Typography>
				</div>
				<div style={{ display: "flex", flexDirection: "column" }}>
					<div
						style={{
							display: "inline-flex",
							marginRight: 20,
							marginTop: 10,
						}}
					>
						<Typography
							style={{
								fontSize: 16,
								fontWeight: 450,
								marginRight: 5,
							}}
						>
							Mode de paiment :
						</Typography>
						<Typography
							style={{
								fontSize: 16,
							}}
						>
							{order.paymentMethod}
						</Typography>
					</div>
					<div style={{ display: "inline-flex", marginTop: 5 }}>
						<Typography
							style={{
								fontSize: 16,
								fontWeight: 450,
								marginRight: 5,
							}}
						>
							Montant de livraison :
						</Typography>
						<Typography
							style={{
								fontSize: 16,
							}}
						>
							600 Da
						</Typography>
					</div>
					<div style={{ display: "inline-flex", marginTop: 5 }}>
						<Typography
							style={{
								fontSize: 16,
								fontWeight: 450,
								marginRight: 5,
							}}
						>
							Total :
						</Typography>
						<Typography
							color="primary"
							style={{
								fontSize: 16,
								fontWeight: 500,
							}}
						>
							{order.totalPrice} Da
						</Typography>
					</div>
					<div style={{ display: "inline-flex", marginTop: 5 }}>
						<Typography
							style={{
								fontSize: 16,
								fontWeight: 450,
								marginRight: 5,
							}}
						>
							Etat de commande :
						</Typography>
						<Typography
							color={order.isValidated ? "secondary" : "error"}
							style={{
								fontSize: 16,
								fontWeight: 450,
							}}
						>
							{order.isValidated ? "Valider" : "Pas valider"}
						</Typography>
					</div>
					<div style={{ display: "inline-flex", marginTop: 5 }}>
						<Typography
							style={{
								fontSize: 16,
								fontWeight: 450,
								marginRight: 5,
							}}
						>
							Etat de paiment :
						</Typography>
						<Typography
							color={order.isPaid ? "secondary" : "error"}
							style={{
								fontSize: 16,
								fontWeight: 450,
							}}
						>
							{order.isPaid ? "Payer" : "Pas Payer"}
						</Typography>
					</div>
					<div style={{ display: "inline-flex", marginTop: 5 }}>
						<Typography
							style={{
								fontSize: 16,
								fontWeight: 450,
								marginRight: 5,
							}}
						>
							Etat de laivraison :
						</Typography>
						<Typography
							color={order.isDelivered ? "secondary" : "error"}
							style={{
								fontSize: 16,
								fontWeight: 450,
							}}
						>
							{order.isDelivered ? "remis" : "non remis"}
						</Typography>
					</div>
					<Tooltip
						title="Afficher les produit commander"
						aria-label="add"
						placement="left"
					>
						<IconButton
							className={clsx(classes.expand, {
								[classes.expandOpen]: expanded,
							})}
							onClick={handleExpandClick}
							aria-expanded={expanded}
							aria-label="show more"
						>
							<ExpandMoreIcon />
						</IconButton>
					</Tooltip>
				</div>
			</CardContent>

			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>
					<Typography
						color="primary"
						style={{ fontSize: 18, fontWeight: 450, marginBottom: 10 }}
					>
						Les produit commander
					</Typography>
					<Masonry
						breakpointCols={breakpoints}
						className="my-masonry-grid"
						columnClassName="my-masonry-grid_column"
						style={{ width: "100%", overflow: "auto", height: "70%" }}
					>
						{order.products.map((product) => (
							<a
								href={`/product/${product.product._id}`}
								style={{
									width: "19%",
									textDecoration: "none",
									marginRight: 15,
								}}
							>
								<Card
									style={{
										width: "100%",
										marginRight: 30,
										position: "relative",
										overflow: "visible",
									}}
								>
									{product.product.promoted && (
										<span className="ribbon r2">
											<span>Promo</span>
										</span>
									)}
									<CardActionArea
										disableRipple
										style={{ width: "100%", height: "100%" }}
									>
										<img
											style={{
												width: "100%",
												height: "150px",
												objectFit: "cover",
											}}
											src={`/uploads/${product.product.productImages[0]}`}
											alt="Product"
										/>
										<CardContent style={{ padding: 10 }}>
											<Typography
												gutterBottom
												style={{ fontSize: 18, fontWeight: 500 }}
												variant="h6"
												component="h2"
												noWrap={true}
											>
												{product.product.name}
											</Typography>
											<div style={{ display: "flex" }}>
												{product.product.promoted === true && (
													<Typography
														style={{
															fontSize: 18,
															fontWeight: 600,
															marginRight: 5,
														}}
														gutterBottom
														color={
															product.product.promoted
																? "textSecondary"
																: "primary"
														}
														className={
															product.product.promoted === true
																? "old-price"
																: null
														}
													>
														{[product.product.oldPrice]} Da
													</Typography>
												)}
												<Typography
													style={{ fontSize: 18, fontWeight: 600 }}
													gutterBottom
													color="primary"
												>
													{[product.product.price]} Da
												</Typography>
											</div>
										</CardContent>
									</CardActionArea>
								</Card>
							</a>
						))}
					</Masonry>
				</CardContent>
			</Collapse>
		</Card>
	);
}
