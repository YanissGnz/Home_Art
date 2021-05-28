import React from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
	dispatchGetUser,
	dispatchLogin,
	dispatchLogout,
	fetchUser,
	removeToken,
} from "../../redux/actions/authAction";
import {
	AppBar,
	Button,
	CssBaseline,
	Divider,
	Drawer,
	IconButton,
	InputBase,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Paper,
	Toolbar,
	Typography,
	useScrollTrigger,
	useTheme,
} from "@material-ui/core";
import clsx from "clsx";
import { useStyles } from "./useStyles";

import Logo from "../../Icons/Logo";
import SearchIcon from "@material-ui/icons/Search";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MenuIcon from "@material-ui/icons/Menu";

import "./adminPanel.css";
import Catalog from "../../Icons/Catalog";
import Dashboard from "../../Icons/Dashboard";

import DashboardScreen from "./Components/DashboardScreen";
import ProductsScreen from "./Components/ProductsScreen";

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
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);
	const [screen, setScreen] = React.useState(true);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const isLogged = useSelector((state) => state.auth.isLogged);

	React.useEffect(() => {
		if (!isLogged) {
			history.push("/admin");
		}
	}, [isLogged, history]);

	const token = useSelector((state) => state.token);

	React.useEffect(() => {
		if (token) {
			const getUser = () => {
				dispatch(dispatchLogin());

				return fetchUser(token).then((res) => {
					dispatch(dispatchGetUser(res));
				});
			};
			getUser();
		}
	}, [token, dispatch]);

	const handleSearch = (event) => event.preventDefault();

	const handleLogout = (event) => {
		dispatch(dispatchLogout());
		dispatch(removeToken());
		history.push("/admin");
	};

	return (
		<div className="panel_body">
			<CssBaseline />
			<ElevationScroll {...props}>
				<AppBar
					color="white"
					className={clsx(classes.appBar, {
						[classes.appBarShift]: open,
					})}
				>
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={handleDrawerOpen}
							edge="start"
							className={clsx(classes.menuButton, {
								[classes.hide]: open,
							})}
						>
							<MenuIcon />
						</IconButton>
						<div className={classes.appBarLogo}>
							<Logo />
							<Typography variant="caption">Home Art</Typography>
						</div>
						<div className={classes.searchDiv}>
							<Paper
								component="form"
								className={classes.searchPaper}
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
						</div>
						<Button
							disableRipple
							className={classes.logout_button}
							onClick={handleLogout}
						>
							Logout
						</Button>
					</Toolbar>
				</AppBar>
			</ElevationScroll>

			<Drawer
				variant="permanent"
				className={clsx(classes.drawer, {
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open,
				})}
				classes={{
					paper: clsx({
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open,
					}),
				}}
			>
				<div className={classes.toolbar}>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === "rtl" ? (
							<ChevronRightIcon />
						) : (
							<ChevronLeftIcon />
						)}
					</IconButton>
				</div>
				<Divider />
				<List>
					<ListItem
						button
						onClick={() => setScreen(true)}
						className={screen ? classes.active : null}
					>
						<ListItemIcon>
							<Dashboard />
						</ListItemIcon>
						<ListItemText primary="Tableau de bord" />
					</ListItem>
					<ListItem
						button
						onClick={() => setScreen(false)}
						className={!screen ? classes.active : null}
					>
						<ListItemIcon>
							<Catalog />
						</ListItemIcon>
						<ListItemText primary="Produit" />
					</ListItem>
				</List>
			</Drawer>
			{screen ? <DashboardScreen /> : <ProductsScreen />}
		</div>
	);
}
