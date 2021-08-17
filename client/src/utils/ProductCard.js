import React from "react";
import {
	Card,
	CardActionArea,
	CardContent,
	Typography,
} from "@material-ui/core";

export default function ProductCard({ product }) {
	return (
		<a
			href={`/product/${product._id}`}
			style={{
				width: "19%",
				textDecoration: "none",
				marginRight: 15,
			}}
		>
			<Card style={{ width: "100%", height: 300, marginRight: 30 }}>
				<CardActionArea disableRipple style={{ width: "100%", height: "100%" }}>
					<img
						style={{
							width: "100%",
							maxHeight: "200px",
							objectFit: "contain",
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
									style={{ fontSize: 18, fontWeight: 600, marginRight: 10 }}
									gutterBottom
									color="primary"
								>
									{[
										product.newPrice.slice(0, product.price.length - 3),
										" ",
										product.newPrice.slice(product.price.length - 3),
									]}{" "}
									Da
								</Typography>
							)}
							<Typography
								style={{ fontSize: 18, fontWeight: 600 }}
								gutterBottom
								color="primary"
								className={product.promoted === true ? "old-price" : null}
							>
								{[
									product.price.slice(0, product.price.length - 3),
									" ",
									product.price.slice(product.price.length - 3),
								]}{" "}
								Da
							</Typography>
						</div>
					</CardContent>
				</CardActionArea>
			</Card>
		</a>
	);
}
