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
					></div>
				</Container>
				<Fotter />
			</div>
		</div>
	);
}
