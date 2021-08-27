import clsx from "clsx";
import {
	Backdrop,
	CircularProgress,
	Step,
	StepContent,
	TextField,
	Typography,
	useTheme,
	Collapse,
} from "@material-ui/core";
import { Container } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { StepLabel } from "@material-ui/core";
import { Stepper } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import { StepConnector } from "@material-ui/core";
import { CssBaseline } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	dispatchUserError,
	dispatchUserLoaded,
	dispatchUserLoading,
} from "../../redux/actions/authAction";
import { returnErrors } from "../../redux/actions/errAction";
import MyAppBar from "../../utils/AppBar";
import Fotter from "../../utils/Footer";
import { useStyles } from "./useStyles";
import LocationOnRoundedIcon from "@material-ui/icons/LocationOnRounded";
import CreditCardRoundedIcon from "@material-ui/icons/CreditCardRounded";
import AssignmentTurnedInRoundedIcon from "@material-ui/icons/AssignmentTurnedInRounded";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import PropTypes from "prop-types";
import { Card } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { Scrollbars } from "react-custom-scrollbars";
import { useState } from "react";
import NumberFormat from "react-number-format";
import { MenuItem } from "@material-ui/core";
import { Tooltip } from "@material-ui/core";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import validator from "validator";
import Paypal from "../../utils/Paypal";

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

function cardCvcFormat(props) {
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
			format="###"
		/>
	);
}

function creditCardFormat(props) {
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
			format="#### #### #### ####"
		/>
	);
}

function limit(val, max) {
	if (val.length === 1 && val[0] > max[0]) {
		val = "0" + val;
	}

	if (val.length === 2) {
		if (Number(val) === 0) {
			val = "01";

			//this can happen when user paste number
		} else if (val > max) {
			val = max;
		}
	}

	return val;
}

function cardExpiry(val) {
	let month = limit(val.substring(0, 2), "12");
	let year = val.substring(2, 4);

	return month + (year.length ? "/" + year : "");
}

function cardExpiryFormat(props) {
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
			format={cardExpiry}
		/>
	);
}

function giftCardCodeFormat(props) {
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
			format="#### #### #### ####"
		/>
	);
}

const ColorlibConnector = withStyles({
	active: {
		"& $line": {
			backgroundImage:
				"linear-gradient(  #F58634 0%,rgb(233,64,87) 50%, #F58634 100%)",
			flex: "0 1 auto",
		},
	},
	completed: {
		"& $line": {
			backgroundImage:
				"linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
			flex: "0 1 auto",
		},
	},
	line: {
		width: 2,
		border: 0,
		backgroundColor: "#eaeaf0",
		borderRadius: 2,
		flex: "0 1 auto",
	},
	button: {
		textTransform: "none",
	},
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
	root: {
		backgroundColor: "#ccc",
		zIndex: 1,
		color: "#fff",
		width: 50,
		height: 50,
		display: "flex",
		borderRadius: "50%",
		justifyContent: "center",
		alignItems: "center",
	},
	active: {
		backgroundImage:
			"linear-gradient(  #F58634 0%,  #F58634 50%,  #F58634 100%)",
		boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
	},
	completed: {
		backgroundImage:
			"linear-gradient( 136deg,  #F58634 0%,  #F58634 50%,  #F58634 100%)",
	},
});

var commandeInfo = {
	name: "",
	last_name: "",
	phoneNumber: "",
	address: "",
	region: "",
	ville: "",
	deliveryMode: "",
	paimentMethod: "",
};

const deliveryModes = [
	"Address partéculier ",
	"Bureau de poste",
	"Magasin de la boutique",
];

const paimentMethods = ["Carte bancaire", "Facture", "Carte cadeau", "Paypal"];

const creditCartInfo = {
	number: "",
	name: "",
	expiry: "",
	cvc: "",
};

