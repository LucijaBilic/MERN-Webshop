import React from "react";
import { Link } from "react-router-dom";
import { makeStyles, Button } from "@material-ui/core";

import * as routes from "../../constants/routes";

const useStyles = makeStyles(theme => ({
	button: {
		marginLeft: theme.spacing(4),
		marginTop: theme.spacing(4),
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing(10),
			marginTop: theme.spacing(4),
		},
		[theme.breakpoints.up("md")]: {
			marginLeft: theme.spacing(14),
			marginTop: theme.spacing(4),
		},
		[theme.breakpoints.up("lg")]: {
			marginLeft: theme.spacing(30),
			marginTop: theme.spacing(4),
		},
	},
}));

export default function ProductsButton() {
	const classes = useStyles();

	return (
		<Button
			className={classes.button}
			color="inherit"
			component={Link}
			to={routes.PRODUCTS[0]}
			variant="outlined"
		>
			POVRATAK NA PROIZVODE
		</Button>
	);
}
