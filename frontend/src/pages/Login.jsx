import { useState } from "react";
import { Redirect, Link as RouterLink, useHistory } from "react-router-dom";
import {
	makeStyles,
	Avatar,
	Button,
	Container,
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
		marginTop: theme.spacing(1),
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

export default function Login(props) {
	const classes = useStyles();
	const history = useHistory();

	const [errorMessage, setErrorMessage] = useState("");

	const handleSubmit = async e => {
		e.preventDefault();

		console.log(
			"Login data: ",
			e.target.elements.email.value,
			e.target.elements.password.value
		);

		try {
			const res = await http.post("/auth/login", {
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
			console.log("Login error: ", error);

			if (error.response.status === 400) {
				setErrorMessage(error.response.data.message);
			}
		}
	};

	if (props.isLoggedIn) {
		return <Redirect push to={routes.PRODUCTS[0]} />;
	}

	return (
		<Container component="main" maxWidth="xs">
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Prijava{" "}
				</Typography>
				<Typography color="error" variant="subtitle1">
					{errorMessage}
				</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<TextField
						autoComplete="email"
						id="email"
						label="Email"
						margin="normal"
						name="email"
						type="email"
						variant="outlined"
						fullWidth
						required
					/>
					<TextField
						autoComplete="current-password"
						id="password"
						label="Lozinka"
						margin="normal"
						name="password"
						type="password"
						variant="outlined"
						fullWidth
						required
					/>

					<Button
						className={classes.submit}
						color="primary"
						type="submit"
						variant="contained"
						fullWidth
					>
						PRIJAVA
					</Button>
					<Link component={RouterLink} to={routes.REGISTER}>
						Nemate račun? Registrirajte se
					</Link>
				</form>
			</div>
		</Container>
	);
}

