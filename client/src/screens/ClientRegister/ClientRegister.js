import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { CircularProgress, Link } from "@material-ui/core";
import { returnErrors, clearErrors } from "../../redux/actions/errAction";
import RegisterIcon from "../../Icons/RegisterIcon";
import { useHistory } from "react-router";
import axios from "axios";
import { dispatchLogin2 } from "../../redux/actions/authAction";
import { showSuccessMsg } from "../../utils/notification/Notification";
import GoogleLogin from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";

const useStyles = makeStyles((theme) => {
	return {
		main_card: {
			margin: "0",
			background: "#C4C4C4",
			borderRadius: 40,
			width: "60em",
			height: "40em",
			display: "flex",
			flexDirection: "row",
		},
		right_card: {
			display: "flex",
			position: "static",
			background: "white",
			paddingLeft: "2em",
			paddingRight: "2em",
			width: "40%",
			height: "100%",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "column",
		},
		text: {
			fontWeight: "600",
			fontSize: "17px",
			marginTop: "5em",
		},
		info_div: {
			width: "100%",
			marginTop: "1em",
		},
		name_field: {
			width: "47%",
			marginRight: "1.1em",
			fontFamily: "emPoppins",
		},
		lastname_field: {
			width: "47%",
			fontFamily: "Poppins",
		},
		text_field: {
			marginTop: "1em",
			fontFamily: "Poppins",
		},
		btn: {
			marginTop: "1.8em",
		},
		btn_text: {
			fontFamily: "Poppins",
			fontWeight: "500",
			fontSize: "15px",
			textTransform: "capitalize",
			color: "white",
		},
		mdps_oublier: {
			position: "relative",
			left: "4.5em",
			marginTop: "0.2em",
			fontFamily: "Poppins",
			fontWeight: "500",
			fontSize: "11px",
			marginLeft: "10.7em",
		},
		wrapper: {
			margin: 0,
			position: "relative",
		},
		buttonProgress: {
			color: theme.palette.primary,
			position: "absolute",
			top: "50%",
			left: "50%",
			marginTop: -1,
			marginLeft: -12,
		},
		divider: {
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			alignContent: "center",
			marginTop: "1em",
		},
		line: {
			width: "8em",
			height: "0.08em",
			background: "black",
		},
		btm_text: {
			fontFamily: "Poppins",
			fontWeight: "450",
			fontSize: "14px",
			marginInline: "0.8em",
		},
		google_btn: {
			fontFamily: "Poppins",
			fontWeight: "500",
			fontSize: "13px",
			textTransform: "capitalize",
			marginTop: "1em",
		},
		signin_div: {
			width: "100%",
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			alignContent: "center",
			justifyContent: "center",
			marginTop: "1em",
		},
		signup_txt: {
			fontFamily: "Poppins",
			fontWeight: "600",
			fontSize: "11px",
			marginRight: "0.5em",
		},
		img_div: {
			position: "static",
			height: "100%",
			width: "60%",
			display: "flex",
			justifyContent: "center",
			alignContent: "center",
			alignItems: "center",
		},
	};
});

const initialState = {
	name: "",
	last_name: "",
	email: "",
	password: "",
	cf_password: "",
	success: "",
};

