import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AdminLogin from "./screens/AdminLogin";

export default function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/admin">
					<AdminLogin />
				</Route>
			</Switch>
		</Router>
	);
}
