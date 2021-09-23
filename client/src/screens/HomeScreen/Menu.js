import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useHistory } from "react-router";
import { Divider } from "@material-ui/core";

export const useStyles = makeStyles({
	button: {
		marginRight: 20,
		padding: 10,
		fontWeight: "550",
		fontSize: "16px",
		textTransform: "capitalize",
	},
});

const StyledMenu = withStyles({
	paper: {
		border: "1px solid #d3d4d5",
	},
})((props) => (
	<Menu
		elevation={0}
		getContentAnchorEl={null}
		anchorOrigin={{
			vertical: "bottom",
			horizontal: "center",
		}}
		transformOrigin={{
			vertical: "top",
			horizontal: "center",
		}}
		{...props}
	/>
));

const StyledMenuItem = withStyles((theme) => ({
	root: {
		"&:focus": {
			"& .MuiListItemIcon-root, & .MuiListItemText-primary": {
				color: theme.palette.common.black,
			},
		},
	},
}))(MenuItem);

export default function Menus() {
	const classes = useStyles();

	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const history = useHistory();

	return (
		<div>
			<Button
				aria-controls="customized-menu"
				aria-haspopup="true"
				color="primary"
				className={classes.button}
				onClick={handleClick}
			>
				Se Connecter
			</Button>

			<StyledMenu
				id="customized-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<StyledMenuItem
					onClick={() => {
						history.push("/login");
					}}
				>
					<ListItemText primary="Se Connecter" />
				</StyledMenuItem>
				<Divider variant="middle" />
				<StyledMenuItem
					onClick={() => {
						history.push("/register");
					}}
				>
					<ListItemText primary="Crée un Compte" />
				</StyledMenuItem>
			</StyledMenu>
		</div>
	);
}
