import React from "react";
import axios from "axios";
import NumberFormat from "react-number-format";
import {
	Backdrop,
	Button,
	Card,
	CircularProgress,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Fab,
	InputAdornment,
	MenuItem,
	Snackbar,
	TextField,
	Toolbar,
	Typography,
	Divider,
	useTheme,
	FormControlLabel,
	Radio,
	FormControl,
	FormLabel,
	RadioGroup,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

import { useStyles } from "../../useStyles";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import Masonry from "react-masonry-css";

import "../../adminPanel.css";
import { useSelector } from "react-redux";

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

/*For The Masonary Container*/
const breakpoints = {
	default: 5,
	1600: 4,
	1100: 2,
	700: 1,
};

const initialState = {
	code: "",
	budget: 0,
};

export default function GiftCardsScreen() {
	const classes = useStyles();
	const token = useSelector((state) => state.auth.token);
	const [giftCards, setGiftCards] = React.useState([]);

	React.useEffect(() => {
		const getGiftCards = async () => {
			//Header
			const config = {
				headers: {
					"x-auth-token": token,
				},
			};
			await axios
				.get("/gift_card/get_gift_Cards", config)
				.then((res) => {
					setGiftCards(res.data.giftCards);
				})
				.catch((e) => {
					console.log(e);
				});
		};

		getGiftCards();
	}, []);

	return (
		<Container maxWidth="xl" className="dashbord_container">
			<Toolbar />
			{/*_________________Add Product Button_________________*/}
			<Fab color="primary" variant="extended" className={classes.addProductFab}>
				<AddRoundedIcon className={classes.fabIcon} />
				Ajouter une cart cadeau
			</Fab>

			<Typography variant="h5" className={classes.dashboardText}>
				Card cadeau
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
					{giftCards.map((giftCard) => (
						<div>
							<Typography>{giftCard.code}</Typography>
						</div>
					))}
				</Masonry>
			</Container>
		</Container>
	);
}
