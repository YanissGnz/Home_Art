import React, { useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { CircularProgress, Link } from "@material-ui/core";
import { returnErrors, clearErrors } from "../../redux/actions/errAction";

import LoginIcon from "../../Icons/LoginIcon";
import { useHistory } from "react-router";
import GoogleLogin from "react-google-login";
import { dispatchLogin2 } from "../../redux/actions/authAction";

import { useDispatch, useSelector } from "react-redux";

import "./index.css";

const useStyles = makeStyles((theme) => {
	return {
		main_card: {
			margin: "0",
			background: "#C4C4C4",
			borderRadius: "40px",
			width: "60em",
			height: "40em",
			display: "flex",
		},
		right_card: {
			position: "relative",
			left: "0em",
			background: "white",
			margin: "0",
			paddingLeft: "2em",
			paddingRight: "2em",
			width: "40%",
			height: "100%",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			alignContent: "center",
			flexDirection: "row",
		},
		text: {
			fontFamily: "Poppins",
			fontWeight: "600",
			fontSize: "17px",
		},
		text_field: {
			marginTop: "1.5em",
			fontFamily: "Poppins",
		},
		btn: {
			marginTop: "1.5em",
		},
		btn_text: {
			fontFamily: "Poppins",
			fontWeight: "500",
			fontSize: "15px",
			textTransform: "capitalize",
			color: "white",
		},
		mdps_oublier: {
			marginTop: "0.5em",
			fontFamily: "Poppins",
			fontWeight: "500",
			fontSize: "11px",
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
		line: {
			width: 120,
			height: 1,
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
		div: {
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
	email: "",
	password: "",
};

export default function ClientLogin() {
	const classes = useStyles();
	const [user, setUser] = useState(initialState);
	const [isLoading, setIsLoading] = useState(false);

	const dispatch = useDispatch();
	const history = useHistory();

	const { email, password } = user;

	const emailMsg = useSelector((state) => state.err);
	const passwordMsg = useSelector((state) => state.err);

	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
	};

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
		const body = JSON.stringify({ email, password });

		axios
			.post("/users/login", body, config)
			.then((res) => {
				dispatch(dispatchLogin2(res));
				dispatch(clearErrors());
				history.push("/");
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
				history.push("/");
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
				<Card className={classes.right_card} elevation={0}>
					<CardContent>
						<form onSubmit={handleSubmit}>
							<Typography
								className={classes.text}
								variant="h6"
								align="center"
								color="primary"
							>
								Se Connecter
							</Typography>
							<TextField
								variant="outlined"
								label="Email"
								size="small"
								classes={{ root: classes.text_field }}
								fullWidth
								type="email"
								name="email"
								value={email}
								onChange={handleChangeInput}
								helperText={emailMsg.id === 0 ? emailMsg.msg : null}
								error={emailMsg.id === 0 ? true : false}
							/>
							<TextField
								type="password"
								variant="outlined"
								label="Mot de passe"
								id="password"
								name="password"
								size="small"
								classes={{ root: classes.text_field }}
								fullWidth
								value={password}
								onChange={handleChangeInput}
								helperText={passwordMsg.id === 1 ? passwordMsg.msg : null}
								error={passwordMsg.id === 1 ? true : false}
							/>
							<br />
							<div className={classes.wrapper}>
								<Button
									className={classes.btn}
									variant="contained"
									color="primary"
									type="submit"
									disabled={isLoading}
									classes={{ label: classes.btn_text }}
									fullWidth
								>
									Connexion
								</Button>
								{isLoading && (
									<CircularProgress
										size={24}
										className={classes.buttonProgress}
									/>
								)}
							</div>
							<br />
							<div className="mdps_oblier">
								<Link
									component="button"
									color="primary"
									underline="hover"
									variant="inherit"
									classes={{ root: classes.mdps_oublier }}
									onClick={() => history.push("/recover_password")}
								>
									Mot de passe oublier?
								</Link>
							</div>
							<div className={classes.div}>
								<div className={classes.line} />
								<Typography
									className={classes.btm_text}
									variant="subtitle2"
									align="center"
								>
									Ou
								</Typography>
								<div className={classes.line} />
							</div>
							<Button fullWidth>
								<GoogleLogin
									clientId="664430788321-7nplkv1bhj864bcedgirrug2vdtf0e4g.apps.googleusercontent.com"
									buttonText="Continue with google"
									onSuccess={responseGoogle}
									cookiePolicy={"single_host_origin"}
								/>
							</Button>
							<div className={classes.div}>
								<Typography
									className={classes.signup_txt}
									variant="subtitle2"
									align="center"
								>
									Vous n’avez pas un compte?
								</Typography>

								<Link
									component="button"
									color="primary"
									underline="hover"
									variant="inherit"
									classes={{ root: classes.signup_txt }}
									onClick={() => history.push("/register")}
								>
									Inscrivez-vous
								</Link>
							</div>
						</form>
					</CardContent>
				</Card>
				<div className={classes.img_div}>
					<LoginIcon />
				</div>
			</Card>
		</div>
	);
}
