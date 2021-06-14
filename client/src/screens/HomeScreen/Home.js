import React from "react";
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
import Masonry from "react-masonry-css";

export default function Home(props) {
	const classes = useStyles();

	const dispatch = useDispatch();

	// Get token from localstorage
	const token = useSelector((state) => state.auth.token);
	const isLoading = useSelector((state) => state.auth.isLoading);
	const [products, setProducts] = React.useState([]);
	const [user, setUser] = React.useState(null);

	/*For The Masonary Container*/
	const breakpoints = {
		default: 4,
		1600: 3,
		1100: 2,
		700: 1,
	};

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
					setUser(res.data.user);
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
				.post("/products/get_products")
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch]);

	return (
		<div>
			{isLoading && (
				<CircularProgress size={80} thickness={5} className={classes.loader} />
			)}

			{!isLoading && (
				<div className="home_body">
					<CssBaseline />
					<MyAppBar cartLength={user ? user.cart.length : 0} />

					{/*                          Main Home Screen (Product Page)                          */}
					<Container maxWidth="xl" className="main">
						<Masonry
							breakpointCols={breakpoints}
							className="my-masonry-grid"
							columnClassName="my-masonry-grid_column"
							style={{ width: "100%" }}
						>
							{products.map((product) => (
								<Card style={{ width: 300, height: 300, marginRight: 30 }}>
									<a
										href={`/product/${product._id}`}
										style={{
											width: "22%",
											textDecoration: "none",
											marginRight: 10,
										}}
									>
										<CardActionArea disableRipple>
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
													color="textPrimary"
												>
													{product.name}
												</Typography>
												<Typography
													style={{ fontSize: 18, fontWeight: 600 }}
													gutterBottom
													color="primary"
												>
													{product.price} Da
												</Typography>
											</CardContent>
										</CardActionArea>
									</a>
								</Card>
							))}
						</Masonry>
					</Container>
					<Fotter />
				</div>
			)}
		</div>
	);
}
