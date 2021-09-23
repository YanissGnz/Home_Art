import React from "react";
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
	Dialog,
	DialogTitle,
	DialogActions,
	DialogContent,
	CircularProgress,
	IconButton,
	Snackbar,
} from "@material-ui/core";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import PinDropOutlinedIcon from "@material-ui/icons/PinDropOutlined";
import VpnKeyOutlinedIcon from "@material-ui/icons/VpnKeyOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import LocationOffOutlinedIcon from "@material-ui/icons/LocationOffOutlined";
import { useState } from "react";
import { useHistory } from "react-router";
import Slide from "@material-ui/core/Slide";
import { useSelector, useDispatch } from "react-redux";
import {
	dispatchUserError,
	dispatchUserLoaded,
	dispatchUserLoading,
} from "../../redux/actions/authAction";
import { returnErrors } from "../../redux/actions/errAction";
import axios from "axios";
import { Tooltip } from "@material-ui/core";
import { useTheme } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const address = {
	name: "",
	address: "",
	ville: "",
	region: "",
};

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Profile() {
	const history = useHistory();
	const dispatch = useDispatch();
	const token = useSelector((state) => state.auth.token);
	const [open, setOpen] = React.useState(false);
	const [addresses, setAddresses] = useState([]);
	const [newAddress, setNewAddress] = useState(address);
	const [msg, setMsg] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [editLoading, setEditLoading] = useState(false);
	const [user, setUser] = React.useState(null);
	const theme = useTheme();
	const [alertOpen, setAlertOpen] = React.useState(false);
	const [alertType, setAlertType] = React.useState("");

	const handleAlertOpen = () => {
		setAlertOpen(true);
	};
	const handleAlertClose = () => {
		setAlertOpen(false);
	};

	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setNewAddress({ ...newAddress, [name]: value });
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setNewAddress(address);
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
					setAddresses(res.data.user.addresses);
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

	const addAdresse = () => {
		setEditLoading(true);

		// Headers
		const config = {
			headers: {
				"x-auth-token": token,
			},
		};

		const { name, address, ville, region } = newAddress;
		axios
			.post("/users/add_Address", { name, address, ville, region }, config)
			.then((res) => {
				setMsg(res.data.msg);
				setAddresses(res.data.addresses);
				handleAlertOpen();
				setAlertType("success");
				setEditLoading(false);
			})
			.catch((err) => {
				setMsg(err.response.data);

				setEditLoading(false);
			});
	};

	const handleremove = (address) => {
		// Headers
		const config = {
			headers: {
				"x-auth-token": token,
			},
		};

		axios
			.post("/users/delete_address", { address }, config)
			.then((res) => {
				setMsg(res.data.msg);
				setAddresses(res.data.newAddresses);
			})
			.catch((err) => {
				console.log(err.response.data.msg);
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
									color="primary"
									startIcon={
										<PinDropOutlinedIcon
											color="primary"
											style={{ fontSize: 30 }}
										/>
									}
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
									Addresses
								</Typography>
								<Divider style={{ marginBottom: 20 }} />
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										height: "100%",
									}}
								>
									<div
										style={{
											display: "flex",
											flexDirection: "column",
											height: "70%",
											width: "100%",
											padding: 10,
											overflow: "auto",
											marginBottom: 20,
										}}
									>
										{addresses.length === 0 ? (
											<div
												style={{
													display: "flex",
													flexDirection: "column",
													height: "80%",
													alignItems: "center",
													justifyContent: "center",
												}}
											>
												<LocationOffOutlinedIcon
													style={{
														fontSize: 100,
														marginBottom: 20,
													}}
													color="disabled"
												/>
												<Typography variant="h5" color="textSecondary">
													Vous n'avez pas d'addresses
												</Typography>
											</div>
										) : (
											addresses.map((address) => (
												<div
													style={{
														display: "flex",
														width: "100%",
														justifyContent: "space-between",
														alignItems: "center",
														borderBottom: "1px solid rgb(0 0 0 / 12%)",
														marginBottom: 10,
														padding: 10,
													}}
												>
													<div
														style={{
															display: "flex",
															flexDirection: "column",
														}}
													>
														<div
															style={{
																display: "inline-flex",
																marginBottom: 3,
															}}
														>
															<Typography
																style={{
																	fontSize: 16,
																	fontWeight: 500,
																}}
																color="primary"
															>
																Nom d'address :{" "}
															</Typography>
															<Typography
																style={{
																	fontSize: 16,
																	fontWeight: 400,
																	marginLeft: 5,
																}}
															>
																{" "}
																{address.name}
															</Typography>
														</div>
														<div
															style={{
																display: "inline-flex",
																marginBottom: 3,
															}}
														>
															<Typography
																style={{
																	fontSize: 16,
																	fontWeight: 500,
																}}
																color="primary"
															>
																Address :{" "}
															</Typography>
															<Typography
																style={{
																	fontSize: 16,
																	fontWeight: 400,
																	marginLeft: 5,
																}}
															>
																{" "}
																{address.address}
															</Typography>
														</div>
														<div
															style={{
																display: "inline-flex",
																marginBottom: 3,
															}}
														>
															<div
																style={{
																	display: "inline-flex",
																	marginBottom: 3,
																	marginRight: 10,
																}}
															>
																<Typography
																	style={{
																		fontSize: 16,
																		marginBottom: 5,
																		fontWeight: 500,
																	}}
																	color="primary"
																>
																	Région :
																</Typography>
																<Typography
																	style={{
																		fontSize: 16,
																		fontWeight: 400,
																		marginLeft: 5,
																	}}
																>
																	{address.region}
																</Typography>
															</div>
															<div
																style={{
																	display: "inline-flex",
																	marginBottom: 3,
																}}
															>
																<Typography
																	style={{
																		fontSize: 16,
																		marginBottom: 3,
																		fontWeight: 500,
																	}}
																	color="primary"
																>
																	Ville :
																</Typography>
																<Typography
																	style={{
																		fontSize: 16,
																		fontWeight: 400,
																		marginLeft: 5,
																	}}
																>
																	{address.ville}
																</Typography>
															</div>
														</div>
													</div>

													<Tooltip
														title="Supprimer"
														aria-label="delete"
														placement="left-center"
													>
														<IconButton
															onClick={() => {
																handleremove(address);
															}}
															style={{ height: 50 }}
														>
															<DeleteOutlineOutlinedIcon />
														</IconButton>
													</Tooltip>
												</div>
											))
										)}
									</div>

									<Button
										variant="contained"
										color="primary"
										style={{
											color: "white",
											textTransform: "none",
											width: 400,
											alignSelf: "center",
										}}
										onClick={handleClickOpen}
										size="large"
									>
										Ajouter une address
									</Button>
								</div>
							</div>
						</div>
						<Dialog
							open={open}
							TransitionComponent={Transition}
							keepMounted
							onClose={handleClose}
							aria-labelledby="alert-dialog-slide-title"
							aria-describedby="alert-dialog-slide-description"
							maxWidth="lg"
						>
							<DialogTitle id="alert-dialog-slide-title">
								Ajouter une address
							</DialogTitle>
							<DialogContent
								style={{ display: "flex", flexDirection: "column", width: 800 }}
							>
								<TextField
									autoFocus
									name="name"
									label="Nom"
									fullWidth
									style={{ marginBottom: 50 }}
									variant="outlined"
									onChange={handleChangeInput}
									value={newAddress.name}
									helperText={msg.id === 0 && msg.msg}
									error={msg.id === 0}
								/>
								<TextField
									autoFocus
									name="address"
									label="Address"
									fullWidth
									style={{ marginBottom: 50 }}
									variant="outlined"
									onChange={handleChangeInput}
									value={newAddress.address}
									helperText={msg.id === 1 && msg.msg}
									error={msg.id === 1}
								/>
								<div style={{ display: "flex", marginBottom: 50 }}>
									<TextField
										autoFocus
										name="region"
										label="Région"
										fullWidth
										style={{ marginRight: 20 }}
										variant="outlined"
										onChange={handleChangeInput}
										value={newAddress.region}
										helperText={msg.id === 2 && msg.msg}
										error={msg.id === 2}
									/>
									<TextField
										autoFocus
										name="ville"
										label="Ville"
										fullWidth
										variant="outlined"
										onChange={handleChangeInput}
										value={newAddress.ville}
										helperText={msg.id === 3 && msg.msg}
										error={msg.id === 3}
									/>
								</div>
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
											alignSelf: "center",
										}}
										onClick={addAdresse}
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
							</DialogContent>

							<DialogActions>
								<Button
									onClick={handleClose}
									color="primary"
									style={{ textTransform: "none" }}
								>
									Annuller
								</Button>
							</DialogActions>
						</Dialog>
					</Container>
					<Fotter />
				</div>
			)}
		</div>
	);
}
