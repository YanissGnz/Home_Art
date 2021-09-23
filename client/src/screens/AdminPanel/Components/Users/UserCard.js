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
				elevation={0}
				style={{
					width: "100%",
					borderRadius: 0,
					borderTop: "1px solid rgb(154 154 154)",
				}}
			>
				<CardContent
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						position: "relative",
						height: 60,
						marginTop: 10,
						marginBottom: 5,
					}}
				>
					<div
						style={{
							height: 50,
							width: "23%",
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
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
						<Typography noWrap style={{ width: "70%" }}>
							{user.name}
						</Typography>
					</div>
					<div
						style={{
							height: 50,
							width: "23%",
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
						}}
					>
						<Typography noWrap variant="body1" component="p">
							{user.email}
						</Typography>
					</div>
					<div
						style={{
							height: 50,
							width: "23%",
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
						}}
					>
						<Typography variant="body1" component="p">
							{user.createdAt.slice(0, 10)}
						</Typography>
					</div>
					<div
						style={{
							height: 50,
							width: "23%",
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							marginLeft: 4,
						}}
					>
						<Typography
							style={{ fontWeight: 500 }}
							variant="body1"
							component="p"
							color="secondary"
						>
							Activé
						</Typography>
					</div>
					<div
						style={{
							height: 50,
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
						}}
					>
						<IconButton
							onClick={() => {
								handleDeleteUser(user._id);
							}}
						>
							<DeleteOutlined />
						</IconButton>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
