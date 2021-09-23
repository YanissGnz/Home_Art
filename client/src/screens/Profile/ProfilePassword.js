import React, { useState } from "react";
import MyAppBar from "../../utils/AppBar";
import Fotter from "../../utils/Footer";
import {
	Container,
	CssBaseline,
	Typography,
	ButtonGroup,
	Button,
	TextField,
	Divider,
	Snackbar,
} from "@material-ui/core";

import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import PinDropOutlinedIcon from "@material-ui/icons/PinDropOutlined";
import VpnKeyOutlinedIcon from "@material-ui/icons/VpnKeyOutlined";

import { useHistory } from "react-router";
import axios from "axios";
import {
	dispatchUserError,
	dispatchUserLoaded,
	dispatchUserLoading,
} from "../../redux/actions/authAction";
import { returnErrors } from "../../redux/actions/errAction";
import { useDispatch, useSelector } from "react-redux";
import MuiAlert from "@material-ui/lab/Alert";
import { CircularProgress } from "@material-ui/core";
import { useTheme } from "@material-ui/core";

const initialState = {
	password: "",
	newPassword: "",
	confirmPassword: "",
};

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Profile() {
	const history = useHistory();
	const [user, setUser] = useState(null);
	const dispatch = useDispatch();
	const token = useSelector((state) => state.auth.token);
	const [passwordReset, setPasswordReset] = useState(initialState);
	const [msg, setMsg] = useState("");
	const [alertOpen, setAlertOpen] = React.useState(false);
	const [alertType, setAlertType] = React.useState("");
	const theme = useTheme();
	const [isLoading, setIsLoading] = useState(false);
	const [editLoading, setEditLoading] = useState(false);

	const handleAlertOpen = () => {
		setAlertOpen(true);
	};
	const handleAlertClose = () => {
		setAlertOpen(false);
	};

	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setPasswordReset({ ...passwordReset, [name]: value });
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

	const resetPassword = () => {
		const { password, newPassword, confirmPassword } = passwordReset;
		setEditLoading(true);
		// Headers
		const config = {
			headers: {
				"x-auth-token": token,
			},
		};

		axios
			.post(
				"/users/password",
				{ password, newPassword, confirmPassword },
				config
			)
			.then((res) => {
				setUser(res.data.user);
				setMsg(res.data.msg);
				handleAlertOpen();
				setAlertType("success");
				setEditLoading(false);
				setPasswordReset(initialState);
			})
			.catch((err) => {
				setMsg(err.response.data);
				setEditLoading(false);
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
					<Snackbar
						open={alertOpen}
						autoHideDuration={3000}
						onClose={handleAlertClose}
					>
						<Alert severity={alertType}>
							<Typography>{msg}</Typography>
						</Alert>
					</Snackbar>
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
									color="primary"
									startIcon={
										<VpnKeyOutlinedIcon
											style={{ fontSize: 30 }}
											color="primary"
										/>
									}
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
									Modifier le mot de passe
								</Typography>
								<Divider style={{ marginBottom: 50 }} />
								<TextField
									name="password"
									type="password"
									value={passwordReset.password}
									label="Mot de pass actuel"
									variant="outlined"
									style={{
										width: "50%",
										marginBottom: 50,
										alignSelf: "center",
									}}
									onChange={handleChangeInput}
									helperText={msg.id === 0 && msg.msg}
									error={msg.id === 0}
								/>
								<TextField
									name="newPassword"
									type="password"
									value={passwordReset.newPassword}
									label="Nouveau mot de passe"
									variant="outlined"
									style={{
										width: "50%",
										marginBottom: 50,
										alignSelf: "center",
									}}
									onChange={handleChangeInput}
									helperText={msg.id === 1 && msg.msg}
									error={msg.id === 1}
								/>
								<TextField
									name="confirmPassword"
									type="password"
									value={passwordReset.confirmPassword}
									label="confirmer votre mot de passe"
									variant="outlined"
									style={{
										width: "50%",
										marginBottom: 50,
										alignSelf: "center",
									}}
									onChange={handleChangeInput}
									helperText={msg.id === 2 && msg.msg}
									error={msg.id === 2}
								/>
								<div
									style={{
										margin: 0,
										position: "relative",
										alignSelf: "center",
									}}
								>
									<Button
										variant="contained"
										color="primary"
										style={{
											color: "white",
											textTransform: "none",
											width: 400,
										}}
										size="large"
										onClick={resetPassword}
										disabled={editLoading}
									>
										Enregistrer
									</Button>
									{editLoading && (
										<CircularProgress
											size={24}
											style={{
												color: theme.palette.primary,
												position: "absolute",
												top: "25%",
												left: "50%",
												marginTop: -1,
												marginLeft: -12,
											}}
										/>
									)}
								</div>
							</div>
						</div>
					</Container>
					<Fotter />
				</div>
			)}
		</div>
	);
}
