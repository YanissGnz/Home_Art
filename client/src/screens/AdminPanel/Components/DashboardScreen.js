import { Container, Toolbar, Typography, Divider } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { Bar, Line } from "react-chartjs-2";
import ClientIcon from "../../../Icons/ClientsIcon";
import CommandesIcon from "../../../Icons/CommandesIcon";
import ProductsIcon from "../../../Icons/ProductsIcon";
import RevenueIcon from "../../../Icons/RevenueIcon";

export default function DashboardScreen({ usersCount }) {
	const productCount = useSelector((state) => state.products.products);
	const [users, setUsers] = React.useState(
		useSelector((state) => state.users.slice(0, 5))
	);
	console.log(users);

	const monthNames = [
		"Janvier",
		"Février ",
		"Mars",
		"Avril",
		"Mai",
		"Juin",
		"Juillet",
		"Août ",
		"Septembre",
		"Octobre",
		"November",
		"Decembre",
	];
	var weekdayNames = [
		"Dimanche",
		"Lundi",
		"Mardi",
		"Mercredi",
		"Jeudi",
		"Vendredi",
		"Samedi",
	];

	const dateObj = new Date();
	const weekday = weekdayNames[dateObj.getDay()];
	const day = String(dateObj.getDate()).padStart(2, "0");
	const month = monthNames[dateObj.getMonth()];
	const year = dateObj.getFullYear();

	const data = {
		labels: [
			"Janvier",
			"Février ",
			"Mars",
			"Avril",
			"Mai",
			"Juin",
			"Juillet",
			"Août ",
			"Septembre",
			"Octobre",
			"November",
			"Decembre",
		],
		datasets: [
			{
				label: "Revenu",
				data: [
					2000000, 5000000, 3000000, 2500000, 4000000, 5000000,
					//3000000, 4000000, 5000000, 2000000, 3500000, 4500000,
				],
				fill: false,
				borderColor: "#F58634",
				tension: 0.1,
				backgroundColor: [
					"#6b9d3b",
					"#8aaa47",
					"#a9b855",
					"#c6c666",
					"#e3d378",
					"#ffe18d",
					"#fcc876",
					"#f7ae65",
					"#f29459",
					"#ea7852",
					"#e15c50",
					"#d43d51",
				],
			},
		],
	};

	const Productsdata = {
		labels: [
			"Janvier",
			"Février ",
			"Mars",
			"Avril",
			"Mai",
			"Juin",
			"Juillet",
			"Août ",
			"Septembre",
			"Octobre",
			"November",
			"Decembre",
		],
		datasets: [
			{
				label: "Visiteur",
				data: [200, 500, 300, 250, 400, 500],
				fill: false,
				borderColor: "#F58634",
				tension: 0.1,
				backgroundColor: "#f7ae65",
			},
		],
	};
	return (
		<Container maxWidth="xl" className="dashbord_container">
			<Toolbar />
			<Typography variant="h4" style={{ fontWeight: 450 }}>
				Tableau de bord
			</Typography>
			<Typography style={{ marginBottom: 20, fontSize: 18, fontWeight: 400 }}>
				{`${weekday}, ${day} ${month} ${year}`}
			</Typography>
			<Container
				maxWidth="xl"
				style={{
					background: "white",

					borderRadius: "20px",
					display: "flex",
				}}
			>
				<div
					style={{
						width: "25%",
						display: "flex",
						padding: 20,
					}}
				>
					<ClientIcon />
					<div
						style={{
							padding: 5,
						}}
					>
						<Typography
							color="textSecondary"
							style={{ fontSize: 28, fontWeight: 450, marginLeft: 10 }}
						>
							Client
						</Typography>
						<Typography
							color="textPrimary"
							style={{ fontSize: 28, fontWeight: 450, marginLeft: 10 }}
						>
							{usersCount.length}
						</Typography>
					</div>
				</div>
				<div style={{ paddingTop: 20, paddingBottom: 20 }}>
					<Divider orientation="vertical" style={{ width: 2 }} />
				</div>
				<div
					style={{
						width: "25%",
						display: "flex",
						padding: 20,
					}}
				>
					<CommandesIcon />
					<div
						style={{
							padding: 5,
						}}
					>
						<Typography
							color="textSecondary"
							style={{ fontSize: 28, fontWeight: 450, marginLeft: 10 }}
						>
							Commandes
						</Typography>
						<Typography
							color="textPrimary"
							style={{ fontSize: 28, fontWeight: 450, marginLeft: 10 }}
						>
							0
						</Typography>
					</div>
				</div>
				<div style={{ paddingTop: 20, paddingBottom: 20 }}>
					<Divider orientation="vertical" style={{ width: 2 }} />
				</div>
				<div
					style={{
						width: "25%",
						display: "flex",
						padding: 20,
					}}
				>
					<ProductsIcon />
					<div
						style={{
							padding: 5,
						}}
					>
						<Typography
							color="textSecondary"
							style={{ fontSize: 28, fontWeight: 450, marginLeft: 10 }}
						>
							Produits
						</Typography>
						<Typography
							color="textPrimary"
							style={{ fontSize: 28, fontWeight: 450, marginLeft: 10 }}
						>
							{productCount.length}
						</Typography>
					</div>
				</div>
				<div style={{ paddingTop: 20, paddingBottom: 20 }}>
					<Divider orientation="vertical" style={{ width: 2 }} />
				</div>
				<div
					style={{
						width: "25%",
						display: "flex",
						padding: 20,
					}}
				>
					<RevenueIcon />
					<div
						style={{
							padding: 5,
						}}
					>
						<Typography
							color="textSecondary"
							style={{ fontSize: 28, fontWeight: 450, marginLeft: 10 }}
						>
							Revenue
						</Typography>
						<Typography
							color="textPrimary"
							style={{ fontSize: 28, fontWeight: 450, marginLeft: 10 }}
						>
							545000 Da
						</Typography>
					</div>
				</div>
			</Container>
			<div style={{ display: "flex", marginTop: 30 }}>
				<Container
					style={{
						marginLeft: 0,
						marginRight: 20,
						background: "white",
						borderRadius: "20px",
						width: "50%",
						padding: 20,
					}}
				>
					<Typography
						color="textSecondary"
						style={{
							margin: 10,
							fontSize: 26,
							fontWeight: 500,
						}}
					>
						Revenue
					</Typography>
					<Bar data={data} />
				</Container>
				<Container
					style={{
						marginLeft: 0,
						marginRight: 0,
						background: "white",
						borderRadius: "20px",
						width: "50%",
						padding: 20,
					}}
				>
					<Typography
						color="textSecondary"
						style={{
							margin: 10,
							fontSize: 26,
							fontWeight: 500,
						}}
					>
						Visituers
					</Typography>
					<Line data={Productsdata} />
				</Container>
			</div>
			<div
				style={{
					display: "flex",
					marginTop: 30,
					marginBottom: 20,
				}}
			>
				<Container
					maxWidth="xl"
					style={{
						background: "white",
						borderRadius: "20px",
						display: "flex",
						flexDirection: "column",
						marginLeft: 0,
						width: "50%",
						marginRight: 20,
						paddingBottom: 20,
					}}
				>
					<Typography
						color="textSecondary"
						style={{
							margin: 10,
							fontSize: 26,
							fontWeight: 500,
						}}
					>
						Client récent
					</Typography>
					<div
						style={{
							display: "flex",
							width: "100%",
						}}
					>
						<div
							style={{
								width: "25%",
								display: "flex",
								padding: 20,
							}}
						>
							<Typography
								style={{ fontSize: 20, fontWeight: 450, marginLeft: 10 }}
							>
								Nom
							</Typography>
						</div>
						<div
							style={{
								width: "50%",
								display: "flex",
								padding: 20,
							}}
						>
							<Typography
								style={{ fontSize: 20, fontWeight: 450, marginLeft: 10 }}
							>
								Email
							</Typography>
						</div>
						<div
							style={{
								width: "25%",
								display: "flex",
								padding: 20,
							}}
						>
							<Typography
								style={{ fontSize: 20, fontWeight: 450, marginLeft: 10 }}
							>
								Date
							</Typography>
						</div>
					</div>
					{users.map((user) => (
						<div
							style={{
								display: "flex",
								width: "100%",
								marginBottom: 10,
								borderRadius: 20,
								border: "1px solid rgb(217 217 217)",
							}}
							className="recent_client_div"
						>
							<div
								style={{
									width: "25%",
									display: "flex",
									padding: 20,
								}}
							>
								<Typography
									color="textPrimary"
									style={{
										fontSize: 18,
										fontWeight: 450,
										marginLeft: 10,
										textTransform: "capitalize",
									}}
								>
									{user.name}
								</Typography>
							</div>
							<div
								style={{
									width: "50%",
									display: "flex",
									padding: 20,
								}}
							>
								<Typography
									color="textSecondary"
									style={{ fontSize: 18, fontWeight: 450, marginLeft: 10 }}
								>
									{user.email}
								</Typography>
							</div>
							<div
								style={{
									width: "25%",
									display: "flex",
									padding: 20,
								}}
							>
								<Typography
									color="textSecondary"
									style={{ fontSize: 18, fontWeight: 450, marginLeft: 10 }}
								>
									{user.createdAt.slice(0, 10)}
								</Typography>
							</div>
						</div>
					))}
				</Container>
				<Container
					maxWidth="xl"
					style={{
						background: "white",
						borderRadius: "20px",
						display: "flex",
						flexDirection: "column",
						marginLeft: 0,
						width: "50%",
					}}
				>
					<Typography
						color="textSecondary"
						style={{
							margin: 10,
							fontSize: 26,
							fontWeight: 500,
						}}
					>
						Commandes récent
					</Typography>
					<div
						style={{
							display: "flex",
							width: "100%",
						}}
					>
						<div
							style={{
								width: "25%",
								display: "flex",
								padding: 20,
							}}
						>
							<Typography
								color="textSecondary"
								style={{ fontSize: 20, fontWeight: 450, marginLeft: 10 }}
							>
								Client
							</Typography>
						</div>
						<div
							style={{
								width: "50%",
								display: "flex",
								padding: 20,
							}}
						>
							<Typography
								color="textSecondary"
								style={{ fontSize: 20, fontWeight: 450, marginLeft: 10 }}
							>
								Produit
							</Typography>
						</div>
						<div
							style={{
								width: "25%",
								display: "flex",
								padding: 20,
							}}
						>
							<Typography
								color="textSecondary"
								style={{ fontSize: 20, fontWeight: 450, marginLeft: 10 }}
							>
								Date
							</Typography>
						</div>
					</div>
				</Container>
			</div>
		</Container>
	);
}