function ColorlibStepIcon(props) {
	const classes = useColorlibStepIconStyles();
	const { active, completed } = props;

	const icons = {
		1: <LocationOnRoundedIcon />,
		2: <CreditCardRoundedIcon />,
		3: <AssignmentTurnedInRoundedIcon />,
	};

	return (
		<div
			className={clsx(classes.root, {
				[classes.active]: active,
				[classes.completed]: completed,
			})}
		>
			{icons[String(props.icon)]}
		</div>
	);
}

ColorlibStepIcon.propTypes = {
	/**
	 * Whether this step is active.
	 */
	active: PropTypes.bool,
	/**
	 * Mark the step as completed. Is passed to child components.
	 */
	completed: PropTypes.bool,
	/**
	 * The label displayed in the step icon.
	 */
	icon: PropTypes.node,
};

export default function CommandeScreen() {
	const dispatch = useDispatch();
	const classes = useStyles();
	const theme = useTheme();

	const token = useSelector((state) => state.auth.token);
	const [user, setUser] = React.useState(null);
	const [commande, setCommande] = useState(commandeInfo);
	const [addresses, setAddresses] = useState([]);
	const [selectedAddress, setSelectedAddress] = useState({});
	const [creditCard, setCreditCard] = useState(creditCartInfo);
	const [giftCardCode, setGiftCardCode] = useState("");
	const isLoading = useSelector((state) => state.auth.isLoading);
	const [activeStep, setActiveStep] = React.useState(0);
	const [cart, setCart] = React.useState([]);
	const [totalPrice, setTotalPrice] = React.useState("0");
	const [open, setOpen] = React.useState(false);
	const [msg, setMsg] = useState({});
	const [focused, setFocused] = useState("");

	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setCommande({ ...commande, [name]: value });
	};

	const handleDeliveryModeChange = (e) => {
		setCommande({ ...commande, deliveryMode: e.target.value });
	};

	const handlePaimentMethodChange = (e) => {
		setCommande({ ...commande, paimentMethod: e.target.value });
		setMsg({});
		setGiftCardCode("");
	};

	const handleAddressChange = (e) => {
		setCommande({
			...commande,
			address: e.target.value.address,
			region: e.target.value.region,
			ville: e.target.value.ville,
		});
	};

	const HandleCreditCartChange = (e) => {
		const { name, value } = e.target;
		setCreditCard({ ...creditCard, [name]: value });
	};

	const handleInputFocus = (e) => {
		setFocused(e.target.name);
	};

	const HandleGiftCardCodeChange = (e) => {
		setGiftCardCode(e.target.value.toString());
	};

	const handleStepOneNext = () => {
		if (commande.name === "") {
			setMsg({ id: 0, msg: "Entrer votre nom" });
		} else if (commande.last_name === "") {
			setMsg({ id: 1, msg: "Entrer votre prénom" });
		} else if (commande.phoneNumber === "") {
			setMsg({ id: 2, msg: "Entrer votre numéro de téléphone" });
		} else if (commande.address === "") {
			setMsg({ id: 3, msg: "Entrer votre address" });
		} else if (commande.region === "") {
			setMsg({ id: 4, msg: "Entrer votre région" });
		} else if (commande.ville === "") {
			setMsg({ id: 5, msg: "Entrer votre ville" });
		} else if (commande.deliveryMode === "") {
			setMsg({ id: 6, msg: "Entrer le mode de laivrison" });
		} else {
			setActiveStep(1);
			setMsg({});
		}
	};

	const handleStepTwoNext = async () => {
		if (commande.paimentMethod === "Carte bancaire") {
			if (creditCard.number === "") {
				setMsg({ id: 0, msg: "Entrer le numéro de carte" });
			} else if (!validator.isCreditCard(creditCard.number)) {
				setMsg({ id: 0, msg: "Numéro invalid" });
			} else if (creditCard.name === "") {
				setMsg({ id: 1, msg: "Entrer le nom de carte" });
			} else if (creditCard.expiry === "") {
				setMsg({ id: 2, msg: "Entrer la date d'expiration" });
			} else if (creditCard.cvc === "") {
				setMsg({ id: 3, msg: "Entrer le cvc" });
			} else {
				setMsg({});
				setActiveStep((prevActiveStep) => prevActiveStep + 1);
			}
		} else if (commande.paimentMethod === "Carte cadeau") {
			if (giftCardCode === "") {
				setMsg({ id: 0, msg: "Entrer  le code" });
			} else {
				await axios
					.post("/gift_card/verify_gift_card", { giftCardCode, totalPrice })
					.then((res) => {
						if (res.data.isValid) {
							setActiveStep(2);

							setMsg({});
						} else {
							setMsg(res.data.msg);
						}
					})
					.catch((e) => {
						console.log(e);
					});
			}
		}
	};

	const handleCommande = () => {};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

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
					setUser(res.data.user);
					setCommande({
						...commande,
						name: res.data.user.name,
						last_name: res.data.user.last_name,
						phoneNumber: res.data.user.phoneNumber,
					});
					setAddresses(res.data.user.addresses);
					console.log(res.data.user.addresses);
				})
				.catch((err) => {
					dispatch(dispatchUserError());
					dispatch(returnErrors(err.response.data.msg, err.response.status));
				});
		};
		loadUser();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, token]);

	React.useEffect(() => {
		if (user !== null) {
			setCart(user.cart);
		}
	}, [user]);

	React.useEffect(() => {
		var totalPrice = 0;
		if (cart.length !== 0) {
			// eslint-disable-next-line array-callback-return
			cart.map((item) => {
				totalPrice = totalPrice + parseInt(item.product.price) * item.quantity;
			});
			setTotalPrice(totalPrice.toString());
		} else {
			setTotalPrice(0);
		}
	}, [cart]);
	const handleClose = () => {
		setOpen(false);
	};
	const handleToggle = () => {
		setOpen(!open);
	};

	const handleRemoveItem = async (item) => {
		handleToggle();
		// Headers
		const config = {
			headers: {
				"x-auth-token": token,
			},
		};
		await axios
			.post(`/users/remove_item_from_cart`, { item }, config)
			.then((res) => {
				setCart(res.data.newCart);
				handleClose();
			})
			.catch((err) => {
				console.log(err);
				handleClose();
			});
	};

	return (
		<div>
			{isLoading && (
				<CircularProgress
					size={80}
					thickness={5}
					style={{ marginTop: "22%", marginLeft: "49%" }}
				/>
			)}
			{!isLoading && (
				<div className="home_body">
					<CssBaseline />
					<MyAppBar cartLength={user ? cart.length : 0} />
					<Backdrop
						style={{ zIndex: theme.zIndex.drawer + 1, color: "#fff" }}
						open={open}
						onClick={handleClose}
					>
						<CircularProgress color="primary" />
					</Backdrop>
					<Container
						maxWidth="lg"
						style={{
							backgroundColor: "white",
							borderRadius: 20,
							minHeight: 700,
							height: "fit-content",
							marginTop: 20,
							display: "flex",
							flexDirection: "column",
							padding: 20,
							overflow: "hidden",
						}}
						className="main"
					>
						<Typography variant="h6">Finalisation de la commande</Typography>
						<Divider />
						<div style={{ display: "flex" }}>
							<Stepper
								activeStep={activeStep}
								connector={
									<ColorlibConnector
										classes={{ root: classes.connectorLine }}
									/>
								}
								orientation="vertical"
								style={{ width: "70%" }}
							>
								{/*First Step */}
								<Step key={0}>
									<StepLabel StepIconComponent={ColorlibStepIcon}>
										Address et mode de livraison
									</StepLabel>
									<StepContent>
										<div
											style={{
												width: "100%",
											}}
										>
											<div style={{ marginTop: 10 }}>
												<Typography
													color="primary"
													style={{ fontSize: 16, fontWeight: 450 }}
												>
													Informations personnelles
												</Typography>
												<div style={{ marginTop: 20 }}>
													<TextField
														name="name"
														value={commande.name}
														label="Nom"
														variant="outlined"
														size="small"
														required
														helperText={msg.id === 0 && msg.msg}
														error={msg.id === 0}
														style={{
															width: "45%",
															marginRight: "2%",
														}}
														onChange={handleChangeInput}
													/>
													<TextField
														name="last_name"
														value={commande.last_name}
														label="Prénom"
														variant="outlined"
														size="small"
														required
														helperText={msg.id === 1 && msg.msg}
														error={msg.id === 1}
														style={{
															width: "45%",
															marginRight: "2%",
														}}
														onChange={handleChangeInput}
													/>
												</div>
											</div>
											<div style={{ marginTop: 30 }}>
												<TextField
													name="phoneNumber"
													value={commande.phoneNumber}
													label="Numéro de téléphone"
													variant="outlined"
													size="small"
													required
													helperText={msg.id === 2 && msg.msg}
													error={msg.id === 2}
													InputProps={{
														inputComponent: PhoneNumberFormat,
													}}
													style={{
														width: "92%",
													}}
													onChange={handleChangeInput}
												/>
											</div>
											<div style={{ marginTop: 30 }}>
												<Typography
													color="primary"
													style={{ fontSize: 16, fontWeight: 450 }}
												>
													Addresses et mode de laivraison
												</Typography>
												<div style={{ marginTop: 20 }}>
													<TextField
														name="address"
														select
														label="Selectionner un address"
														value={selectedAddress.address}
														onChange={handleAddressChange}
														variant="outlined"
														size="small"
														required
														style={{
															width: "92%",
														}}
													>
														{addresses.map((option, index) => (
															<MenuItem key={index} value={option}>
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
																			{option.address}
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
																				{option.region}
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
																				{option.ville}
																			</Typography>
																		</div>
																	</div>
																</div>
															</MenuItem>
														))}
													</TextField>
												</div>
											</div>
											<div style={{ marginTop: 30 }}>
												<TextField
													name="address"
													value={commande.address}
													label="Address"
													variant="outlined"
													size="small"
													required
													multiline
													rowsMax={4}
													helperText={msg.id === 3 && msg.msg}
													error={msg.id === 3}
													style={{
														width: "92%",
													}}
													onChange={handleChangeInput}
												/>
											</div>
											<div style={{ marginTop: 30 }}>
												<TextField
													name="region"
													value={commande.region}
													label="Région"
													variant="outlined"
													size="small"
													required
													helperText={msg.id === 4 && msg.msg}
													error={msg.id === 4}
													style={{
														width: "45%",
														marginRight: "2%",
													}}
													onChange={handleChangeInput}
												/>
												<TextField
													name="ville"
													value={commande.ville}
													label="Ville"
													variant="outlined"
													size="small"
													required
													helperText={msg.id === 5 && msg.msg}
													error={msg.id === 5}
													style={{
														width: "45%",
														marginRight: "2%",
													}}
													onChange={handleChangeInput}
												/>
											</div>
											<div style={{ marginTop: 30 }}>
												<TextField
													name="deliveryMode"
													select
													label="Mode de laivrison"
													value={commande.deliveryMode}
													onChange={handleDeliveryModeChange}
													variant="outlined"
													size="small"
													required
													helperText={msg.id === 6 && msg.msg}
													error={msg.id === 6}
													style={{
														width: "92%",
													}}
												>
													{deliveryModes.map((option) => (
														<MenuItem key={option} value={option}>
															{option}
														</MenuItem>
													))}
												</TextField>
											</div>
										</div>
										<div>
											<div style={{ marginTop: 30 }}>
												<Button
													disabled={activeStep === 0}
													onClick={handleBack}
													style={{ textTransform: "none", marginRight: 10 }}
												>
													Précédent
												</Button>
												<Button
													variant="contained"
													color="primary"
													onClick={handleStepOneNext}
													style={{ textTransform: "none", color: "white" }}
												>
													Suivant
												</Button>
											</div>
										</div>
									</StepContent>
								</Step>
								{/*Second Step */}
								<Step key={1}>
									<StepLabel StepIconComponent={ColorlibStepIcon}>
										Mode de paiment
									</StepLabel>
									<StepContent>
										<div
											style={{
												width: "100%",
											}}
										>
											<div style={{ marginTop: 10 }}>
												<Typography
													color="primary"
													style={{ fontSize: 16, fontWeight: 450 }}
												>
													Chaoisir le mode de paiment
												</Typography>
												<div style={{ marginTop: 20 }}></div>
											</div>
											<div style={{ marginTop: 30 }}>
												<TextField
													name="paimentMethod"
													select
													label="Mode de paiment"
													value={commande.paimentMethod}
													onChange={handlePaimentMethodChange}
													variant="outlined"
													size="small"
													required
													helperText={msg.id === 6 && msg.msg}
													error={msg.id === 6}
													style={{
														width: "92%",
													}}
												>
													{paimentMethods.map((option) => (
														<MenuItem key={option} value={option}>
															{option}
														</MenuItem>
													))}
												</TextField>
											</div>
											<div style={{ marginTop: 30 }}>
												<Typography
													color="primary"
													style={{ fontSize: 16, fontWeight: 450 }}
												>
													Informations de paiment
												</Typography>
												<Collapse
													in={commande.paimentMethod === "Carte bancaire"}
												>
													<div style={{ marginTop: 20 }}>
														<Cards
															cvc={creditCard.cvc}
															expiry={creditCard.expiry}
															focused={focused}
															name={creditCard.name}
															number={creditCard.number}
														/>
														<TextField
															name="number"
															label="Numéro de carte"
															value={creditCard.number}
															variant="outlined"
															size="small"
															required
															InputProps={{
																inputComponent: creditCardFormat,
															}}
															helperText={msg.id === 0 && msg.msg}
															error={msg.id === 0}
															style={{
																width: "92%",
																marginTop: 20,
															}}
															onChange={HandleCreditCartChange}
															onFocus={handleInputFocus}
														/>
														<TextField
															name="name"
															label="Nom de cart"
															value={creditCard.name}
															variant="outlined"
															size="small"
															required
															helperText={msg.id === 1 && msg.msg}
															error={msg.id === 1}
															style={{
																width: "92%",
																marginTop: 20,
															}}
															onChange={HandleCreditCartChange}
															onFocus={handleInputFocus}
														/>
														<div>
															<TextField
																name="expiry"
																label="Date Expiration"
																value={creditCard.expiry}
																variant="outlined"
																size="small"
																required
																helperText={msg.id === 2 && msg.msg}
																error={msg.id === 2}
																InputProps={{
																	inputComponent: cardExpiryFormat,
																}}
																style={{
																	width: "45%",
																	marginTop: 20,
																	marginRight: "2%",
																}}
																onChange={HandleCreditCartChange}
																onFocus={handleInputFocus}
															/>
															<TextField
																name="cvc"
																label="CVC"
																value={creditCard.cvc}
																variant="outlined"
																size="small"
																required
																helperText={msg.id === 3 && msg.msg}
																error={msg.id === 3}
																InputProps={{
																	inputComponent: cardCvcFormat,
																}}
																style={{
																	width: "45%",
																	marginTop: 20,
																}}
																onChange={HandleCreditCartChange}
																onFocus={handleInputFocus}
															/>
														</div>
													</div>
												</Collapse>
												<Collapse in={commande.paimentMethod === "Facture"}>
													<div style={{ marginTop: 20 }}></div>
												</Collapse>
												<Collapse
													in={commande.paimentMethod === "Carte cadeau"}
												>
													<div style={{ marginTop: 20 }}>
														<TextField
															name="code"
															label="Entrer le code le carte cadeau"
															value={giftCardCode}
															variant="outlined"
															size="small"
															required
															InputProps={{
																inputComponent: giftCardCodeFormat,
															}}
															helperText={msg.id === 0 && msg.msg}
															error={msg.id === 0}
															style={{
																width: "92%",
																marginTop: 20,
															}}
															onChange={HandleGiftCardCodeChange}
														/>
													</div>
												</Collapse>
												<Collapse in={commande.paimentMethod === "Paypal"}>
													<div style={{ marginTop: 20, width: "92%" }}>
														<Paypal />
													</div>
												</Collapse>
											</div>
										</div>
										<div>
											<div style={{ marginTop: 30 }}>
												<Button
													disabled={activeStep === 0}
													onClick={handleBack}
													style={{ textTransform: "none", marginRight: 10 }}
												>
													Précédent
												</Button>
												<Button
													variant="contained"
													color="primary"
													onClick={handleStepTwoNext}
													style={{
														textTransform: "none",
														color: "white",
														marginRight: 10,
													}}
												>
													Suivant
												</Button>
											</div>
										</div>
									</StepContent>
								</Step>
								{/*Third Step */}
								<Step key={2}>
									<StepLabel StepIconComponent={ColorlibStepIcon}>
										Finalisation
									</StepLabel>
									<StepContent>
										<Typography>Finalisation</Typography>
										<div className={classes.actionsContainer}>
											<div>
												<Button
													disabled={activeStep === 0}
													onClick={handleBack}
													style={{ textTransform: "none", marginRight: 10 }}
												>
													Précédent
												</Button>
												<Button
													variant="contained"
													color="primary"
													onClick={handleCommande}
													style={{ textTransform: "none", color: "white" }}
												>
													Commander
												</Button>
											</div>
										</div>
									</StepContent>
								</Step>
							</Stepper>

							{/*Card Products */}
							<div style={{ width: "30%", marginTop: 20 }}>
								<Card
									style={{
										width: "100%",
										height: "fit-content",
										margin: 0,
									}}
									variant="outlined"
								>
									<CardContent
										style={{
											padding: 5,
										}}
									>
										<Typography style={{ fontSize: 22, fontWeight: 400 }}>
											Vos Produit
										</Typography>
										<Divider variant="fullWidth" />
										<Scrollbars autoHide style={{ width: "100%", height: 500 }}>
											{cart.length > 0 &&
												cart.map((item) => (
													<Card
														style={{
															width: "100%",
															marginTop: 10,
														}}
														variant="outlined"
													>
														<CardContent
															style={{
																width: "100%",
																display: "flex",
																alignItems: "center",
															}}
														>
															<img
																style={{
																	width: 50,
																	height: 50,
																	objectFit: "contain",
																	marginRight: 8,
																}}
																src={`/uploads/${item.product.productImages[0]}`}
																alt="product"
															/>
															<div style={{ width: "100%" }}>
																<Typography
																	variant="body2"
																	style={{ marginBottom: 5, width: "100%" }}
																>
																	{item.product.name}
																</Typography>

																<Divider />
																<div
																	style={{
																		display: "flex",
																		alignItems: "center",
																	}}
																>
																	<Typography
																		variant="body2"
																		style={{
																			marginRight: 10,
																		}}
																	>
																		Qté : {item.quantity}
																	</Typography>
																	<Typography color="primary">
																		{item.product.price * item.quantity} Da
																	</Typography>
																</div>
															</div>
															<Tooltip
																title="Retirer du panier"
																aria-label="delete"
																placement="left-center"
															>
																<IconButton
																	aria-label="delete"
																	size="large"
																	onClick={() => handleRemoveItem(item)}
																>
																	<DeleteOutlineOutlinedIcon fontSize="inherit" />
																</IconButton>
															</Tooltip>
														</CardContent>
													</Card>
												))}
											<Card
												style={{
													width: "100%",
													marginTop: 10,
												}}
												variant="outlined"
											>
												<CardContent
													style={{
														display: "flex",
														alignItems: "center",
														padding: 10,
													}}
												>
													<Typography variant="h6" style={{ marginRight: 5 }}>
														Prix Total :{" "}
													</Typography>
													<Typography variant="h6" color="primary">
														{" "}
														{totalPrice} Da
													</Typography>
												</CardContent>
											</Card>
										</Scrollbars>
									</CardContent>
								</Card>
							</div>
						</div>
					</Container>
					<Fotter />
				</div>
			)}
		</div>
	);
}
