import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
	makeStyles,
	ButtonBase,
	Button,
	Container,
	Grid,
	Paper,
	Typography,
} from "@material-ui/core/";

import * as routes from "../constants/routes";
import * as storage from "../constants/storage";
import { formatPrice } from "../utils/format-price";
import http from "../utils/http";

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		[theme.breakpoints.up("md")]: {
			fontSize: "2.4rem",
		},
	},
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
	cart: {
		marginLeft: theme.spacing(3),
	},
	grid: {
		height: "75vh",
	},
	img: {
		display: "block",
		height: "100%",
		width: "100%",
	},
	paper: {
		backgroundColor: "inherit",
		borderColor: "transparent",
		paddingLeft: theme.spacing(4),
		paddingRight: theme.spacing(4),
		[theme.breakpoints.up("sm")]: {
			paddingBotom: theme.spacing(4),
			paddingLeft: theme.spacing(10),
			paddingRight: theme.spacing(10),
			paddingTop: theme.spacing(4),
		},
		[theme.breakpoints.up("md")]: {
			paddingBotom: theme.spacing(8),
			paddingLeft: theme.spacing(10),
			paddingRight: theme.spacing(10),
			paddingTop: theme.spacing(8),
		},
		[theme.breakpoints.up("lg")]: {
			paddingLeft: theme.spacing(20),
			paddingRight: theme.spacing(20),
		},
	},
	price: {
		[theme.breakpoints.up("xs")]: {
			paddingBottom: theme.spacing(2),
			paddingTop: theme.spacing(5),
		},
		[theme.breakpoints.up("md")]: {
			paddingBottom: theme.spacing(2),
			paddingTop: theme.spacing(14),
		},
		[theme.breakpoints.up("lg")]: {
			paddingBottom: theme.spacing(2),
			paddingLeft: theme.spacing(1),
			paddingTop: theme.spacing(14),
		},
	},
}));

const addToCart = product => {
	let cartArray;

	const cart = JSON.parse(localStorage.getItem(storage.CART));
	if (!Array.isArray(cart)) {
		cartArray = [];
	} else {
		cartArray = cart;
	}

	const cartItem = {
		amount: 1,
		name: product.name,
		price: product.price,
		productID: product._id,
	};

	const index = cartArray.findIndex(item => item.name === cartItem.name);
	if (index === -1) {
		cartArray.push(cartItem);
	} else {
		cart[index].amount++;
	}

	localStorage.setItem(storage.CART, JSON.stringify(cartArray));
};

export default function Product() {
	const classes = useStyles();
	const { id } = useParams();

	const [product, setProduct] = useState({});

	const retrieveProduct = async id => {
		try {
			const res = await http.get(`/products/${id}`);
			console.log("Product: ", res.data);

			setProduct(res.data.product);
		} catch (error) {
			console.log("Error retrieving product: ", error);
		}
	};

	useEffect(() => {
		retrieveProduct(id);
	}, [id]);

	return (
		<Container className={classes.root}>
			<Button
				className={classes.button}
				color="inherit"
				component={Link}
				to={routes.PRODUCTS[0]}
				variant="outlined"
			>
				POVRATAK NA PROIZVODE
			</Button>
			<Paper className={classes.paper} elevation={0}>
				<Grid className={classes.grid} container spacing={4}>
					<Grid item lg={1} />
					<Grid item xs={12} md={6}>
						<ButtonBase disabled={true}>
							<img
								alt={product.name}
								className={classes.img}
								src={product.image}
							/>
						</ButtonBase>
					</Grid>
					<Grid container item xs={12} md={5}>
						<Grid direction="column" container item>
							<Grid item>
								<Typography gutterBottom variant="h5">
									{product.company}
								</Typography>
								<Typography gutterBottom variant="h4">
									{product.name}
								</Typography>
								<Typography
									color="textSecondary"
									variant="body2"
								>
									{product.description}
								</Typography>
							</Grid>
							<Grid
								className={classes.price}
								spacing={2}
								container
								item
							>
								<Grid item>
									<Typography variant="h5">
										<strong>
											{formatPrice(product.price)}
										</strong>
									</Typography>
								</Grid>
								<Button
									className={classes.cart}
									color="secondary"
									component={Link}
									to={routes.CART}
									onClick={() => addToCart(product)}
									size="small"
									variant="outlined"
									disableElevation
								>
									DODAJ U KOŠARICU
								</Button>
							</Grid>
						</Grid>
					</Grid>
					<Grid item lg={1} />
				</Grid>
			</Paper>
		</Container>
	);
}
