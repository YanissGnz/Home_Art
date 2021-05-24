import {
	AppBar,
	Button,
	CssBaseline,
	IconButton,
	InputBase,
	Paper,
	Toolbar,
	Typography,
	useScrollTrigger,
} from "@material-ui/core";
import React, { useEffect } from "react";

import Logo from "../../Icons/Logo";
import SearchIcon from "@material-ui/icons/Search";
import { useStyles } from "./useStyles";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { dispatchLogout, removeToken } from "../../redux/actions/authAction";

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

export default function AdminPanel(props) {
	const classes = useStyles();
	const history = useHistory();
	const dispatch = useDispatch();

	const isLogged = useSelector((state) => state.auth.isLogged);

	useEffect(() => {
		/*if (!isLogged) {
			history.push("/admin");
		}*/
	}, [isLogged, history]);

	const handleSearch = (event) => event.preventDefault();

	const handleLogout = (event) => {
		dispatch(dispatchLogout());
		dispatch(removeToken());
		history.push("/Admin");
	};

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
						<Button
							disableRipple
							className={classes.cart_button}
							onClick={handleLogout}
						>
							Logout
						</Button>
					</Toolbar>
				</AppBar>
			</ElevationScroll>
		</div>
	);
}
