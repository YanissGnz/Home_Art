import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Link } from "@material-ui/core";
import GoogleIcon from "../Icons/GoogleIcon";
import { useHistory } from "react-router";
import "../Login.css";

const useStyles = makeStyles({
	main_card: {
		margin: "0",
		background: "#C4C4C4",
		borderRadius: "40px",
		width: "55em",
		height: "33em",
		display: "flex",
	},
	right_card: {
		position: "relative",
		left: "0em",
		background: "white",
		margin: "0",
		paddingLeft: "2em",
		paddingRight: "2em",
		width: "20em",
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
		position: "relative",
		marginTop: "0.2em",
		fontFamily: "Poppins",
		fontWeight: "500",
		fontSize: "11px",
		marginLeft: "11.5em",
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
		height: "0.01em",
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
	signup_div: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		alignContent: "center",
		alignSelf: "center",
		marginLeft: "1em",
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
	img: {
		height: "25em",
		width: "25em",
	},
});

export default function ClientLogin() {
	const classes = useStyles();
	const history = useHistory();

	return (
		<div>
			<Card className={classes.main_card} elevation={0}>
				<Card className={classes.right_card} elevation={0}>
					<CardContent>
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
						/>
						<br />
						<TextField
							variant="outlined"
							label="Mot de passe"
							size="small"
							classes={{ root: classes.text_field }}
							fullWidth
							type="password"
						/>
						<br />
						<Link
							component="button"
							color="primary"
							underline="none"
							variant="inherit"
							classes={{ root: classes.mdps_oublier }}
						>
							Mot de passe oublier?
						</Link>
						<br />
						<Button
							className={classes.btn}
							variant="contained"
							color="primary"
							classes={{ label: classes.btn_text }}
							fullWidth
							disableElevation
						>
							Connexion
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
						<Button
							className={classes.google_btn}
							variant="outlined"
							fullWidth
							startIcon={<GoogleIcon />}
						>
							Continue aver Google
						</Button>
						<div className={classes.signup_div}>
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
					</CardContent>
				</Card>
				<div className={classes.img_div}>
					<img src="/LoginImg.gif" className={classes.img} alt="login_img" />
				</div>
			</Card>
		</div>
	);
}
