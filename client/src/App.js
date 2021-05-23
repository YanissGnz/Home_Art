import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import AdminLogin from "./screens/AdminLogin";
import ClientLogin from "./screens/ClientLogin";
import ClientRegister from "./screens/ClientRegister";
import RecoverPassword from "./screens/RecoverPassword";
import NotFounded from "./screens/404";
import { useSelector} from 'react-redux'

const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#F58634",
		},
	},
});

export default function App() {
	const auth = useSelector(state => state.auth)
    const {isLogged} = auth	
     
return (

        <ThemeProvider theme={theme}>
			<Router>
				<Switch>
				<Route path="/admin" component={ isLogged ? NotFounded : AdminLogin} exact />
						
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
						<NotFounded />
					</Route>
				</Switch>
			</Router>
		</ThemeProvider>
		
	);
}
