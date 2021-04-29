import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { FormGroup, Link } from "@material-ui/core";
import "../App.css";

const useStyles = makeStyles({
	card: {
		borderRadius: "20px",
		width: "22em",
		padding: "0.5em",
		display: "flex",
		justifyContent: "center",
		alignContent: "center",
		flexDirection: "column",
	},
	text: {
		fontFamily: "Poppins",
		fontWeight: "520",
		fontSize: "30px",
		alignSelf: "center",
	},
	text_field: {
		fontFamily: "Poppins",
		marginTop: "2em",
	},
	btn: {
		width: "22.9em",
		marginTop: "2.3em",
	},
	btn_text: {
		fontFamily: "Poppins",
		fontWeight: "500",
		fontSize: "15px",
		textTransform: "capitalize",
	},
	mdps_oublier: {
		marginTop: "1.5em",
		fontFamily: "Poppins",
		fontSize: "12px",
		fontWeight: "400",
		marginInline: "29%",
	},
});

export default function AdminLogin() {
	const classes = useStyles();

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<div>
			<Card className={classes.card} elevation={0}>
				<CardContent>
					<Typography
						color="textPrimary"
						align="center"
						variant="h5"
						classes={{ h5: classes.text }}
					>
						Connexion
					</Typography>
					<form noValidate autoComplete="off" onSubmit={handleSubmit}>
						<FormGroup>
							{/*Email Field */}
							<TextField
								variant="outlined"
								label="Email"
								size="small"
								align="center"
								classes={{ root: classes.text_field }}
								required
								fullWidth
								type="email"
							/>

							{/*Password Field */}
							<TextField
								variant="outlined"
								label="Mot de passe"
								size="small"
								align="center"
								classes={{ root: classes.text_field }}
								required
								fullWidth
								type="password"
							/>
							{/*Confirm Button*/}
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
						</FormGroup>
					</form>

					{/*Forget Password Button*/}
					<Link
						component="button"
						color="textPrimary"
						underline="none"
						variant="inherit"
						classes={{ root: classes.mdps_oublier }}
					>
						Mot de passe oublier?
					</Link>
				</CardContent>
			</Card>
		</div>
	);
}
