import { useEffect, useState } from "react";
import {
	Redirect,
	BrowserRouter as Router,
	Route,
	Switch,
} from "react-router-dom";
import { createTheme, CssBaseline, ThemeProvider } from "@material-ui/core";

import Navbar from "./components/Navbar/Navbar";

import Cart from "./pages/Cart";
import Confirmation from "./pages/Confirmation";
import Login from "./pages/Login";
import Payment from "./pages/Payment";
import Product from "./pages/Product";
import Products from "./pages/Products";
import Register from "./pages/Register";

import * as routes from "./constants/routes";
import * as storage from "./constants/storage";
import http from "./utils/http";

const theme = createTheme({
	fontSize: "1.6rem",
	overrides: {
		MuiCssBaseline: {
			"@global": {
				html: {
					WebkitFontSmoothing: "auto",
				},
			},
		},
	},
	palette: {
		primary: {
			contrastText: "#000",
			dark: "#707070",
			light: "#cfcfcf",
			main: "#9e9e9e",
		},
		secondary: {
			contrastText: "#fff",
			dark: "#000000",
			light: "#484848",
			main: "#212121",
		},
	},
});

export default function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState(null);

	const getUser = () => {
		return http
			.get("/users/me")
			.then(res => {
				setUser(res.data.user);
				setIsLoggedIn(true);
			})
			.catch(error => console.log("Error get user: ", error));
	};

	const logout = () => {
		setIsLoggedIn(false);
		setUser(null);

		localStorage.removeItem(storage.TOKEN);
	};

	useEffect(() => {
		if (!localStorage.getItem(storage.TOKEN)) {
			return;
		}

		getUser();
	}, []);

	return (
		<Router>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Navbar logout={logout} user={user} />
				<Switch>
					<Route exact path={routes.PRODUCTS} component={Products} />
					<Route
						exact
						path={routes.PRODUCT(":id")}
						component={Product}
					/>
					<Route exact path={routes.LOGIN}>
						<Login getUser={getUser} isLoggedIn={isLoggedIn} />
					</Route>
					<Route exact path={routes.REGISTER}>
						<Register getUser={getUser} isLoggedIn={isLoggedIn} />
					</Route>
					<Route exact path={routes.CART} component={Cart} />
					<Route exact path={routes.PAYMENT}>
						<Payment isLoggedIn={isLoggedIn} />
					</Route>
					<Route exact path={routes.CONFIRMATION}>
						<Confirmation isLoggedIn={isLoggedIn} />
					</Route>
					<Route path={routes.INVALID_ROUTE}>
						<Redirect push to={routes.PRODUCTS[0]} />
					</Route>
				</Switch>
			</ThemeProvider>
		</Router>
	);
}