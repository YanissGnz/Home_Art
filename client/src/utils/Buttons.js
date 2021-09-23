import { Button, withStyles } from "@material-ui/core";

export const CustomButton = withStyles({
	root: {
		textTransform: "capitalize",
		fontSize: 15,
		fontWeight: 400,
		color: "#fff",
		padding: "6px 12px",
		border: "1px solid linear-gradient(45deg, #FFE600 , #FF7C22)",
		lineHeight: 1.5,
		background: "linear-gradient(60deg, #FFE600 40% , #FF7C22 90%)",
		boxShadow: "0px 2px 12px 0px rgb(100 49 13 / 50%)",
		fontFamily: ["Poppins"],
		"&:hover": {
			background: "linear-gradient(60deg, #FFE600 40% , #FF7C22 80%)",
			borderColor: "#FF7C22",
			boxShadow: "0px 3px 13px 3px rgb(100 49 13 / 50%)",
		},
		"&:active": {
			boxShadow: "none",
			backgroundColor: "#0062cc",
			borderColor: "#005cbf",
		},
		"&:focus": {
			boxShadow: "0px 5px 11px 5px rgb(100 49 13 / 50%)",
		},
	},
})(Button);
