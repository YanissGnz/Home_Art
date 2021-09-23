import React, { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { dispatchLogin } from "../../redux/actions/authAction";
import { returnErrors, clearErrors } from "../../redux/actions/errAction";

import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Link } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import AdminIcon from "../../Icons/AdminIcon";

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
			overflow: "hidden",
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
			alignItems: "center",
			flexDirection: "row",
		},
		card_content: {
			width: "100%",
		},
		text: {
			fontFamily: "Poppins",
			fontWeight: "600",
			fontSize: "17px",
		},
		text_field: {
			marginTop: "1em",
			fontFamily: "Poppins",
		},
		btn: {
			marginTop: "0.5em",
		},
		btn_text: {
			width: "100%",
			fontFamily: "Poppins",
			fontWeight: "500",
			fontSize: "15px",
			textTransform: "capitalize",
			color: "white",
		},
		mdps_oublier: {
			marginTop: "0.8em",
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
			marginTop: -8,
			marginLeft: -12,
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
export default function AdminLogin() {
	const classes = useStyles();

	//const theme = useTheme();
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

		dispatch(clearErrors());
		axios
			.post("/users/admin", body, config)
			.then((res) => {
				dispatch(dispatchLogin(res));
				dispatch(clearErrors());
				history.push("/admin_panel");
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
					<CardContent className={classes.card_content}>
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
							<br />
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
							<br />
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
									Connexion
								</Button>

								{isLoading && (
									<CircularProgress
										size={24}
										className={classes.buttonProgress}
									/>
								)}
							</div>
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
						</form>
					</CardContent>
				</Card>
				<div className={classes.img_div}>
					<AdminIcon />
				</div>
			</Card>
		</div>
	);
}
