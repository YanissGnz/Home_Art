import {
	CardContent,
	CardActionArea,
	Card,
	CardActions,
	Button,
	Typography,
} from "@material-ui/core";

import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { productErrors } from "../redux/actions/productsAction";
export default function FavoritesProductContainer({
	product_id,
	handleDelete,
}) {
	const dispatch = useDispatch();
	const history = useHistory();
	const [product, setProduct] = React.useState({});
	const [productImage, setProductImage] = React.useState(null);

	React.useEffect(() => {
		const loadProduct = async () => {
			await axios
				.get(`/products/get_product_by_id?id=${product_id}&type=single`)
				.then((res) => {
					setProduct(res.data.product[0]);
					setProductImage(res.data.product[0].productImages[0]);
				})
				.catch((err) => {
					dispatch(productErrors(err));
					console.log(err);
				});
		};
		loadProduct();
	}, [dispatch, product_id]);

	return (
		<Card>
			<CardActionArea onClick={() => history.push(`/product/${product_id}`)}>
				<img
					style={{
						width: "100%",
						height: 200,
						objectFit: "contain",
						marginRight: 8,
					}}
					src={`/uploads/${productImage}`}
					alt="product"
				/>
				<CardContent>
					<Typography variant="body1">{product.name}</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Button
					size="small"
					color="primary"
					style={{ textTransform: "none" }}
					onClick={() => handleDelete(product_id)}
				>
					Retirer
				</Button>
			</CardActions>
		</Card>
	);
}
