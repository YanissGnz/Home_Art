import {
	Backdrop,
	Card,
	CardContent,
	CircularProgress,
	Container,
	Snackbar,
	Toolbar,
	Typography,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import React from "react";
import axios from "axios";
import "../adminPanel.css";
import { useStyles } from "../useStyles";
import { useDispatch, useSelector } from "react-redux";
import { returnErrors } from "../../../redux/actions/errAction";
import UserCard from "./UserCard";

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function UsersScreen() {
	const classes = useStyles();
	const dispatch = useDispatch();

	const [users, setUsers] = React.useState(useSelector((state) => state.users));
	const token = useSelector((state) => state.auth.token);
	const [backdropOpen, setBackdropOpen] = React.useState(false);
	const [msg, setMsg] = React.useState("");
	const [alertOpen, setAlertOpen] = React.useState(false);

	const handleBackdropOpen = () => {
		setBackdropOpen(true);
	};

	const handleBackdropClose = () => {
		setBackdropOpen(false);
	};
	const handleAlertOpen = () => {
		setAlertOpen(true);
	};
	const handleAlertClose = () => {
		setAlertOpen(false);
	};

	const handleDeleteUser = async (userId) => {
		handleBackdropOpen();
		//Header
		const config = {
			headers: {
				"x-auth-token": token,
			},
		};

		await axios
			.delete(`/users/delete_user/${userId}`, config)
			.then((res) => {
				setMsg(res.data.msg);
				const newUsers = users.filter((user) => user._id !== userId);
				setUsers(newUsers);
				handleAlertOpen();
				handleBackdropClose();
			})
			.catch((err) => {
				setMsg(err.response.data.msg);
				dispatch(
					returnErrors(
						err.response.data.msg,
						err.response.status,
						err.response.data.id
					)
				);
				handleBackdropClose();
			});
	};

	return (
		<Container maxWidth="xl" className="dashbord_container">
			<Toolbar />

			<Typography variant="h5" className={classes.dashboardText}>
				Utilisateur
			</Typography>
			{/*__________________Users Container__________________*/}
			<Container maxWidth="xl" style={{ width: "100%" }}>
				<Typography variant="h6" className={classes.dashboardText}>
					List des Client
				</Typography>
				<Container maxWidth="xl" className={classes.UsersContainer}>
					<Card
						style={{
							width: "100%",
							margin: 0,
						}}
					>
						<CardContent
							style={{
								display: "flex",
								flexDirection: "row",
								position: "relative",
								height: 50,
							}}
						>
							<Typography
								style={{ position: "absolute", left: "2%" }}
								variant="body1"
							>
								Nom
							</Typography>
							<Typography
								style={{ position: "absolute", left: "24%" }}
								variant="body1"
							>
								Email
							</Typography>
							<Typography
								style={{ position: "absolute", left: "47%" }}
								variant="body1"
							>
								Date
							</Typography>
							<Typography
								style={{ position: "absolute", left: "70%" }}
								variant="body1"
							>
								Status de compte
							</Typography>
							<Typography
								style={{ position: "absolute", left: "95%" }}
								variant="body1"
							>
								Actions
							</Typography>
						</CardContent>
						{users.map((user) => (
							<UserCard user={user} handleDeleteUser={handleDeleteUser} />
						))}
					</Card>
				</Container>
			</Container>
			<Backdrop className={classes.backdrop} open={backdropOpen}>
				<CircularProgress size={60} thickness={5} color="primary" />
			</Backdrop>
			<Snackbar
				open={alertOpen}
				autoHideDuration={2500}
				onClose={handleAlertClose}
			>
				<Alert severity="success">
					<Typography>{msg}</Typography>
				</Alert>
			</Snackbar>
		</Container>
	);
}
