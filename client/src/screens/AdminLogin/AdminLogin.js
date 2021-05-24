import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Link } from "@material-ui/core";
import AdminIcon from "../../Icons/AdminIcon";
import { useHistory } from "react-router";

import "./index.css";

import { useDispatch, useSelector } from "react-redux";
import { dispatchLogin } from "../../redux/actions/authAction";
import axios from "axios";

const useStyles = makeStyles({
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
		width: "100%",
		fontFamily: "Poppins",
		fontWeight: "500",
		fontSize: "15px",
		textTransform: "capitalize",
		color: "white",
	},
	mdps_oublier: {
		position: "relative",
		left: "62%",
		marginTop: "0.2em",
		fontFamily: "Poppins",
		fontWeight: "500",
		fontSize: "11px",
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
});

const initialState = {
	email: "",
	password: "",
	err: "",
	passwordErr: "",
	success: "",
};
export default function AdminLogin() {
	const classes = useStyles();

	const [user, setUser] = useState(initialState);
	const dispatch = useDispatch();
	const history = useHistory();

	const { email, password, err, passwordErr } = user;

	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value, err: "", passwordErr: "", success: "" });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post("/users/admin", { email, password });
			setUser({ ...user, err: "", passwordErr: "", success: res.data.msg });

			localStorage.setItem("firstLogin", true);

			dispatch(dispatchLogin());
			history.push("/Admin_panel");
		} catch (err) {
			setUser({
				...user,
				err: err.response.data.emailMsg,
				passwordErr: err.response.data.passwordMsg,
				success: "",
			});
		}
	};

	const auth = useSelector((state) => state.auth);

	useEffect(() => {
		if (auth) {
			history.push("/Admin_panel");
		}
		const firstLogin = localStorage.getItem("firstLogin");
		if (firstLogin) {
			const getToken = async () => {
				const res = await axios.post("/users/refresh_token", null);
				dispatch({ type: "GET_TOKEN", payload: res.data.access_token });
			};
			getToken();
		}
	}, [auth, history, dispatch]);

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
								helperText={err}
								error={err}
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
								helperText={passwordErr}
								error={passwordErr}
							/>
							<br />
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
							<br />
							<Button
								className={classes.btn}
								variant="contained"
								type="submit"
								color="primary"
								classes={{ label: classes.btn_text }}
								fullWidth
							>
								Connexion
							</Button>
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