export default function ClientRegister() {
	const classes = useStyles();
	const history = useHistory();

	const [user, setUser] = useState(initialState);
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();

	const { name, last_name, email, password, cf_password, success } = user;

	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
	};

	/* const handleClickShowPassword = () => {
		setValues({ ...values, showPassword: !values.showPassword });
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};*/
	const nameMsg = useSelector((state) => state.err);
	const last_nameMsg = useSelector((state) => state.err);
	const emailMsg = useSelector((state) => state.err);
	const passwordMsg = useSelector((state) => state.err);
	const cf_passwordMsg = useSelector((state) => state.err);
	const handleSubmit = async (e) => {
		e.preventDefault();

		setIsLoading(true);

		// Headers
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		// Request body
		const body = JSON.stringify({
			name,
			last_name,
			email,
			password,
			cf_password,
		});

		axios
			.post("/users/register", body, config)
			.then((res) => {
				dispatch(clearErrors());
				setIsLoading(false);
				setUser({ ...user, success: res.data.msg });
			})
			.catch((err) => {
				setIsLoading(false);
				dispatch(
					returnErrors(
						err.response.data.msg,
						err.response.status,
						err.response.data.id
					)
				);
			});
	};

	const responseGoogle = async (response) => {
		axios
			.post("/users/google_login", { tokenId: response.tokenId })
			.then((res) => {
				setIsLoading(true);
				dispatch(dispatchLogin2(res));
				dispatch(clearErrors());
				history.push("/login");
			})
			.catch((err) => {
				setIsLoading(false);
				dispatch(
					returnErrors(
						err.response.data.msg,
						err.response.status,
						err.response.data.id
					)
				);
			});
	};

	return (
		<div className="body">
			<Card className={classes.main_card} elevation={0}>
				<div className={classes.img_div}>
					<RegisterIcon />
				</div>
				<Card className={classes.right_card} elevation={0}>
					<CardContent>
						{success && showSuccessMsg(success)}
						<form onSubmit={handleSubmit}>
							<Typography
								className={classes.text}
								variant="h6"
								align="center"
								color="primary"
							>
								Crée un compte
							</Typography>
							<div className={classes.info_div}>
								{/*name Input */}
								<TextField
									variant="outlined"
									label="Nom"
									size="small"
									classes={{ root: classes.name_field }}
									fullWidth
									type="text"
									id="name"
									value={name}
									name="name"
									onChange={handleChangeInput}
									helperText={nameMsg.id === 2 ? nameMsg.msg : null}
									error={nameMsg.id === 2 ? true : false}
								/>
								{/*Lastname Input */}
								<TextField
									variant="outlined"
									label="Prénom"
									size="small"
									classes={{ root: classes.lastname_field }}
									fullWidth
									type="text"
									id="last_name"
									value={last_name}
									name="last_name"
									onChange={handleChangeInput}
									helperText={last_nameMsg.id === 3 ? last_nameMsg.msg : null}
									error={last_nameMsg.id === 3 ? true : false}
								/>
							</div>
							{/*Email Input */}
							<TextField
								variant="outlined"
								label="Email"
								size="small"
								classes={{ root: classes.text_field }}
								fullWidth
								type="text"
								id="email"
								value={email}
								name="email"
								onChange={handleChangeInput}
								helperText={emailMsg.id === 0 ? emailMsg.msg : null}
								error={emailMsg.id === 0 ? true : false}
							/>
							<br />

							{/*Password Input */}
							<TextField
								variant="outlined"
								label="mot de passe"
								size="small"
								classes={{ root: classes.text_field }}
								fullWidth
								type="password"
								id="password"
								value={password}
								name="password"
								onChange={handleChangeInput}
								helperText={passwordMsg.id === 1 ? passwordMsg.msg : null}
								error={passwordMsg.id === 1 ? true : false}
							/>
							<br />

							<TextField
								variant="outlined"
								label="confirmer mot de passe"
								size="small"
								classes={{ root: classes.text_field }}
								fullWidth
								type="password"
								id="cf_password"
								value={cf_password}
								name="cf_password"
								onChange={handleChangeInput}
								helperText={cf_passwordMsg.id === 4 ? cf_passwordMsg.msg : null}
								error={cf_passwordMsg.id === 4 ? true : false}
							/>
							<br />
							{/*Create account Button */}
							<div className={classes.wrapper}>
								<Button
									className={classes.btn}
									variant="contained"
									type="submit"
									color="primary"
									disabled={isLoading}
									classes={{ label: classes.btn_text }}
									fullWidth
								>
									Crée un compte
								</Button>
								{isLoading && (
									<CircularProgress
										size={24}
										className={classes.buttonProgress}
									/>
								)}
							</div>
							<br />
							<div className={classes.divider}>
								<div className={classes.line}></div>
								<Typography
									className={classes.btm_text}
									variant="subtitle2"
									align="center"
								>
									Ou
								</Typography>
								<div className={classes.line}></div>
							</div>

							{/*Google Button */}
							<Button fullWidth>
								<GoogleLogin
									clientId="664430788321-7nplkv1bhj864bcedgirrug2vdtf0e4g.apps.googleusercontent.com"
									buttonText="Continue with google"
									onSuccess={responseGoogle}
									cookiePolicy={"single_host_origin"}
								/>
							</Button>
							<div className={classes.signin_div}>
								<Typography
									className={classes.signup_txt}
									variant="subtitle2"
									align="center"
								>
									Vous avez déjà un compte?
								</Typography>

								{/*Login Link */}
								<Link
									component="button"
									color="primary"
									underline="hover"
									variant="inherit"
									classes={{ root: classes.signup_txt }}
									onClick={() => history.push("/login")}
								>
									Connecter-vous
								</Link>
							</div>
						</form>
					</CardContent>
				</Card>
			</Card>
		</div>
	);
}
