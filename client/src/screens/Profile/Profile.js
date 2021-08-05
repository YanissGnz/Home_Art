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
	MenuItem,
	IconButton,
} from "@material-ui/core";
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import NumberFormat from "react-number-format";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import PinDropOutlinedIcon from "@material-ui/icons/PinDropOutlined";
import VpnKeyOutlinedIcon from "@material-ui/icons/VpnKeyOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import { useState } from "react";
import getOverlappingDaysInIntervals from "date-fns/getOverlappingDaysInIntervals/index";
import { useHistory } from "react-router";

const genders = [
	{
		value: "Sélectionner votre genre",
	},
	{
		value: "Homme",
	},
	{
		value: "Femme",
	},
];
var userInfo = {
	name: "Yaniss",
	familyName: "Guendouzi",
	email: "m.guendouzi@esi-sba.dz",
	phoneNumber: "0000000",
	gender: "Homme",
};

export default function Profile() {
	const [selectedGenre, setSelectedGenre] = React.useState("");
	const [enableEdit, setEnableEdit] = React.useState(false);
	const [user, setUser] = useState(userInfo);
	const history = useHistory();

	const [selectedDate, setSelectedDate] = React.useState(
		new Date("2014-08-18T21:11:54")
	);
	const handleDateChange = (date) => {
		setSelectedDate(date);
	};

	const { name, familyName, email, phoneNumber } = user;

	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
	};

	const handleGenderChange = (e) => {
		setSelectedGenre(e.target.value);
	};

	function PhoneNumberFormat(props) {
		const { inputRef, onChange, ...other } = props;

		return (
			<NumberFormat
				{...other}
				getInputRef={inputRef}
				onValueChange={(values) => {
					onChange({
						target: {
							name: props.name,
							value: values.value,
						},
					});
				}}
				isNumericString
			/>
		);
	}

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
								color="primary"
								startIcon={
									<InfoOutlinedIcon color="primary" style={{ fontSize: 30 }} />
								}
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
						{enableEdit ? (
							<IconButton
								color="primary"
								aria-label="upload picture"
								component="span"
								size="large"
								style={{ position: "absolute", right: 20, top: 10 }}
								disableRipple
								onClick={() => setEnableEdit(!enableEdit)}
							>
								<DoneOutlineIcon style={{ fontSize: 30 }} />
							</IconButton>
						) : (
							<IconButton
								color="primary"
								aria-label="upload picture"
								component="span"
								size="large"
								style={{ position: "absolute", right: 20, top: 10 }}
								disableRipple
								onClick={() => setEnableEdit(!enableEdit)}
							>
								<EditOutlinedIcon style={{ fontSize: 30 }} />
							</IconButton>
						)}

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
								Informations Personnelles
							</Typography>
							<Divider style={{ marginBottom: 50 }} />
							<div style={{ marginBottom: 50 }}>
								<TextField
									name="name"
									value={name}
									label="Nom"
									variant="outlined"
									style={{
										marginRight: "2%",
										width: "49%",
									}}
									readOnly={!enableEdit}
									onChange={handleChangeInput}
									disabled={!enableEdit}
								/>
								<TextField
									name="familyName"
									value={familyName}
									label="Prénom"
									size="medium"
									variant="outlined"
									style={{
										width: "49%",
									}}
									disabled={!enableEdit}
									onChange={handleChangeInput}
								/>
							</div>
							<div style={{ marginBottom: 50 }}>
								<TextField
									name="email"
									value={email}
									label="Email"
									variant="outlined"
									style={{
										width: "49%",
										marginRight: "2%",
									}}
									disabled={!enableEdit}
									onChange={handleChangeInput}
								/>

								<TextField
									name="phoneNumber"
									label="Numéro de téléphone"
									value={phoneNumber}
									onChange={handleChangeInput}
									variant="outlined"
									InputProps={{
										inputComponent: PhoneNumberFormat,
									}}
									style={{
										width: "49%",
									}}
									disabled={!enableEdit}
								/>
							</div>
							<div style={{ marginBottom: 50 }}>
								<TextField
									name="gender"
									select
									label="Genre"
									value={selectedGenre}
									onChange={handleGenderChange}
									variant="outlined"
									style={{
										width: "49%",
										marginRight: "2%",
									}}
									disabled={!enableEdit}
								>
									{genders.map((option) => (
										<MenuItem key={option.value} value={option.value}>
											{option.value}
										</MenuItem>
									))}
								</TextField>
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<KeyboardDatePicker
										autoOk
										variant="inline"
										inputVariant="outlined"
										label="Date de naissance"
										format="MM/dd/yyyy"
										value={selectedDate}
										onChange={(date) => handleDateChange(date)}
										style={{
											width: "49%",
										}}
										disabled={!enableEdit}
									/>
								</MuiPickersUtilsProvider>
							</div>
						</div>
					</div>
				</Container>
				<Fotter />
			</div>
		</div>
	);
}
