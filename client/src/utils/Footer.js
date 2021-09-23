import { Divider, Typography } from "@material-ui/core";
import React from "react";
import FacebookIcon from "../Icons/FacebookIcon";
import GoogleIcon from "../Icons/GoogleIcon";
import InstagramLogo from "../Icons/InstagramLogo";

export default function Footer() {
	return (
		<div
			style={{
				backgroundColor: "rgb(34 34 34)",
				marginTop: 50,
				display: "flex",
				flexDirection: "column",
				padding: 50,
			}}
		>
			<div
				style={{
					display: "flex",
					width: "100%",
				}}
			>
				<div
					style={{
						width: "25%",
					}}
				>
					<Typography variant="h5" style={{ color: "white", fontWeight: 500 }}>
						Categories
					</Typography>
					<a href="/categorie/Meuble" className="fotter_links">
						<Typography
							style={{
								marginTop: 15,
								color: "white",
								textDecoration: "none",
								fontSize: 14,
								fontWeight: 300,
							}}
						>
							Meuble
						</Typography>
					</a>
					<a href="/categorie/Literie" className="fotter_links">
						<Typography
							style={{
								marginTop: 15,
								color: "white",
								textDecoration: "none",
								fontSize: 14,
								fontWeight: 300,
							}}
						>
							Literie
						</Typography>
					</a>
					<a href="/categorie/Vaisselle" className="fotter_links">
						<Typography
							style={{
								marginTop: 15,
								color: "white",
								textDecoration: "none",
								fontSize: 14,
								fontWeight: 300,
							}}
						>
							Vaisselle
						</Typography>
					</a>
					<a href="/categorie/Décoration" className="fotter_links">
						<Typography
							style={{
								marginTop: 15,
								color: "white",
								textDecoration: "none",
								fontSize: 14,
								fontWeight: 300,
							}}
						>
							Décoration
						</Typography>
					</a>
					<a href="/categorie/Robots" className="fotter_links">
						<Typography
							style={{
								marginTop: 15,
								color: "white",
								textDecoration: "none",
								fontSize: 14,
								fontWeight: 300,
							}}
						>
							Robots
						</Typography>
					</a>
					<a href="/categorie/Autre" className="fotter_links">
						<Typography
							style={{
								marginTop: 15,
								color: "white",
								textDecoration: "none",
								fontSize: 14,
								fontWeight: 300,
							}}
						>
							Autre
						</Typography>
					</a>
				</div>
				<div
					style={{
						width: "25%",
					}}
				>
					<Typography variant="h5" style={{ color: "white", fontWeight: 500 }}>
						A propos
					</Typography>
					<a href="/" className="fotter_links">
						<Typography
							style={{
								marginTop: 15,
								color: "white",
								textDecoration: "none",
								fontSize: 14,
								fontWeight: 300,
							}}
						>
							Qui somme nous?
						</Typography>
					</a>
					<a href="/" className="fotter_links">
						<Typography
							style={{
								marginTop: 15,
								color: "white",
								textDecoration: "none",
								fontSize: 14,
								fontWeight: 300,
							}}
						>
							Confidentialité et notification sur les cookies
						</Typography>
					</a>
					<a href="/" className="fotter_links">
						<Typography
							style={{
								marginTop: 15,
								color: "white",
								textDecoration: "none",
								fontSize: 14,
								fontWeight: 300,
							}}
						>
							Conditions Générales d'Utilisation
						</Typography>
					</a>
				</div>
				<div
					style={{
						width: "25%",
					}}
				>
					<Typography variant="h5" style={{ color: "white", fontWeight: 500 }}>
						Service Client
					</Typography>
					<a href="/" className="fotter_links">
						<Typography
							style={{
								marginTop: 15,
								color: "white",
								textDecoration: "none",
								fontSize: 14,
								fontWeight: 300,
							}}
						>
							Centre d'assistance
						</Typography>
					</a>
					<a href="/" className="fotter_links">
						<Typography
							style={{
								marginTop: 15,
								color: "white",
								textDecoration: "none",
								fontSize: 14,
								fontWeight: 300,
							}}
						>
							Modes de paiement
						</Typography>
					</a>
					<a href="/" className="fotter_links">
						<Typography
							style={{
								width: "100%",
								marginTop: 15,
								color: "white",
								fontSize: 14,
								fontWeight: 300,
							}}
						>
							Retour & Remboursement
						</Typography>
					</a>
				</div>

				<div
					style={{
						width: "25%",
					}}
				>
					<Typography variant="h5" style={{ color: "white", fontWeight: 500 }}>
						Réseaux Sociaux
					</Typography>
					<div style={{ marginTop: 40, display: "flex", width: "5	0%" }}>
						<a href="/" style={{ marginRight: 20 }}>
							<FacebookIcon />
						</a>
						<a href="/" style={{ marginRight: 20 }}>
							<InstagramLogo />
						</a>
						<a href="/" style={{ marginRight: 20 }}>
							<GoogleIcon />
						</a>
					</div>
				</div>
			</div>
			<Divider
				style={{
					marginTop: 10,
					background: "white",
				}}
			/>
			<div
				style={{
					marginTop: 10,
					display: "flex",
					width: "100%",
					justifyContent: "center",
				}}
			>
				<Typography
					variant="body1"
					style={{
						color: "white",
						marginTop: 10,
					}}
				>
					Copyright © 2021 Home Art Company S.L. Tous les droits sont réservés.
				</Typography>
			</div>
		</div>
	);
}
