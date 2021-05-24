import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import {
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	Link,
	OutlinedInput,
} from "@material-ui/core";
import GoogleIcon from "../../Icons/GoogleIcon";
import RegisterIcon from "../../Icons/RegisterIcon";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useHistory } from "react-router";

import "./index.css";

const useStyles = makeStyles({
	main_card: {
		margin: "0",
		background: "#C4C4C4",
		borderRadius: "40px",
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
});

export default function ClientRegister() {
	const classes = useStyles();
	const history = useHistory();
	const [values, setValues] = React.useState({
		showPassword: false,
	});

	const handleClickShowPassword = () => {
		setValues({ ...values, showPassword: !values.showPassword });
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	return (
		<div className="body">
			<Card className={classes.main_card} elevation={0}>
				<div className={classes.img_div}>
					<RegisterIcon />
				</div>
				<Card className={classes.right_card} elevation={0}>
					<CardContent>
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
								type="name"
							/>
							{/*Lastname Input */}
							<TextField
								variant="outlined"
								label="Prénom"
								size="small"
								classes={{ root: classes.lastname_field }}
								fullWidth
								type="name"
							/>
						</div>
						{/*Email Input */}
						<TextField
							variant="outlined"
							label="Email"
							size="small"
							classes={{ root: classes.text_field }}
							fullWidth
							type="email"
						/>
						<br />

						{/*Password Input */}
						<FormControl
							classes={{ root: classes.text_field }}
							variant="outlined"
							size="small"
							fullWidth
						>
							<InputLabel htmlFor="outlined-adornment-password">
								Mot de passe
							</InputLabel>
							<OutlinedInput
								id="outlined-adornment-password"
								type={values.showPassword ? "text" : "password"}
								value={values.password}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											edge="end"
										>
											{values.showPassword ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								}
								labelWidth={100}
							/>
						</FormControl>
						<br />

						{/*Create acount Button */}
						<Button
							className={classes.btn}
							variant="contained"
							color="primary"
							classes={{ label: classes.btn_text }}
							fullWidth
							disableElevation
						>
							Crée un compte
						</Button>
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
						<Button
							className={classes.google_btn}
							variant="outlined"
							fullWidth
							startIcon={<GoogleIcon />}
						>
							Continue aver Google
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
					</CardContent>
				</Card>
			</Card>
		</div>
	);
}
