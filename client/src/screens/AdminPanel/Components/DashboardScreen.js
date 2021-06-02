import {
	Card,
	CardContent,
	CardHeader,
	Container,
	Toolbar,
	Typography,
} from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { useStyles } from "../useStyles";
import Masonry from "react-masonry-css";

export default function DashboardScreen() {
	const classes = useStyles();
	const productCount = useSelector((state) => state.products.products);
	const breakpoints = {
		default: 4,
		1100: 2,
		700: 1,
	};
	return (
		<div className="admin_panel">
			<Container maxWidth="xl" className="dashbord_container">
				<Toolbar />
				<Typography variant="h5" className={classes.dashboardText}>
					Tableau de bord
				</Typography>
				<Masonry
					breakpointCols={breakpoints}
					className="my-masonry-grid"
					columnClassName="my-masonry-grid_column"
				>
					<Card className={classes.cart} elevation={5}>
						<CardHeader title="Commandes" />
						<CardContent>
							<Typography variant="h4" color="primary">
								0
							</Typography>
						</CardContent>
					</Card>
					<Card className={classes.cart} elevation={5}>
						<CardHeader title="Client" />
						<CardContent>
							<Typography variant="h4" color="primary">
								0
							</Typography>
						</CardContent>
					</Card>
					<Card className={classes.cart} elevation={5}>
						<CardHeader title="Produit" />
						<CardContent>
							<Typography variant="h4" color="primary">
								{productCount.length}
							</Typography>
						</CardContent>
					</Card>
					<Card className={classes.cart} elevation={5}>
						<CardHeader title="Revenu" />
						<CardContent>
							<Typography variant="h4" color="primary">
								0 Da
							</Typography>
						</CardContent>
					</Card>
				</Masonry>
			</Container>
		</div>
	);
}
