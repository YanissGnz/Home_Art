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
import CategorieScreen from "./screens/Categorie/CategorieScreen";
import Profile from "./screens/Profile/Profile";
import ProfileAddresses from "./screens/Profile/ProfileAddresses";
import ProfileCommande from "./screens/Profile/ProfileCommande";
import ProfileFavoris from "./screens/Profile/ProfileFavoris";
import ProfilePassword from "./screens/Profile/ProfilePassword";
import SearchScreen from "./screens/SearchScreen/SearchScreen";
import PromotedScreen from "./screens/PromotedScreen/PromotedScreen";
import CommandeScreen from "./screens/CommandeScreen/CommandeScreen";

const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#F58634",
		},
		secondary: {
			main: "#006d00",
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
						<Route exact path="/search/:searchTerm" component={SearchScreen} />
						<Route
							exact
							path="/categorie/:categorie"
							component={CategorieScreen}
						/>
						<Route exact path="/promotion" component={PromotedScreen} />

						<Route exact path="/cart" component={CartScreen} />
						<Route exact path="/commande" component={CommandeScreen} />

						<Route exact path="/Admin_panel" component={AdminPanel} />
						<Route exact path="/admin" component={AdminLogin} />
						<Route exact path="/login" component={ClientLogin} />
						<Route exact path="/register" component={ClientRegister} />
						<Route exact path="/profile/info" component={Profile} />
						<Route exact path="/profile/favorites" component={ProfileFavoris} />
						<Route
							exact
							path="/profile/commandes"
							component={ProfileCommande}
						/>
						<Route
							exact
							path="/profile/addresses"
							component={ProfileAddresses}
						/>
						<Route exact path="/profile/password" component={ProfilePassword} />
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
