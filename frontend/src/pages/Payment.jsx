import { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import {
	makeStyles,
	Avatar,
	Button,
	Container,
	TextField,
	Typography,
} from "@material-ui/core";
import PaymentOutlinedIcon from "@material-ui/icons/PaymentOutlined";

import * as routes from "../constants/routes";
import * as storage from "../constants/storage";
import http from "../utils/http";

const useStyles = makeStyles(theme => ({
	avatar: {
		backgroundColor: theme.palette.secondary.main,
		margin: theme.spacing(1),
	},
	form: {
		width: "100%",
		marginTop: theme.spacing(1),
	},
	paper: {
		alignItems: "center",
		display: "flex",
		flexDirection: "column",
		marginTop: theme.spacing(6),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function Payment(props) {
	const classes = useStyles();
	const history = useHistory();

	const [errors, setErrors] = useState({
		cardName: false,
		cardNumber: false,
		cvv: false,
		expirationDate: false,
	});

	const handleCardNumberBlur = e => {
		if (
			!Number.isInteger(Number(e.target.value)) ||
			e.target.value.length !== 16
		) {
			return setErrors(prevState => {
				return { ...prevState, cardNumber: true };
			});
		}

		setErrors(prevState => {
			return { ...prevState, cardNumber: false };
		});
	};

	const handleCvvBlur = e => {
		if (
			!Number.isInteger(Number(e.target.value)) ||
			e.target.value.length !== 3
		) {
			return setErrors(prevState => {
				return { ...prevState, cvv: true };
			});
		}

		setErrors(prevState => {
			return { ...prevState, cvv: false };
		});
	};

	const handleExpirationDateBlur = e => {
		if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(e.target.value)) {
			return setErrors(prevState => {
				return { ...prevState, expirationDate: true };
			});
		}

		setErrors(prevState => {
			return { ...prevState, expirationDate: false };
		});
	};

	const handleSubmit = async e => {
		e.preventDefault();

		console.log(
			"Payment data: ",
			e.target.elements.cardName.value,
			e.target.elements.cardNumber.value,
			e.target.elements.expirationDate.value,
			e.target.elements.cvv.value
		);

		try {
			const res = await http.post("/order/payment", {
				paymentInfo: {
					cardName: e.target.elements.cardName.value,
					cardNumber: e.target.elements.cardNumber.value,
					expirationDate: e.target.elements.expirationDate.value,
					cvv: e.target.elements.cvv.value,
				},
				orderInfo: {
					products: JSON.parse(localStorage.getItem(storage.CART)),
				},
			});
			console.log("Order ID:", res.data);

			localStorage.removeItem(storage.CART);
			localStorage.setItem(storage.ORDER, res.data.orderID);

			history.push(routes.CONFIRMATION);
		} catch (error) {
			console.log("Payment error: ", error);
		}
	};

	let cart = JSON.parse(localStorage.getItem(storage.CART));
	console.log("Cart payment: ", cart);
	if (!cart || cart.length < 1) {
		return <Redirect push to={routes.PRODUCTS[0]} />;
	}

	if (!props.isLoggedIn) {
		localStorage.setItem(storage.REDIRECT, routes.PAYMENT);
		return <Redirect push to={routes.LOGIN} />;
	}

	return (
		<Container component="main" maxWidth="xs">
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<PaymentOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Plaćanje{" "}
				</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<TextField
						autoComplete="cc-name"
						id="cardName"
						label="Ime vlasnika kartice"
						margin="normal"
						name="cardName"
						variant="outlined"
						fullWidth
						required
					/>
					<TextField
						autoComplete="cc-number"
						error={errors.cardNumber}
						helperText="Format: 16 brojeva"
						id="cardNumber"
						label="Broj kartice"
						margin="normal"
						name="cardNumber"
						onBlur={handleCardNumberBlur}
						variant="outlined"
						fullWidth
						required
					/>
					<TextField
						autoComplete="cc-exp"
						error={errors.expirationDate}
						helperText="Format: MM/GG"
						id="expirationDate"
						label="Datum isteka kartice"
						margin="normal"
						name="expirationDate"
						onBlur={handleExpirationDateBlur}
						variant="outlined"
						fullWidth
						required
					/>
					<TextField
						autoComplete="cc-csc"
						error={errors.cvv}
						id="cvv"
						helperText="Format: 3 broja"
						label="CVV"
						margin="normal"
						name="cvv"
						onBlur={handleCvvBlur}
						variant="outlined"
						fullWidth
						required
					/>
					<Button
						className={classes.submit}
						color="primary"
						disabled={Object.values(errors).some(err => err)}
						type="submit"
						variant="contained"
						fullWidth
					>
						PLAĆANJE
					</Button>
				</form>
			</div>
		</Container>
	);
}
