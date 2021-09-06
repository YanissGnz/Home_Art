import React, { useState, useEffect } from "react";
import { Container, Toolbar, Typography } from "@material-ui/core";
import axios from "axios";
import { useSelector } from "react-redux";
import Masonry from "react-masonry-css";
import AdminOrderContainer from "./AdminOrderContainer";

/*For The Masonary Container*/
const breakpoints = {
	default: 2,
	1100: 1,
};

export default function OrdersScreen() {
	const token = useSelector((state) => state.auth.token);

	const [orders, setOrders] = useState([]);

	useEffect(() => {
		// Headers
		const config = {
			headers: {
				"x-auth-token": token,
			},
		};

		axios
			.get("/users/get_orders", config)
			.then((res) => {
				setOrders(res.data.orders);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [token]);

	const handleValidateOrder = (order_id, user_id) => {
		// Headers
		const config = {
			headers: {
				"x-auth-token": token,
			},
		};

		axios
			.post("/users/validate_order", { order_id, user_id }, config)
			.then((res) => {
				setOrders(res.data.orders);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<Container maxWidth="xl" className="dashbord_container">
			<Toolbar />
			<Typography variant="h4" style={{ fontWeight: 450 }}>
				Commaneds
			</Typography>
			<Container
				maxWidth="xl"
				style={{
					backgroundColor: "white",
					borderRadius: 20,
					padding: 20,
				}}
				className="main"
			>
				<Masonry
					breakpointCols={breakpoints}
					className="my-masonry-grid"
					columnClassName="my-masonry-grid_column"
					style={{ width: "100%" }}
				>
					{orders.map((order) => (
						<AdminOrderContainer
							order={order}
							handleValidateOrder={handleValidateOrder}
						/>
					))}
				</Masonry>
			</Container>
		</Container>
	);
}
