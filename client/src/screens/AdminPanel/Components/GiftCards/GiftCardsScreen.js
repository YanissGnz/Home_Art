import React from "react";
import axios from "axios";
import NumberFormat from "react-number-format";
import {
	Button,
	CircularProgress,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Fab,
	InputAdornment,
	TextField,
	Toolbar,
	Typography,
	useTheme,
	IconButton,
	Tooltip,
} from "@material-ui/core";
import LoopRoundedIcon from "@material-ui/icons/LoopRounded";
import CardGiftcardRoundedIcon from "@material-ui/icons/CardGiftcardRounded";
import { useStyles } from "../../useStyles";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import Masonry from "react-masonry-css";

import "../../adminPanel.css";
import { useSelector } from "react-redux";
import GiftCardContainer from "./GiftCardContainer";

var voucher_codes = require("voucher-code-generator");

function giftCardCodeFormat(props) {
	const { inputRef, onChange, ...other } = props;

	return (
		<NumberFormat
			{...other}
			getInputRef={inputRef}
			onValueChange={(values) => {
				onChange({
					target: {
						name: props.name,
						value: values.value,
					},
				});
			}}
			format="#### #### #### ####"
		/>
	);
}

function PriceFormat(props) {
	const { inputRef, onChange, ...other } = props;

	return (
		<NumberFormat
			{...other}
			getInputRef={inputRef}
			onValueChange={(values) => {
				onChange({
					target: {
						name: props.name,
						value: values.value,
					},
				});
			}}
			thousandSeparator
			isNumericString
		/>
	);
}

/*For The Masonary Container*/
const breakpoints = {
	default: 3,
	1500: 2,
	1000: 1,
};

const initialState = {
	code: "",
	budget: 0,
};

export default function GiftCardsScreen() {
	const classes = useStyles();
	const theme = useTheme();
	const token = useSelector((state) => state.auth.token);
	const [giftCards, setGiftCards] = React.useState([]);
	const [giftCard, setGiftCard] = React.useState(initialState);
	const [msg, setMsg] = React.useState({});
	const [isLoading, setIsLoading] = React.useState(false);
	const [open, setOpen] = React.useState(false);

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
	}, [token]);

	const handleAddCodeOpen = (PromotedProduct) => {
		setOpen(true);
	};

	const handleAddCodeClose = () => {
		setOpen(false);
		setMsg("");
		setGiftCard(initialState);
	};

	const handleAddCode = async () => {
		setIsLoading(true);
		// Headers
		const config = {
			headers: {
				"x-auth-token": token,
			},
		};
		await axios
			.post(
				"/gift_card/add_gift_card",
				{
					code: giftCard.code,
					budget: giftCard.budget,
				},
				config
			)
			.then((res) => {
				setGiftCards(res.data.giftCards);
				setMsg(res.data.msg);
				setIsLoading(false);
				setGiftCard(initialState);
			})
			.catch((e) => {
				setIsLoading(false);
				console.log(e);
				setMsg(e.response.data.msg);
			});
	};

	const handleDelete = async (giftCardId) => {
		setIsLoading(true);
		// Headers
		const config = {
			headers: {
				"x-auth-token": token,
			},
		};
		await axios
			.delete(`/gift_card/delete_gift_card/${giftCardId}`, config)
			.then((res) => {
				setGiftCards(res.data.giftCards);
				setMsg(res.data.msg);
				setIsLoading(false);
			})
			.catch((e) => {
				setIsLoading(false);
				console.log(e);
			});
	};

	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setGiftCard({ ...giftCard, [name]: value });
	};

	const generateCode = () => {
		try {
			setGiftCard({
				...giftCard,
				code: voucher_codes
					.generate({
						length: 16,
						count: 1,
						charset: "0123456789",
					})
					.toString(),
			});
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<Container maxWidth="xl" className="dashbord_container">
			<Toolbar />
			{/*_________________Add Product Button_________________*/}
			<Fab
				color="primary"
				variant="extended"
				className={classes.addProductFab}
				onClick={handleAddCodeOpen}
			>
				<AddRoundedIcon className={classes.fabIcon} />
				Ajouter une carte cadeau
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
				{giftCards.length === 0 ? (
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<CardGiftcardRoundedIcon
							style={{ height: 100, width: 100, color: "rgba(0, 0, 0, 0.54)" }}
						/>
						<Typography
							color="textSecondary"
							style={{ fontSize: 30, fontWeight: 500 }}
						>
							Pas de carte cadeau
						</Typography>
					</div>
				) : (
					<Masonry
						breakpointCols={breakpoints}
						className="my-masonry-grid"
						columnClassName="my-masonry-grid_column"
						style={{
							width: "100%",
							display: "flex",
							marginLeft: "-12px",
						}}
					>
						{giftCards.map((giftCard) => (
							<GiftCardContainer
								giftCard={giftCard}
								handleDelete={handleDelete}
							/>
						))}
					</Masonry>
				)}
			</Container>
			<Dialog open={open} onClose={handleAddCodeClose} maxWidth="lg">
				<DialogTitle>Ajouter une carte cadeau</DialogTitle>
				<DialogContent>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							marginBottom: 30,
						}}
					>
						<TextField
							value={giftCard.code}
							variant="outlined"
							label="Code"
							name="code"
							fullWidth
							style={{ marginRight: 10 }}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<CardGiftcardRoundedIcon color="disabled" />
									</InputAdornment>
								),
								inputComponent: giftCardCodeFormat,
							}}
							onChange={handleChangeInput}
							helperText={msg.id === 0 ? msg.msg : null}
							error={msg.id === 0 ? true : false}
						/>
						<Tooltip title="Générer un code">
							<IconButton onClick={generateCode}>
								<LoopRoundedIcon color="primary" />
							</IconButton>
						</Tooltip>
					</div>
					<TextField
						value={giftCard.budget}
						variant="outlined"
						label="Budget"
						name="budget"
						onChange={handleChangeInput}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">Da</InputAdornment>
							),

							inputComponent: PriceFormat,
						}}
						className={classes.productInput}
						style={{ marginBottom: 30 }}
						fullWidth
						helperText={msg.id === 1 ? msg.msg : null}
						error={msg.id === 1 ? true : false}
					/>
					<div className={classes.wrapper}>
						<Button
							variant="contained"
							color="primary"
							className={classes.addProductBtn}
							type="submit"
							size="large"
							disabled={isLoading}
							onClick={handleAddCode}
						>
							Ajouter le carte cadeau
						</Button>
						{isLoading && (
							<CircularProgress
								size={24}
								style={{
									color: theme.palette.primary,
									position: "absolute",
									top: "50%",
									left: "50%",
									marginTop: -12,
									marginLeft: -13,
								}}
							/>
						)}
					</div>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleAddCodeClose} color="primary">
						Annuler
					</Button>
				</DialogActions>
			</Dialog>
		</Container>
	);
}
