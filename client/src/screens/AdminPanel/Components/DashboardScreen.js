import {
	Card,
	CardContent,
	CardHeader,
	Container,
	Grid,
	Toolbar,
	Typography,
} from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { useStyles } from "../useStyles";

export default function DashboardScreen() {
	const classes = useStyles();
	const productCount = useSelector((state) => state.products.products);
	console.log(typeof productCount);

	return (
		<div className="admin_panel">
			<Container maxWidth="xl" className="dashbord_container">
				<Toolbar />
				<Typography variant="h5" className={classes.dashboardText}>
					Tableau de bord
				</Typography>
				<Grid container spacing={5}>
					<Grid item xs={12} sm={6} md={3}>
						<Card className={classes.cart} elevation={5}>
							<CardHeader title="Commandes" />
							<CardContent>
								<Typography variant="h4" color="primary">
									0
								</Typography>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<Card className={classes.cart} elevation={5}>
							<CardHeader title="Client" />
							<CardContent>
								<Typography variant="h4" color="primary">
									0
								</Typography>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<Card className={classes.cart} elevation={5}>
							<CardHeader title="Produit" />
							<CardContent>
								<Typography variant="h4" color="primary">
									{productCount.length}
								</Typography>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<Card className={classes.cart} elevation={5}>
							<CardHeader title="Revenu" />
							<CardContent>
								<Typography variant="h4" color="primary">
									0 DZD
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
}