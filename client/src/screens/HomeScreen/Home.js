import React from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
	dispatchUserError,
	dispatchUserLoaded,
	dispatchUserLoading,
} from "../../redux/actions/authAction";
import {
	AppBar,
	Button,
	Container,
	CssBaseline,
	IconButton,
	InputBase,
	Paper,
	Toolbar,
	Typography,
	useScrollTrigger,
} from "@material-ui/core";

import { useStyles } from "./useStyles";
import axios from "axios";
import { returnErrors } from "../../redux/actions/errAction";
import "./Home.css";
import Logo from "../../Icons/Logo";
import SearchIcon from "@material-ui/icons/Search";
import Cart from "../../Icons/Cart";
import Menus from "./Menu";

function ElevationScroll(props) {
	const { children } = props;

	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
	});

	return React.cloneElement(children, {
		elevation: trigger ? 4 : 0,
	});
}

export default function Home(props) {
	const classes = useStyles();
	const handleSearch = (event) => event.preventDefault();

	const history = useHistory();
	const dispatch = useDispatch();
	

	// Get token from localstorage
	const token = useSelector((state) => state.auth.token);

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
				})
				.catch((err) => {
					dispatch(dispatchUserError());
					returnErrors(err.response.data.msg, err.response.status);
				});
			const isAuthenticated = localStorage.getItem("isAuthenticated");
			if (isAuthenticated === "false") history.push("/login");
		};
		loadUser();
	}, [dispatch, history, token]);
	return (
		<div className="home_body">
			<CssBaseline />
			<ElevationScroll {...props}>
				<AppBar color="white" position="sticky">
					<Toolbar className="appbar">
						<div className="Logo">
							<Logo />
							<Typography variant="subtitle2">Home Art</Typography>
						</div>

						<Paper
							component="form"
							className={classes.paper}
							elevation={0}
							variant="outlined"
						>
							<InputBase className={classes.input} placeholder="Rechercher" />
							<IconButton
								type="submit"
								className={classes.search_Button}
								aria-label="search"
								onClick={handleSearch}
							>
								<SearchIcon />
							</IconButton>
						</Paper>
						<Menus />
						<Button
							disableRipple
							startIcon={<Cart />}
							className={classes.cart_button}
						>
							Panier
						</Button>
					</Toolbar>
				</AppBar>
			</ElevationScroll>

			<Container maxWidth="xl" className="main"></Container>
		</div>
	);
}
