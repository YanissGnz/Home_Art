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
} from "@material-ui/core";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import PinDropOutlinedIcon from "@material-ui/icons/PinDropOutlined";
import VpnKeyOutlinedIcon from "@material-ui/icons/VpnKeyOutlined";

import LocationOffOutlinedIcon from "@material-ui/icons/LocationOffOutlined";
import { useState } from "react";
import { useHistory } from "react-router";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function Profile() {
	const history = useHistory();
	const [open, setOpen] = React.useState(false);
	const [addresses, setAddresses] = useState([]);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<div className="profile_body">
				<CssBaseline />
				<MyAppBar />
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
												Vous n'avez pas d'address
											</Typography>
										</div>
									) : (
										addresses.map((address) => (
											<div>
												<Typography style={{ fontSize: 18, marginBottom: 15 }}>
													{address}
												</Typography>
												<Divider style={{ marginBottom: 15 }} />
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
								label="Address"
								fullWidth
								style={{ marginBottom: 50 }}
								variant="outlined"
							/>
							<div style={{ display: "flex", marginBottom: 50 }}>
								<TextField
									autoFocus
									label="Région"
									fullWidth
									style={{ marginRight: 20 }}
									variant="outlined"
								/>
								<TextField
									autoFocus
									label="Ville"
									fullWidth
									variant="outlined"
								/>
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
							>
								Enregistrer
							</Button>
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
		</div>
	);
}
