import React from "react";
import MyAppBar from "../../utils/AppBar";
import Fotter from "../../utils/Footer";
import {
	Container,
	CssBaseline,
	Typography,
	ButtonGroup,
	Button,
	Divider,
} from "@material-ui/core";

import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import PinDropOutlinedIcon from "@material-ui/icons/PinDropOutlined";
import VpnKeyOutlinedIcon from "@material-ui/icons/VpnKeyOutlined";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";

import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
	dispatchUserError,
	dispatchUserLoaded,
} from "../../redux/actions/authAction";
import axios from "axios";
import FavoritesProductContainer from "../../utils/FavoritesProductContainer";
import Masonry from "react-masonry-css";

export default function Profile() {
	const history = useHistory();
	const dispatch = useDispatch();
	const token = useSelector((state) => state.auth.token);
	const [user, setUser] = React.useState(null);
	const [favorites, setFavorites] = React.useState([]);

	/*For The Masonary Container*/
	const breakpoints = {
		default: 3,
		1100: 2,
		700: 1,
	};

	React.useEffect(() => {
		const loadUser = async () => {
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
					setFavorites(res.data.user.favoriteProducts);
					setUser(res.data.user);
				})
				.catch((err) => {
					dispatch(dispatchUserError());
				});
		};
		loadUser();
	}, [dispatch, token]);

	const handleDelete = async (product_id) => {
		// Headers
		const config = {
			headers: {
				"x-auth-token": token,
			},
		};

		await axios
			.post(`/users/remove_from_favorite/${product_id}`, null, config)
			.then((res) => {
				setFavorites(res.data.favoriteProducts);
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

	return (
		<div>
			<div className="profile_body">
				<CssBaseline />
				<MyAppBar cartLength={user ? user.cart.length : 0} />
				<Container
					maxWidth="lg"
					style={{
						backgroundColor: "white",
						borderRadius: 20,
						height: 700,
						marginTop: 20,
						display: "flex",
						flexDirection: "row",
						padding: 0,
						overflow: "hidden",
					}}
					className="main"
				>
					<div
						style={{
							width: "25%",
							marginRight: 10,
							borderRight: "1px solid #acacac",
							display: "flex",
							alignItems: "flex-start",
							justifyContent: "center",
						}}
					>
						<ButtonGroup
							orientation="vertical"
							variant="text"
							size="large"
							fullWidth
							disableRipple
						>
							<Button
								style={{
									textTransform: "none",
									fontSize: 17,
									fontWeight: 450,
									height: 80,
									display: "flex",
									justifyContent: "flex-start",
									padding: 20,
								}}
								startIcon={<InfoOutlinedIcon style={{ fontSize: 30 }} />}
								onClick={() => history.push("/profile/info")}
							>
								Informations personnelles
							</Button>
							<Button
								style={{
									textTransform: "none",
									fontSize: 18,
									fontWeight: 450,
									height: 80,
									display: "flex",
									justifyContent: "flex-start",
									padding: 20,
								}}
								color="primary"
								startIcon={
									<FavoriteBorderOutlinedIcon
										style={{ fontSize: 30 }}
										color="primary"
									/>
								}
							>
								Produit favoris
							</Button>
							<Button
								style={{
									textTransform: "none",
									fontSize: 18,
									fontWeight: 450,
									height: 80,
									display: "flex",
									justifyContent: "flex-start",
									padding: 20,
								}}
								startIcon={<CheckBoxOutlinedIcon style={{ fontSize: 30 }} />}
								onClick={() => history.push("/profile/commandes")}
							>
								Commandes
							</Button>
							<Button
								style={{
									textTransform: "none",
									fontSize: 18,
									fontWeight: 450,
									height: 80,
									display: "flex",
									justifyContent: "flex-start",
									padding: 20,
								}}
								startIcon={<PinDropOutlinedIcon style={{ fontSize: 30 }} />}
								onClick={() => history.push("/profile/addresses")}
							>
								Addresses
							</Button>
							<Button
								style={{
									textTransform: "none",
									fontSize: 18,
									fontWeight: 450,
									height: 80,
									display: "flex",
									justifyContent: "flex-start",
									padding: 20,
								}}
								startIcon={<VpnKeyOutlinedIcon style={{ fontSize: 30 }} />}
								onClick={() => history.push("/profile/password")}
							>
								Modifier le mot de passe
							</Button>
						</ButtonGroup>
					</div>
					<div
						style={{
							width: "75%",
							margin: 0,
							position: "relative",
							padding: 30,
						}}
					>
						<div
							style={{
								width: "99%",
								height: "100%",
								display: "flex",
								flexDirection: "column",
								marginTop: 50,
							}}
						>
							<Typography variant="h5" style={{ marginBottom: 20 }}>
								Vos produit favoris
							</Typography>
							<Divider style={{ marginBottom: 50 }} />
							{favorites.length === 0 ? (
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										height: "70%",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<FavoriteOutlinedIcon
										style={{
											fontSize: 100,
											marginBottom: 20,
										}}
										color="disabled"
									/>
									<Typography variant="h5" color="textSecondary">
										Vous n'avez pas des produit favoris
									</Typography>
								</div>
							) : (
								<Masonry
									breakpointCols={breakpoints}
									className="my-masonry-grid"
									columnClassName="my-masonry-grid_column"
									style={{ width: "100%", overflow: "auto", height: "70%" }}
								>
									{favorites.map((product_id) => (
										<div>
											<FavoritesProductContainer
												product_id={product_id}
												handleDelete={handleDelete}
											/>
										</div>
									))}
								</Masonry>
							)}
						</div>
					</div>
				</Container>
				<Fotter />
			</div>
		</div>
	);
}
