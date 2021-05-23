import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import ForgetPassword from "../Icons/ForgetPassword";

import "./index.css";

const useStyles = makeStyles({
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

export default function RecoverPassword() {
	const classes = useStyles();

	return (
		<div className="body">
			<Card className={classes.main_card} elevation={0}>
				<div className={classes.img_div}>
					<ForgetPassword />
				</div>
				<Card className={classes.right_card} elevation={0}>
					<CardContent className={classes.card_content}>
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
							type="email"
						/>
						<br />
						<Button
							className={classes.btn}
							variant="contained"
							color="primary"
							classes={{ label: classes.btn_text }}
							fullWidth
							disableElevation
						>
							Réinitialiser
						</Button>
					</CardContent>
				</Card>
			</Card>
		</div>
	);
}
