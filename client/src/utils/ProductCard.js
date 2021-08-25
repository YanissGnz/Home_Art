import React from "react";
import {
	Card,
	CardActionArea,
	CardContent,
	Typography,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";

export default function ProductCard({ product }) {
	const [ratingValue, setRatingValue] = React.useState(0);

	React.useEffect(() => {
		setRatingValue(
			(5 * product.rating[4] +
				4 * product.rating[3] +
				3 * product.rating[2] +
				2 * product.rating[1] +
				1 * product.rating[0]) /
				(product.rating[0] +
					product.rating[1] +
					product.rating[2] +
					product.rating[3] +
					product.rating[4])
		);
	}, [product]);

	return (
		<a
			href={`/product/${product._id}`}
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
				{product.promoted && (
					<span className="ribbon r2">
						<span>Promo</span>
					</span>
				)}
				<CardActionArea disableRipple style={{ width: "100%", height: "100%" }}>
					<img
						style={{
							width: "100%",
							height: "200px",
							objectFit: "cover",
						}}
						src={`/uploads/${product.productImages[0]}`}
						alt="Product"
					/>
					<CardContent>
						<Typography
							gutterBottom
							style={{ fontSize: 18, fontWeight: 500 }}
							variant="h6"
							component="h2"
							noWrap={true}
						>
							{product.name}
						</Typography>
						<div style={{ display: "flex" }}>
							{product.promoted === true && (
								<Typography
									style={{ fontSize: 18, fontWeight: 600, marginRight: 5 }}
									gutterBottom
									color={product.promoted ? "textSecondary" : "primary"}
									className={product.promoted === true ? "old-price" : null}
								>
									{[product.oldPrice]} Da
								</Typography>
							)}
							<Typography
								style={{ fontSize: 18, fontWeight: 600 }}
								gutterBottom
								color="primary"
							>
								{[product.price]} Da
							</Typography>
						</div>
						<div style={{ display: "flex", alignItems: "center" }}>
							<Rating
								style={{ marginRight: 10 }}
								value={ratingValue.toFixed(2)}
								precision={0.5}
								readOnly
							/>
							<Typography
								variant="subtitle1
								"
								color="primary"
							>
								{product.ratingsNumber} Avis
							</Typography>
						</div>
					</CardContent>
				</CardActionArea>
			</Card>
		</a>
	);
}
