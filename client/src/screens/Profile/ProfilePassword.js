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
} from "@material-ui/core";

import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import PinDropOutlinedIcon from "@material-ui/icons/PinDropOutlined";
import VpnKeyOutlinedIcon from "@material-ui/icons/VpnKeyOutlined";

import { useHistory } from "react-router";

export default function Profile() {
	const history = useHistory();

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
								label="Mot de pass actuel"
								variant="outlined"
								style={{
									width: "50%",
									marginBottom: 50,
									alignSelf: "center",
								}}
							/>
							<TextField
								label="Nouveau mot de passe"
								variant="outlined"
								style={{
									width: "50%",
									marginBottom: 50,
									alignSelf: "center",
								}}
							/>
							<TextField
								label="confirmer votre mot de passe"
								variant="outlined"
								style={{
									width: "50%",
									marginBottom: 50,
									alignSelf: "center",
								}}
							/>
							<Button
								variant="contained"
								color="primary"
								style={{
									color: "white",
									textTransform: "none",
									width: 400,
									alignSelf: "center",
								}}
								size="large"
							>
								Ajouter une address
							</Button>
						</div>
					</div>
				</Container>
				<Fotter />
			</div>
		</div>
	);
}
