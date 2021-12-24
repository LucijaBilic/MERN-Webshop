import { useState } from "react";
import { Redirect, Link as RouterLink, useHistory } from "react-router-dom";
import {
	makeStyles,
	Avatar,
	Button,
	Container,
	CssBaseline,
	Grid,
	Link,
	TextField,
	Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import * as routes from "../constants/routes";
import * as storage from "../constants/storage";
import http from "../utils/http";

const useStyles = makeStyles(theme => ({
	avatar: {
		backgroundColor: theme.palette.secondary.main,
		margin: theme.spacing(1),
	},
	form: {
		marginTop: theme.spacing(3),
		width: "100%",
	},
	paper: {
		alignItems: "center",
		display: "flex",
		flexDirection: "column",
		marginTop: theme.spacing(8),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function Register (props) {
	const classes = useStyles();
	const history = useHistory();

	const errorMessagesInitState = {
		name: "",
		email: "",
		password: "",
	};
	const [errorMessages, setErrorMessages] = useState(errorMessagesInitState);

	const handleSubmit = async e => {
		e.preventDefault();

		console.log(
			"Register data: ",
			e.target.elements.name.value,
			e.target.elements.email.value,
			e.target.elements.password.value
		);

		try {
			const res = await http.post("/auth/register", {
				name: e.target.elements.name.value,
				email: e.target.elements.email.value,
				password: e.target.elements.password.value,
			});
			console.log("User token: ", res.data);

			localStorage.setItem(storage.TOKEN, res.data.token);
			http.defaults.headers.authorization = "Bearer " + res.data.token;
			await props.getUser();

			const redirect = localStorage.getItem(storage.REDIRECT);
			if (redirect) {
				localStorage.removeItem(storage.REDIRECT);
				return history.push(redirect);
			}

			history.push(routes.PRODUCTS[0]);
		} catch (error) {
			console.log("Register error: ", error);

			if (error.response.status === 400) {
				const registerErrorMessages = { ...errorMessagesInitState };

				error.response.data.forEach(err => {
					registerErrorMessages[err.type] = err.message;
				});

				setErrorMessages(registerErrorMessages);
			}
		}
	};

	if (props.isLoggedIn) {
		return <Redirect push to={routes.PRODUCTS[0]} />;
	}

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Registracija
				</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								autoComplete="name"
								error={errorMessages.name.length > 0}
								helperText={errorMessages.name}
								id="name"
								label="Ime"
								name="name"
								variant="outlined"
								fullWidth
								required
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								autoComplete="email"
								error={errorMessages.email.length > 0}
								helperText={errorMessages.email}
								id="email"
								label="Email"
								name="email"
								type="email"
								variant="outlined"
								fullWidth
								required
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								error={errorMessages.password.length > 0}
								helperText={errorMessages.password}
								id="password"
								label="Lozinka"
								name="password"
								type="password"
								variant="outlined"
								fullWidth
								required
							/>
						</Grid>
					</Grid>
					<Button
						className={classes.submit}
						color="primary"
						type="submit"
						variant="contained"
						fullWidth
					>
						REGISTRACIJA
					</Button>
					<Link component={RouterLink} to={routes.LOGIN}>
						Već imate račun? Prijavite se
					</Link>
				</form>
			</div>
		</Container>
	);
};