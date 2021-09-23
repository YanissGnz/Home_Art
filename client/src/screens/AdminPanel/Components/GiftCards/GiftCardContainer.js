import {
	Card,
	CardHeader,
	IconButton,
	Menu,
	MenuItem,
	Typography,
} from "@material-ui/core";
import React from "react";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import GiftCardLogo from "../../../../Icons/GiftCardHomeArtLogo";

export default function GiftCardContainer({ giftCard, handleDelete }) {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleMenuClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};
	return (
		<Card
			style={{
				height: 250,
				width: "100%",
				backgroundColor: "#2e2e2e",
				borderRadius: 25,
				position: "relative",
			}}
			elevation={10}
		>
			<CardHeader
				action={
					<div>
						<IconButton>
							<MoreVertIcon
								style={{ color: "white" }}
								onClick={handleMenuClick}
							/>
						</IconButton>
						<Menu
							id="simple-menu"
							anchorEl={anchorEl}
							keepMounted
							open={Boolean(anchorEl)}
							onClose={handleMenuClose}
						>
							<MenuItem
								onClick={() => {
									handleMenuClose();
									handleDelete(giftCard._id);
								}}
							>
								<DeleteOutlined fontSize="small" style={{ marginRight: 5 }} />
								Supprimer
							</MenuItem>
						</Menu>
					</div>
				}
			/>
			<div>
				<div
					style={{
						position: "absolute",
						left: 20,
						top: 10,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<GiftCardLogo />

					<Typography
						style={{
							fontSize: 18,
							fontWeight: 500,
							color: "white",
						}}
					>
						Home Art
					</Typography>
				</div>
				<div>
					<Typography
						style={{
							position: "absolute",
							left: 20,
							top: 90,
							fontSize: 40,
							color: "white",
							fontFamily: "Dancing Script",
						}}
						className="gift-card-text"
					>
						Cart cadeau
					</Typography>
					<div
						style={{
							backgroundColor: "white",
							height: 1,
							width: "100%",
							position: "absolute",
							top: 150,
						}}
					/>
					<div
						style={{
							position: "absolute",
							top: 155,
							width: "100%",
							display: "flex",
							justifyContent: "center",
						}}
					>
						<Typography
							style={{
								fontSize: 25,
								fontWeight: 550,
								color: "white",
								letterSpacing: 2,
							}}
						>
							{giftCard.code}
						</Typography>
					</div>
					<div
						style={{
							backgroundColor: "white",
							height: 1,
							width: "100%",
							position: "absolute",
							top: 195,
						}}
					/>
					<Typography
						style={{
							position: "absolute",
							top: 200,
							right: 30,
							fontSize: 30,
							fontWeight: 600,
							color: "white",
						}}
					>
						{giftCard.budget} Da
					</Typography>
				</div>
			</div>
		</Card>
	);
}
