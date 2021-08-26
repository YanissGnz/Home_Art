import clsx from "clsx";
import {
	CircularProgress,
	Step,
	StepContent,
	Typography,
} from "@material-ui/core";
import { Container } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { StepLabel } from "@material-ui/core";
import { Stepper } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import { StepConnector } from "@material-ui/core";
import { CssBaseline } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	dispatchUserError,
	dispatchUserLoaded,
	dispatchUserLoading,
} from "../../redux/actions/authAction";
import { returnErrors } from "../../redux/actions/errAction";
import MyAppBar from "../../utils/AppBar";
import Fotter from "../../utils/Footer";
import { useStyles } from "./useStyles";
import LocationOnRoundedIcon from "@material-ui/icons/LocationOnRounded";
import CreditCardRoundedIcon from "@material-ui/icons/CreditCardRounded";
import AssignmentTurnedInRoundedIcon from "@material-ui/icons/AssignmentTurnedInRounded";
import PropTypes from "prop-types";

const ColorlibConnector = withStyles({
	active: {
		"& $line": {
			backgroundImage:
				"linear-gradient(  #F58634 0%,rgb(233,64,87) 50%, #F58634 100%)",
		},
	},
	completed: {
		"& $line": {
			backgroundImage:
				"linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
		},
	},
	line: {
		height: 3,
		width: 2,
		border: 0,
		backgroundColor: "#eaeaf0",
		borderRadius: 2,
	},
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
	root: {
		backgroundColor: "#ccc",
		zIndex: 1,
		color: "#fff",
		width: 50,
		height: 50,
		display: "flex",
		borderRadius: "50%",
		justifyContent: "center",
		alignItems: "center",
	},
	active: {
		backgroundImage:
			"linear-gradient(  #F58634 0%,  #F58634 50%,  #F58634 100%)",
		boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
	},
	completed: {
		backgroundImage:
			"linear-gradient( 136deg,  #F58634 0%,  #F58634 50%,  #F58634 100%)",
	},
});

function ColorlibStepIcon(props) {
	const classes = useColorlibStepIconStyles();
	const { active, completed } = props;

	const icons = {
		1: <LocationOnRoundedIcon />,
		2: <CreditCardRoundedIcon />,
		3: <AssignmentTurnedInRoundedIcon />,
	};

	return (
		<div
			className={clsx(classes.root, {
				[classes.active]: active,
				[classes.completed]: completed,
			})}
		>
			{icons[String(props.icon)]}
		</div>
	);
}

ColorlibStepIcon.propTypes = {
	/**
	 * Whether this step is active.
	 */
	active: PropTypes.bool,
	/**
	 * Mark the step as completed. Is passed to child components.
	 */
	completed: PropTypes.bool,
	/**
	 * The label displayed in the step icon.
	 */
	icon: PropTypes.node,
};

function getSteps() {
	return ["Address et mode de livraison", "Mode de paiment", "Finalisation"];
}

export default function CommandeScreen() {
	const dispatch = useDispatch();
	const classes = useStyles();

	const token = useSelector((state) => state.auth.token);
	const [user, setUser] = React.useState(null);
	const isLoading = useSelector((state) => state.auth.isLoading);
	const [activeStep, setActiveStep] = React.useState(0);
	const steps = getSteps();

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleReset = () => {
		setActiveStep(0);
	};

	React.useEffect(() => {
		const loadUser = async () => {
			dispatch(dispatchUserLoading());

			// Headers
			const config = {
				headers: {
					"x-auth-token": token,
				},
			};

			await axios
				.get("/users/load_User", config)
				.then((res) => {
					dispatch(dispatchUserLoaded(res));
					setUser(res.data.user);
				})
				.catch((err) => {
					dispatch(dispatchUserError());
					dispatch(returnErrors(err.response.data.msg, err.response.status));
				});
		};
		loadUser();
	}, [dispatch, token]);

	return (
		<div>
			{isLoading && (
				<CircularProgress size={80} thickness={5} className={classes.loader} />
			)}
			{!isLoading && (
				<div className="home_body">
					<CssBaseline />
					<MyAppBar cartLength={user ? user.cart.length : 0} />
					<Container
						maxWidth="lg"
						style={{
							backgroundColor: "white",
							borderRadius: 20,
							height: 700,
							marginTop: 20,
							display: "flex",
							flexDirection: "column",
							padding: 20,
							overflow: "hidden",
						}}
						className="main"
					>
						<Typography variant="h6">Finalisation de la commande</Typography>
						<Divider />
						<Stepper
							activeStep={activeStep}
							connector={<ColorlibConnector />}
							orientation="vertical"
						>
							<Step key={1}>
								<StepLabel StepIconComponent={ColorlibStepIcon}>
									Address et mode de livraison
								</StepLabel>
								<StepContent>
									<Typography>Address et mode de livraison</Typography>
									<div className={classes.actionsContainer}>
										<div>
											<Button
												disabled={activeStep === 0}
												onClick={handleBack}
												className={classes.button}
											>
												Back
											</Button>
											<Button
												variant="contained"
												color="primary"
												onClick={handleNext}
												className={classes.button}
											>
												{activeStep === steps.length - 1 ? "Finish" : "Next"}
											</Button>
										</div>
									</div>
								</StepContent>
							</Step>
							<Step key={1}>
								<StepLabel StepIconComponent={ColorlibStepIcon}>
									Mode de paiment
								</StepLabel>
								<StepContent>
									<Typography>Mode de paiment</Typography>
									<div className={classes.actionsContainer}>
										<div>
											<Button
												disabled={activeStep === 0}
												onClick={handleBack}
												className={classes.button}
											>
												Back
											</Button>
											<Button
												variant="contained"
												color="primary"
												onClick={handleNext}
												className={classes.button}
											>
												{activeStep === steps.length - 1 ? "Finish" : "Next"}
											</Button>
										</div>
									</div>
								</StepContent>
							</Step>
							<Step key={1}>
								<StepLabel StepIconComponent={ColorlibStepIcon}>
									Finalisation
								</StepLabel>
								<StepContent>
									<Typography>Finalisation</Typography>
									<div className={classes.actionsContainer}>
										<div>
											<Button
												disabled={activeStep === 0}
												onClick={handleBack}
												className={classes.button}
											>
												Back
											</Button>
											<Button
												variant="contained"
												color="primary"
												onClick={handleNext}
												className={classes.button}
											>
												{activeStep === steps.length - 1 ? "Finish" : "Next"}
											</Button>
										</div>
									</div>
								</StepContent>
							</Step>
						</Stepper>
					</Container>
					<Fotter />
				</div>
			)}
		</div>
	);
}
