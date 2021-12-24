import React from "react";
import { Link, Redirect } from "react-router-dom";
import { makeStyles, Button, Paper, Typography } from "@material-ui/core";

import * as routes from "../constants/routes";
import * as storage from "../constants/storage";

const useStyles = makeStyles(theme => ({
	layout: {
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
			marginLeft: "auto",
			marginRight: "auto",
			width: 500,
		},
		width: "auto",
	},
	item: {
		marginBottom: theme.spacing(5),
	},
	paper: {
		alignItems: "center",
		display: "flex",
		flexDirection: "column",
		marginBottom: theme.spacing(3),
		marginTop: theme.spacing(6),
		padding: theme.spacing(2),
	},
}));

export default function Confirmation(props) {
	const classes = useStyles();

	const orderID = localStorage.getItem(storage.ORDER);

	const handleClick = () => {
		localStorage.removeItem(storage.ORDER);
	};

	if (!orderID) {
		return <Redirect push to={routes.PRODUCTS[0]} />;
	}

	if (!props.isLoggedIn) {
		localStorage.setItem(storage.REDIRECT, routes.PAYMENT);
		return <Redirect push to={routes.LOGIN} />;
	}

	return (
		<main className={classes.layout}>
			<Paper className={classes.paper}>
				<Typography
					align="center"
					className={classes.item}
					component="h1"
					variant="h5"
				>
					Potvrda narudžbe
				</Typography>

				<Typography
					align="center"
					className={classes.item}
					variant="subtitle1"
				>
					Vaša narudžba je potvrđena. {<br />}Šifra narudžbe:{" "}
					{orderID}
				</Typography>
				<Button
					color="primary"
					component={Link}
					to={routes.PRODUCTS[0]}
					onClick={handleClick}
					variant="contained"
				>
					NASTAVI S KUPOVINOM
				</Button>
			</Paper>
		</main>
	);
}
