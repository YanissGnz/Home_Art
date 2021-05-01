import { makeStyles } from "@material-ui/core";
import React from "react";
import "../App.css";

const useStyles = makeStyles({
	img: {
		height: "24em",
		width: "24em",
	},
});

export default function NotFound() {
	const classes = useStyles();

	return (
		<div>
			{" "}
			<img src="/404Error.gif" alt="404_img" className={classes.img} />
		</div>
	);
}
