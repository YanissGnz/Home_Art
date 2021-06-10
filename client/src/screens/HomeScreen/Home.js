import React from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
	dispatchUserError,
	dispatchUserLoaded,
	dispatchUserLoading,
} from "../../redux/actions/authAction";
import {
	Card,
	CardActionArea,
	CardContent,
	CircularProgress,
	Container,
	CssBaseline,
	Typography,
} from "@material-ui/core";

import { useStyles } from "./useStyles";
import axios from "axios";
import { returnErrors } from "../../redux/actions/errAction";
import "./Home.css";
import {
	productErrors,
	productLoading,
	productsLoaded,
} from "../../redux/actions/productsAction";
import MyAppBar from "../../utils/AppBar";
import Fotter from "../../utils/Fotter";

export default function Home(props) {
	const classes = useStyles();

	const history = useHistory();
	const dispatch = useDispatch();

	// Get token from localstorage
	const token = useSelector((state) => state.auth.token);
	const isLoading = useSelector((state) => state.auth.isLoading);
	const [products, setProducts] = React.useState([]);

	React.useEffect(() => {
		const loadUser = async () => {
			dispatch(dispatchUserLoading());

			// Headers
			const config = {
				headers: {
					"x-auth-token": token,
				},
			};

			await axios
				.get("/users/load_User", config)
				.then((res) => {
					dispatch(dispatchUserLoaded(res));
				})
				.catch((err) => {
					dispatch(dispatchUserError());
					dispatch(returnErrors(err.response.data.msg, err.response.status));
				});
		};
		loadUser();
	}, [dispatch, token]);

	React.useEffect(() => {
		const loadProduct = async () => {
			function shuffle(array) {
				array.sort(() => Math.random() - 0.5);
			}
			dispatch(productLoading());
			await axios
				.get("/products/get_products")
				.then((res) => {
					dispatch(productsLoaded(res));
					setProducts(res.data.Products);
					shuffle(products);
				})
				.catch((err) => {
					dispatch(productErrors());
					console.log(err);
				});
		};
		loadProduct();
	});

	return (
		<div>
			{isLoading && (
				<CircularProgress size={80} thickness={5} className={classes.loader} />
			)}

			{!isLoading && (
				<div className="home_body">
					<CssBaseline />
					<MyAppBar />

					{/*                          Main Home Screen (Product Page)                          */}
					<Container maxWidth="xl" className="main">
						<Container
							maxWidth="xl"
							style={{ height: 500, display: "flex", flexDirection: "row" }}
						>
							{products.map((product) => (
								// product.categorie === "Electroménager" &&
								<Card style={{ width: 300, height: 300, marginRight: 30 }}>
									<CardActionArea
										disableRipple
										onClick={() => history.push(`/product/${product._id}`)}
									>
										<img
											style={{ width: "100%", maxHeight: "200px" }}
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
											<Typography
												style={{ fontSize: 18, fontWeight: 600 }}
												gutterBottom
												color="primary"
											>
												{[
													product.price.slice(0, product.price.length - 3),
													" ",
													product.price.slice(product.price.length - 3),
												]}{" "}
												Da
											</Typography>
										</CardContent>
									</CardActionArea>
								</Card>
							))}
						</Container>
					</Container>
				</div>
			)}
			<Fotter />
		</div>
	);
}
