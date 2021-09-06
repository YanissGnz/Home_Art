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
	Snackbar,
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
import DoneOutlineRoundedIcon from "@material-ui/icons/DoneOutlineRounded";
import { useState } from "react";
import { useHistory } from "react-router";
import {
	dispatchUserError,
	dispatchUserLoaded,
	dispatchUserLoading,
} from "../../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { returnErrors } from "../../redux/actions/errAction";
import { CircularProgress } from "@material-ui/core";
import { useTheme } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { Tooltip } from "@material-ui/core";

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
	name: "",
	last_name: "",
	email: "",
	phoneNumber: "",
	gender: "",
	dateOfBirth: new Date("2014-08-18T21:11:54"),
	cart: [],
};
function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}
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
			format="+213 #########"
			mask="_"
		/>
	);
}
export default function Profile() {
	const [enableEdit, setEnableEdit] = React.useState(false);
	const [user, setUser] = useState(userInfo);
	const [msg, setMsg] = useState("");
	const history = useHistory();
	const dispatch = useDispatch();
	const token = useSelector((state) => state.auth.token);
	const [editLoading, setEditLoading] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [alertOpen, setAlertOpen] = React.useState(false);
	const [alertType, setAlertType] = React.useState("");
	const theme = useTheme();

	const handleAlertOpen = () => {
		setAlertOpen(true);
	};
	const handleAlertClose = () => {
		setAlertOpen(false);
	};

	const handleDateChange = (date) => {
		setUser({ ...user, dateOfBirth: date });
	};

	const { name, last_name, email, phoneNumber } = user;

	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
	};

	const handleGenderChange = (e) => {
		setUser({ ...user, gender: e.target.value });
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

	const handleEdit = () => {
		setEditLoading(true);

		// Headers
		const config = {
			headers: {
				"x-auth-token": token,
			},
		};
		const { name, last_name, dateOfBirth, phoneNumber, gender } = user;
		axios
			.put(
				"/users/edit_profile",
				{ name, last_name, dateOfBirth, phoneNumber, gender },
				config
			)
			.then((res) => {
				setMsg(res.data.msg);
				setEnableEdit(!enableEdit);
				handleAlertOpen();
				setAlertType("success");
				setEditLoading(false);
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
									color="primary"
									startIcon={
										<InfoOutlinedIcon
											color="primary"
											style={{ fontSize: 30 }}
										/>
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
								<div style={{ position: "absolute", right: 20, top: 10 }}>
									<div
										style={{
											margin: 0,
											position: "relative",
											alignSelf: "center",
										}}
									>
										<Tooltip
											title="Enregistrer"
											aria-label="save"
											placement="left-center"
										>
											<IconButton
												color="primary"
												aria-label="upload picture"
												component="span"
												size="large"
												disableRipple
												onClick={handleEdit}
												disabled={editLoading}
											>
												<DoneOutlineRoundedIcon style={{ fontSize: 30 }} />
											</IconButton>
										</Tooltip>
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
							) : (
								<Tooltip
									title="Modifier"
									aria-label="edit"
									placement="left-center"
								>
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
								</Tooltip>
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
										name="last_name"
										value={last_name}
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
										disabled={true}
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
										value={user.gender}
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
											value={user.dateOfBirth}
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
			)}
		</div>
	);
}
