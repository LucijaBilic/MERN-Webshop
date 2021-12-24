import { Link } from "react-router-dom";
import {
	makeStyles,
	AppBar,
	Button,
	Container,
	Toolbar,
	Typography,
} from "@material-ui/core";

import * as routes from "../../constants/routes";

const useStyles = makeStyles(() => ({
	button: {
		marginRight: "0.7rem",
	},
	title: {
		textDecoration: "none",
	},
	toolbar: {
		display: "flex",
		flexGrow: 1,
		justifyContent: "space-between",
	},
}));

export default function Navbar({ user, logout }) {
	const classes = useStyles();

	return (
		<>
			<AppBar
				className="navbar"
				color="secondary"
				elevation={0}
				position="relative"
			>
				<Container>
					<Toolbar className={classes.toolbar}>
						<Typography
							className={classes.title}
							color="inherit"
							component={Link}
							to={routes.PRODUCTS[0]}
							variant="h6"
						>
							Webshop
						</Typography>
						<div>
							<Button
								className={classes.button}
								color="inherit"
								component={Link}
								to={routes.CART}
								variant="outlined"
							>
								KOŠARICA
							</Button>
							{user ? (
								<Button
									color="inherit"
									component={Link}
									to={routes.PRODUCTS[0]}
									onClick={logout}
									variant="outlined"
								>
									ODJAVA
								</Button>
							) : (
								<Button
									color="inherit"
									component={Link}
									to={routes.LOGIN}
									variant="outlined"
								>
									PRIJAVA
								</Button>
							)}
						</div>
					</Toolbar>
				</Container>
			</AppBar>
		</>
	);
}
