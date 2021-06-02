import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

import {
	Button,
	Card,
	CardActions,
	CardContent,
	makeStyles,
	Typography,
} from "@material-ui/core";

const useStyles = makeStyles({
	root: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: "100%",
	},
	card: {
		height: 200,
		width: 500,
		borderRadius: 15,
		display: "flex",
		alignItems: "center",
		flexDirection: "column",
	},
	cardContent: {
		marginBottom: 50,
	},

	button: {
		textTransform: "capitalize",
		fontSize: 18,
		fontWeight: 600,
	},
});

function ActivationEmail() {
	const classes = useStyles();
	const history = useHistory();
	const { activation_token } = useParams();
	const [err, setErr] = useState("");
	const [success, setSuccess] = useState("");

	useEffect(() => {
		if (activation_token) {
			const activationEmail = async () => {
				try {
					const res = await axios.post("/users/activation", {
						activation_token,
					});
					setSuccess(res.data.msg);
				} catch (err) {
					err.response.data.msg && setErr(err.response.data.msg);
				}
			};
			activationEmail();
		}
	}, [activation_token]);

	return (
		<div className={classes.root}>
			<Card className={classes.card} elevation={10}>
				<CardContent className={classes.card}>
					<Typography variant="h5" className={classes.cardContent}>
						{err || success}
					</Typography>
				</CardContent>
				<CardActions>
					<Button
						color="primary"
						size="large"
						variant="text"
						className={classes.button}
						onClick={() => history.push("/login")}
					>
						Connecter-vous
					</Button>
				</CardActions>
			</Card>
		</div>
	);
}

export default ActivationEmail;
