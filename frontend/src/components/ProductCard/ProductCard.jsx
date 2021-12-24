import React from "react";
import { Link } from "react-router-dom";
import {
	makeStyles,
	Card,
	CardContent,
	CardActions,
	CardMedia,
	Typography,
	Button,
} from "@material-ui/core";

import * as routes from "../../constants/routes";

const useStyles = makeStyles(() => ({
	cardContent: {
		flexGrow: 1,
	},
	cardMedia: {
		paddingTop: "56.25%", // 16:9
	},
	card: {
		display: "flex",
		flexDirection: "column",
		height: "100%",
	},
}));

export default function ProductCard({
	name,
	description,
	image: img,
	_id: productID,
}) {
	const classes = useStyles();

	return (
		<>
			<Card className={classes.card}>
				<CardMedia
					className={classes.cardMedia}
					image={img}
					title={name}
				/>
				<CardContent className={classes.cardContent}>
					<Typography component="h2" gutterBottom variant="h6">
						<strong>{name}</strong>
					</Typography>
					<Typography>{description}</Typography>
				</CardContent>
				<CardActions>
					<Button
						color="secondary"
						component={Link}
						to={routes.PRODUCT(productID)}
						size="small"
						variant="outlined"
					>
						POGLEDAJ PROIZVOD
					</Button>
				</CardActions>
			</Card>
		</>
	);
}
