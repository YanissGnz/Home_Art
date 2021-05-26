import React , { useState, useEffect }  from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Link } from "@material-ui/core";

import LoginIcon from "../../Icons/LoginIcon";
import { useHistory } from "react-router";
import GoogleLogin from 'react-google-login';
import "../index.css";
import {dispatchLogin} from '../../redux/actions/authAction'

import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

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
		marginTop: "0.5em",
		fontFamily: "Poppins",
		fontWeight: "500",
		fontSize: "11px",
	},

	line: {
		width: "9em",
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
	div: {
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

const initialState = {
	email: "",
	password: "",
	err: "",
	passwordErr: "",
	success: "",
};

export default function ClientLogin() {
	const classes = useStyles();

	const [user, setUser] = useState(initialState);
	const dispatch = useDispatch();
	const history = useHistory();

	const { email, password, err, passwordErr } = user;

	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value, err: "", passwordErr: "", success: "" })
	};

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const res = await axios.post("/users/login", { email, password })
			setUser({ ...user, err: "", passwordErr: "", success: res.data.msg })

			localStorage.setItem("Login", true)

			dispatch(dispatchLogin())
			history.push("/");
		} catch (err) {
			setUser({
				...user,
				err: err.response.data.emailMsg,
				passwordErr: err.response.data.passwordMsg,
				success: "",
			});
		}
	};
    

	const auth2 = useSelector((state) => state.auth);
	useEffect(() => {
		
		const firstLogin = localStorage.getItem("Login");
		if (firstLogin) {
			const getToken = async () => {
				const res = await axios.post("/users/refresh_token", null);
				dispatch({ type: "GET_TOKEN", payload: res.data.access_token });
			};
			getToken();
		}
	}, [auth2.isLogged , dispatch]);

    
    const responseGoogle = async (response) => {
        try {
            const res = await axios.post('/users/google_login', {tokenId: response.tokenId})

            setUser({...user, error:'', success: res.data.msg})
            localStorage.setItem('Login', true)

            dispatch(dispatchLogin())
            history.push('/')
        } catch (err) {
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }
	useEffect(() => {
		if (auth2.isLogged) {
			history.push("/");
		}
	},[auth2.isLogged, history])
	return (
		<div className="body">
			<Card className={classes.main_card} elevation={0}>
				<Card className={classes.right_card} elevation={0}>
					<CardContent>
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

						<Button
							className={classes.btn}
							variant="contained"
							color="primary"
							type="submit"
							classes={{ label: classes.btn_text }}
							fullWidth
							disableElevation
						>
							Connexion
						</Button>
						<br />
						<div className="mdps_oblier">
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
						</div>
						<div className={classes.div}>
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
							
							fullWidth
							
						>   
							<GoogleLogin
                               clientId="664430788321-7nplkv1bhj864bcedgirrug2vdtf0e4g.apps.googleusercontent.com"
                                buttonText="Continue with google"
                                onSuccess={responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />
						</Button>
						<div className={classes.div}>
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
					  </form>
					</CardContent>
				</Card>
				<div className={classes.img_div}>
					<LoginIcon />
				</div>
			</Card>
		</div>
	);
}
