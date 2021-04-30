import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import AdminLogin from "./screens/AdminLogin";
import ClientLogin from "./screens/ClientLogin";
import ClientRegister from "./screens/ClientRegister";

const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#F58634",
		},
	},
});

export default function App() {
	return (
		<ThemeProvider theme={theme}>
			<Router>
				<Switch>
					<Route exact path="/admin">
						<AdminLogin />
					</Route>
					<Route exact path="/login">
						<ClientLogin />
					</Route>
					<Route exact path="/register">
						<ClientRegister />
					</Route>
				</Switch>
			</Router>
		</ThemeProvider>
	);
}
