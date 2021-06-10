import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

import AdminLogin from "./screens/AdminLogin/AdminLogin";
import ClientLogin from "./screens/ClientLogin/ClientLogin";
import ClientRegister from "./screens/ClientRegister/ClientRegister";
import ActivationEmail from "./screens/ClientRegister/ActivationEmail";
import RecoverPassword from "./screens/RecoverPassword/RecoverPassword";
import ResetPassword from "./screens/RecoverPassword/ResetPassword";

import NotFound from "./screens/404/404";
import Home from "./screens/HomeScreen/Home";
import AdminPanel from "./screens/AdminPanel/AdminPanel";

import "./App.css";
import ProductDetails from "./screens/ProductDetails/ProductDetails";
import CartScreen from "./screens/Cart/CartScreen";

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
			<ThemeProvider theme={theme}>
				<Router>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route
							exact
							path="/product/:productId"
							component={ProductDetails}
						/>
						<Route exact path="/cart" component={CartScreen} />
						<Route exact path="/Admin_panel" component={AdminPanel} />
						<Route exact path="/admin" component={AdminLogin} />
						<Route exact path="/login" component={ClientLogin} />
						<Route exact path="/register" component={ClientRegister} />
						<Route
							path="/users/activate/:activation_token"
							component={ActivationEmail}
							exact
						/>
						<Route exact path="/recover_password" component={RecoverPassword} />
						<Route path="/users/reset/:token" component={ResetPassword} exact />

						<Route exact path="*" component={NotFound} />
					</Switch>
				</Router>
			</ThemeProvider>
		</div>
	);
}
