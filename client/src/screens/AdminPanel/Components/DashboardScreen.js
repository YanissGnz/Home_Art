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
import { useStyles } from "../useStyles";

export default function DashboardScreen() {
	const classes = useStyles();

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
							<CardHeader title="Produit" className={classes} />
							<CardContent>
								<Typography variant="h4" color="primary">
									0
								</Typography>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<Card className={classes.cart} elevation={5}>
							<CardHeader title="Revenu" className={classes} />
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
