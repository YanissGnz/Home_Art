import {
	CardContent,
	Card,
	IconButton,
	Avatar,
	Typography,
} from "@material-ui/core";
import { DeleteOutlined } from "@material-ui/icons";
import React from "react";

export default function UserCard({ user, handleDeleteUser }) {
	return (
		<div>
			<Card
				variant="outlined"
				style={{
					width: "100%",
					borderRadius: 0,
					borderBottom: "3px solid rgb(154 154 154)",
					borderTop: "3px solid rgb(154 154 154)",
				}}
			>
				<CardContent
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						position: "relative",
						height: 60,
					}}
				>
					<div
						style={{
							height: 50,
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							position: "absolute",
							left: "2%",
						}}
					>
						<Avatar
							style={{
								marginRight: 10,
								background: "#f58641",
								fontSize: 20,
								fontWeight: 400,
							}}
							variant="body1"
							component="p"
						>
							{user.name[0]}
						</Avatar>
						<Typography>{user.name}</Typography>
					</div>

					<Typography
						style={{ position: "absolute", left: "24%" }}
						variant="body1"
						component="p"
					>
						{user.email}
					</Typography>
					<Typography
						style={{ position: "absolute", left: "47%" }}
						variant="body1"
						component="p"
					>
						{user.createdAt}
					</Typography>
					<Typography
						style={{ position: "absolute", left: "70%" }}
						variant="body1"
						component="p"
					>
						Activé
					</Typography>

					<IconButton
						style={{ position: "absolute", left: "95.4%" }}
						onClick={() => {
							handleDeleteUser(user._id);
						}}
					>
						<DeleteOutlined />
					</IconButton>
				</CardContent>
			</Card>
		</div>
	);
}
