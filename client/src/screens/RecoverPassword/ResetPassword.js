import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import {
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import ForgetPassword from "../../Icons/ForgetPassword";
import { returnErrors, clearErrors } from "../../redux/actions/errAction";
import "./index.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

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
			marginTop: "1.5em",
		},
		btn_text: {
			fontFamily: "Poppins",
			fontWeight: "500",
			fontSize: "15px",
			textTransform: "capitalize",
			color: "white",
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
	password: "",
	cf_password: "",
	success: "",
};
export default function ResetPassword() {
	const classes = useStyles();

	const history = useHistory();

	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();
	const [data, setData] = useState(initialState);
	const { password, cf_password, success } = data;
	const [open, setOpen] = useState(false);

	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setData({ ...data, [name]: value });
	};

	const handleClose = () => {
		setOpen(false);
	};

	const passwordMsg = useSelector((state) => state.err);
	const cf_passwordMsg = useSelector((state) => state.err);
	const token = useSelector((state) => state.auth.token);
	const handleSubmit = async (e) => {
		e.preventDefault();

		setIsLoading(true);

		// Headers
		const config = {
			headers: {
				"x-auth-token": token,
				"Content-Type": "application/json",
			},
		};
		// Request body
		const body = JSON.stringify({ password, cf_password });

		axios
			.post("/users/Reset_Password", body, config)
			.then((res) => {
				dispatch(clearErrors());
				setIsLoading(false);
				setOpen(true);
				setData({ ...data, success: res.data.msg });
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
					<ForgetPassword />
				</div>
				<Card className={classes.right_card} elevation={0}>
					<CardContent className={classes.card_content}>
						<form onSubmit={handleSubmit}>
							<Dialog open={open} onClose={handleClose}>
								<DialogContent>
									<Typography>{success}</Typography>
								</DialogContent>
								<DialogActions>
									<Button
										autoFocus
										onClick={() => history.push("/login")}
										color="primary"
									>
										Connecter-vous
									</Button>
									<Button autoFocus onClick={handleClose} color="primary">
										ok
									</Button>
								</DialogActions>
							</Dialog>
							<Typography
								className={classes.text}
								variant="h6"
								align="center"
								color="primary"
							>
								Reset your password
							</Typography>

							{/*Password Input */}
							<TextField
								variant="outlined"
								label="Nouveau mot de passe"
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
									Réinitialiser
								</Button>
								{isLoading && (
									<CircularProgress
										size={24}
										className={classes.buttonProgress}
									/>
								)}
							</div>
						</form>
					</CardContent>
				</Card>
			</Card>
		</div>
	);
}
