import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
	makeStyles,
	Button,
	Container,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Table,
} from "@material-ui/core";
import HighlightOffSharpIcon from "@material-ui/icons/HighlightOffSharp";

import * as routes from "../constants/routes";
import * as storage from "../constants/storage";
import { formatPrice } from "../utils/format-price";

const useStyles = makeStyles(theme => ({
	button: {
		marginTop: theme.spacing(4),
	},
	table: {
		marginBottom: theme.spacing(6),
		marginTop: theme.spacing(6),
	},
}));

export default function Cart() {
	const classes = useStyles();

	let [products, setProducts] = useState([{}]);

	useEffect(() => {
		let cartProducts = JSON.parse(localStorage.getItem(storage.CART));

		if (!cartProducts) {
			cartProducts = [];
			localStorage.setItem(storage.CART, JSON.stringify(cartProducts));
		}

		console.log("Cart items: ", cartProducts);
		console.log("Cart length: ", cartProducts.length);

		setProducts(cartProducts);
	}, []);

	return (
		<Container>
			<Button
				className={classes.button}
				color="inherit"
				component={Link}
				to={routes.PRODUCTS[0]}
				variant="outlined"
			>
				POVRATAK NA PROIZVODE
			</Button>
			<TableContainer className={classes.table}>
				<Table aria-label="spanning table">
					<TableHead>
						<TableRow>
							<TableCell>PROIZVOD</TableCell>
							<TableCell align="right">KOL.</TableCell>
							<TableCell align="right">CIJENA</TableCell>
							<TableCell align="right">UKUPNO</TableCell>
							<TableCell align="right"></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{products.map(product => (
							<TableRow key={products.indexOf(product)}>
								<TableCell>{product.name}</TableCell>
								<TableCell align="right">
									{product.amount}
								</TableCell>
								<TableCell align="right">
									{formatPrice(product.price)}
								</TableCell>
								<TableCell align="right">
									{formatPrice(
										product.price * product.amount
									)}
								</TableCell>

								<TableCell align="right">
									<Button
										onClick={() => {
											let index =
												products.indexOf(product);
											console.log(
												"Index of deleted product: ",
												index
											);

											setProducts(prevState => {
												const newProducts =
													prevState.filter(
														(_, i) => i !== index
													);
												localStorage.setItem(
													storage.CART,
													JSON.stringify(newProducts)
												);
												return newProducts;
											});
										}}
									>
										<HighlightOffSharpIcon />
									</Button>
								</TableCell>
							</TableRow>
						))}
						<TableRow>
							<TableCell colSpan={1}>
								<strong>UKUPNO</strong>
							</TableCell>
							<TableCell>
								<strong>
									{formatPrice(
										products.reduce(
											(sum, product) =>
												sum +
												product.price * product.amount,
											0
										)
									)}
								</strong>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
			{products.length ? (
				<Button
					color="inherit"
					component={Link}
					to={routes.PAYMENT}
					variant="outlined"
				>
					NASTAVI NA PLAĆANJE
				</Button>
			) : (
				<Button
					color="inherit"
					component={Link}
					to={routes.PAYMENT}
					variant="outlined"
					disabled
				>
					NASTAVI NA PLAĆANJE
				</Button>
			)}
		</Container>
	);
}
