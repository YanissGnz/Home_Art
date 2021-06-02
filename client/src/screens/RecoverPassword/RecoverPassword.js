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
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { dispatchRecoverPassword } from "../../redux/actions/authAction";
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
	success: "",
};
export default function RecoverPassword() {
	const classes = useStyles();
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();
	const [data, setData] = useState(initialState);
	const [open, setOpen] = useState(false);
	const { email, success } = data;

	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setData({ ...data, [name]: value });
	};

	const handleClose = () => {
		setOpen(false);
	};

	const emailMsg = useSelector((state) => state.err);

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
		const body = JSON.stringify({ email });

		axios
			.post("/users/Recover_Password", body, config)
			.then((res) => {
				dispatch(dispatchRecoverPassword(res));
				dispatch(clearErrors());
				setIsLoading(false);
				setData({ ...data, success: res.data.msg });
				setOpen(true);
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
			<Card className={classes.main_card} elevation={10}>
				<div className={classes.img_div}>
					<ForgetPassword />
				</div>
				<Card className={classes.right_card} elevation={0}>
					<CardContent className={classes.card_content}>
						<Dialog open={open} onClose={handleClose}>
							<DialogContent>
								<Typography>{success}</Typography>
							</DialogContent>
							<DialogActions>
								<Button autoFocus onClick={handleClose} color="primary">
									ok
								</Button>
							</DialogActions>
						</Dialog>
						<form onSubmit={handleSubmit}>
							<Typography
								className={classes.text}
								variant="h6"
								align="center"
								color="primary"
							>
								Réinitialiser votre mot de passe.
							</Typography>

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
