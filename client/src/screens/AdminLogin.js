import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Link } from "@material-ui/core";
import "../Login.css";
import { useHistory } from "react-router";

const useStyles = makeStyles({
	main_card: {
		margin: "0",
		background: "#C4C4C4",
		borderRadius: "40px",
		width: "55em",
		height: "33em",
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
		width: "20em",
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
		width: "100%",
		fontFamily: "Poppins",
		fontWeight: "500",
		fontSize: "15px",
		textTransform: "capitalize",
		color: "white",
	},
	mdps_oublier: {
		position: "relative",
		left: "56%",
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
					<CardContent className={classes.card_content}>
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
							color="primary"
							classes={{ label: classes.btn_text }}
							fullWidth
							disableElevation
						>
							Connexion
						</Button>
					</CardContent>
				</Card>
				<div className={classes.img_div}>
					<img src="/AdminLogin.gif" className={classes.img} alt="login_img" />
				</div>
			</Card>
		</div>
	);
}
