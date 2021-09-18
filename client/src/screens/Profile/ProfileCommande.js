import React from "react";
import MyAppBar from "../../utils/AppBar";
import Fotter from "../../utils/Footer";
import {
	Container,
	CssBaseline,
	ButtonGroup,
	Button,
	Typography,
	Divider,
	Backdrop,
	useTheme,
} from "@material-ui/core";

import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import PinDropOutlinedIcon from "@material-ui/icons/PinDropOutlined";
import VpnKeyOutlinedIcon from "@material-ui/icons/VpnKeyOutlined";
import NoOrdersIcon from "../../Icons/NoOrdersIcon";
import OrderContainer from "../../utils/OrderContainer";
import { useState } from "react";
import { useHistory } from "react-router";
import {
	dispatchUserError,
	dispatchUserLoaded,
	dispatchUserLoading,
} from "../../redux/actions/authAction";
import { returnErrors } from "../../redux/actions/errAction";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Scrollbars from "react-custom-scrollbars";
import { CircularProgress } from "@material-ui/core";

export default function Profile() {
	const token = useSelector((state) => state.auth.token);
	const theme = useTheme();
	const [user, setUser] = useState(null);
	const history = useHistory();
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const [orders, setOrders] = useState([]);
	const [backdropOpen, setBackdropOpen] = React.useState(false);

	const handleBackdropOpen = () => {
		setBackdropOpen(true);
	};

	const handleBackdropClose = () => {
		setBackdropOpen(false);
	};

	React.useEffect(() => {
		const loadUser = async () => {
			dispatch(dispatchUserLoading());
			setIsLoading(true);
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
					setOrders(res.data.user.orders.reverse());
					setIsLoading(false);
				})
				.catch((err) => {
					setIsLoading(false);
					dispatch(dispatchUserError());
					dispatch(returnErrors(err.response.data.msg, err.response.status));
				});
		};
		loadUser();
	}, [dispatch, token]);

	const handleCancelOrder = async (deletedOrder) => {
		handleBackdropOpen();
		// Headers
		const config = {
			headers: {
				"x-auth-token": token,
			},
		};

		await axios
			.post(`/users/delete_order`, { deletedOrder }, config)
			.then((res) => {
				setOrders(res.data.orders.reverse());
				handleBackdropClose();
			})
			.catch((e) => {
				console.log(e);
				handleBackdropClose();
			});
	};

	return (
		<div>
			{isLoading && (
				<CircularProgress
					size={80}
					thickness={5}
					style={{
						marginTop: "22%",
						marginLeft: "49%",
					}}
				/>
			)}
			{!isLoading && (
				<div className="profile_body">
					<CssBaseline />
					<MyAppBar cartLength={user ? user.cart.length : 0} />
					<Backdrop
						style={{ zIndex: theme.zIndex.drawer + 1, color: "#fff" }}
						open={backdropOpen}
					>
						<CircularProgress size={60} thickness={5} color="primary" />
					</Backdrop>
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
									startIcon={
										<FavoriteBorderOutlinedIcon style={{ fontSize: 30 }} />
									}
									onClick={() => history.push("/profile/favorites")}
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
									startIcon={
										<CheckBoxOutlinedIcon
											style={{ fontSize: 30 }}
											color="primary"
										/>
									}
									color="primary"
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
							<Typography variant="h5" style={{ marginBottom: 20 }}>
								Vos commandes
							</Typography>
							<Divider style={{ marginBottom: 50 }} />
							{orders.length === 0 ? (
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										height: "70%",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<NoOrdersIcon />
									<Typography
										variant="h5"
										color="textSecondary"
										style={{ marginTop: 20 }}
									>
										Vous n'avez pas des commandes
									</Typography>
								</div>
							) : (
								<Scrollbars autoHide style={{ width: "100%", height: 520 }}>
									{orders.map((order) => (
										<div style={{ padding: 10 }}>
											<OrderContainer
												order={order}
												handleCancelOrder={handleCancelOrder}
											/>
										</div>
									))}
								</Scrollbars>
							)}
						</div>
					</Container>
					<Fotter />
				</div>
			)}
		</div>
	);
}
