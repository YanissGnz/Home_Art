import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

import AdminLogin from "./screens/AdminLogin";
import ClientLogin from "./screens/ClientLogin";
import ClientRegister from "./screens/ClientRegister";
import RecoverPassword from "./screens/RecoverPassword";
import NotFound from "./screens/404";
import Home from "./screens/HomeScreen/Home";

import "./App.css";

const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#F58634",
		},
	},
	typography: {
		fontFamily: "Poppins",
	},
});

export default function App() {
	return (
		<div className="root">
			<link
				rel="stylesheet"
				href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
			/>
			<ThemeProvider theme={theme}>
				<Router>
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route exact path="/admin">
							<AdminLogin />
						</Route>
						<Route exact path="/login">
							<ClientLogin />
						</Route>
						<Route exact path="/register">
							<ClientRegister />
						</Route>
						<Route exact path="/recover_password">
							<RecoverPassword />
						</Route>
						<Route exact path="*">
							<NotFound />
						</Route>
					</Switch>
				</Router>
			</ThemeProvider>
		</div>
	);
}
