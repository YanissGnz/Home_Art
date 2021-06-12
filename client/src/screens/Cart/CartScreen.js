import {
	Button,
	Card,
	CardContent,
	Container,
	Divider,
	Typography,
} from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import EmptyCart from "../../Icons/EmptyCart";
import {
	dispatchUserError,
	dispatchUserLoaded,
	dispatchUserLoading,
} from "../../redux/actions/authAction";
import MyAppBar from "../../utils/AppBar";
import Fotter from "../../utils/Fotter";
import CartProducts from "./Components/CartProducts";

export default function CartScreen() {
	const dispatch = useDispatch();
	const history = useHistory();
	const token = useSelector((state) => state.auth.token);

	//Jib l panier men State ta3 redux  ana dert haka berk bache nseyi
	//Jib l panier men State ta3 redux  ana dert haka berk bache nseyi
	//Jib l panier men State ta3 redux  ana dert haka berk bache nseyi
	/*bedlo hadi tweli state.auth.user.cart --->*/ const cart = useSelector(
		//state.auth.user.cart
		(state) => state.products.products
	);

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
					//dispatch(returnErrors(err.response.data.msg, err.response.status));
				});
		};
		loadUser();
	}, [dispatch, token]);

	return (
		<div style={{ background: "#f1f1f1" }}>
			<MyAppBar />
			{cart.length === 0 ? (
				//Hadi ki ykon l panier faregh
				<Container
					maxWidth="xl"
					style={{
						marginTop: 50,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						padding: 80,
					}}
				>
					<EmptyCart />
					<Typography
						variant="h5"
						style={{
							marginTop: 20,
							fontSize: 28,
							fontWeight: 550,
						}}
					>
						Votre panier est vide!
					</Typography>
					<Typography
						style={{
							marginTop: 20,
							fontSize: 25,
							fontWeight: 400,
						}}
					>
						Vous avez déjà un compte?{" "}
						<a
							href="/login"
							title="Connecter vous"
							style={{ color: "#F58634" }}
						>
							Connecter vous
						</a>{" "}
						pour voir votre panier
					</Typography>
					<Button
						variant="contained"
						color="primary"
						size="large"
						style={{
							marginTop: 20,
							width: 300,
							color: "white",
							textTransform: "none",
							fontSize: 16,
						}}
						onClick={() => history.push("/")}
					>
						Commancer vos achats
					</Button>
					<Container
						maxWidth="xl"
						style={{
							backgroundColor: "white",
							borderRadius: 20,
							padding: 20,
							marginTop: 50,
						}}
						className="main"
					>
						<Typography
							style={{ marginBottom: 10, fontWeight: 500 }}
							variant="h5"
						>
							Voir aussi
						</Typography>
						<Divider style={{ marginBottom: 10 }} />
						<div
							style={{
								display: "flex",
								width: "100%",
							}}
						></div>
					</Container>
				</Container>
			) : (
				//Hadi ki ykon l panier m3amer
				<Container
					maxWidth="xl"
					style={{
						marginTop: 50,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						padding: 80,
					}}
				>
					<Container maxWidth="xl" style={{ display: "flex" }}>
						<Card
							style={{
								width: "100%",
								margin: 0,
							}}
							variant="outlined"
						>
							<CardContent
								style={{
									display: "flex",
									flexDirection: "row",
									position: "relative",
									height: 20,
								}}
							>
								<Typography
									style={{ width: "30%", fontSize: 22, fontWeight: 400 }}
									variant="h5"
								>
									Produit
								</Typography>
								<Typography
									style={{ width: "23%", fontSize: 22, fontWeight: 400 }}
									variant="h5"
								>
									Quantité
								</Typography>
								<Typography
									style={{ width: "23%", fontSize: 22, fontWeight: 400 }}
									variant="h5"
								>
									Prix unitaire
								</Typography>
								<Typography
									style={{
										width: "23%",
										fontSize: 22,
										fontWeight: 400,
									}}
									variant="h5"
								>
									Prix total
								</Typography>
							</CardContent>
							{cart.map((product) => (
								<CartProducts product={product} />
							))}
						</Card>
					</Container>
					<Button
						variant="contained"
						color="primary"
						size="large"
						style={{
							marginTop: 20,
							width: 300,
							color: "white",
							textTransform: "none",
							fontSize: 16,
						}}
					>
						Valider vos achats
					</Button>
					<Container
						maxWidth="xl"
						style={{
							backgroundColor: "white",
							borderRadius: 20,
							padding: 20,
							marginTop: 50,
						}}
						className="main"
					>
						<Typography
							style={{ marginBottom: 10, fontWeight: 500 }}
							variant="h5"
						>
							Voir aussi
						</Typography>
						<Divider style={{ marginBottom: 10 }} />
						<div
							style={{
								display: "flex",
								width: "100%",
							}}
						></div>
					</Container>
				</Container>
			)}
			<Fotter />
		</div>
	);
}
