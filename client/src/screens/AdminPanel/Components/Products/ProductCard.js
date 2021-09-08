import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import {
	Card,
	CardContent,
	CardHeader,
	Collapse,
	IconButton,
	Menu,
	MenuItem,
	Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";

import clsx from "clsx";
import "../../adminPanel.css";
import { useStyles } from "../../useStyles";
import TrendingDownRoundedIcon from "@material-ui/icons/TrendingDownRounded";
export default function ProductCard({
	product,
	handleClickEditOpen,
	handleDelete,
	handleArchive,
	handleReveal,
	handleClickPromotionOpen,
}) {
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

	const slideProperties = {
		canSwipe: false,
	};

	const images = [];
	product.productImages.forEach((image, index) =>
		images.push(`/uploads/${product.productImages[index]}`)
	);

	return (
		<Card
			elevation={4}
			className={
				product.archived ? classes.archivedproductCard : classes.productCard
			}
		>
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
									handleDelete(product._id, product.productImage);
								}}
							>
								<DeleteOutlined fontSize="small" className={classes.MenuIcon} />
								Supprimer
							</MenuItem>
							{product.archived && (
								<MenuItem
									onClick={() => {
										handleMenuClose();
										handleReveal(product._id);
									}}
								>
									<VisibilityOutlinedIcon
										fontSize="small"
										className={classes.MenuIcon}
									/>
									Faire apparaître
								</MenuItem>
							)}
							{!product.archived && (
								<MenuItem
									onClick={() => {
										handleMenuClose();
										handleArchive(product._id);
									}}
								>
									<VisibilityOffOutlinedIcon
										fontSize="small"
										className={classes.MenuIcon}
									/>
									Se cacher
								</MenuItem>
							)}
							<MenuItem
								onClick={() => {
									handleMenuClose();
									handleClickEditOpen(product);
								}}
							>
								<EditOutlinedIcon
									fontSize="small"
									className={classes.MenuIcon}
								/>
								Modifier
							</MenuItem>
							<MenuItem
								onClick={() => {
									handleMenuClose();
									handleClickPromotionOpen(product._id);
								}}
							>
								<TrendingDownRoundedIcon
									fontSize="small"
									className={classes.MenuIcon}
								/>
								Promotion
							</MenuItem>
						</Menu>
					</div>
				}
				title={product.name}
				subheader={product.subCategorie}
			/>

			<CardContent className={classes.productCardContent}>
				{images.length > 1 ? (
					<Slide autoplay={false} {...slideProperties}>
						{images.map((each, index) => (
							<img
								key={index}
								style={{ width: "100%", height: "100%" }}
								src={each}
								alt="product"
								className="product_image"
							/>
						))}
					</Slide>
				) : (
					<img
						key={0}
						style={{ width: "100%", height: "100%" }}
						src={images[0]}
						alt="product"
						className="product_image"
					/>
				)}

				<Typography variant="body1" className={classes.padding}>
					Prix: {product.price} Da
				</Typography>
				<Typography variant="body1" className={classes.padding}>
					Stock: {product.stock} unité(s)
				</Typography>
				<div className={classes.productCardActionDiv}>
					<Typography variant="body1">Description</Typography>
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
				</div>
				<Collapse
					in={expanded}
					timeout="auto"
					unmountOnExit
					className={classes.productDescriptionWrapper}
				>
					<Typography
						variant="body2"
						variantMapping="span"
						className={classes.productDescription}
						display="inline"
					>
						{product.description}
					</Typography>
				</Collapse>
			</CardContent>
		</Card>
	);
}
