import { useEffect, useState } from "react";
import {
	makeStyles,
	Box,
	Checkbox,
	Container,
	FormControlLabel,
	FormControl,
	FormGroup,
	FormLabel,
	Grid,
	Typography,
} from "@material-ui/core";

import ProductCard from "../components/ProductCard/ProductCard";
import http from "../utils/http";

const useStyles = makeStyles(theme => ({
	cardGrid: {
		paddingBottom: theme.spacing(8),
		paddingTop: theme.spacing(3),
	},
	flexContainer: {
		display: "flex",
		flexDirection: "column",
		[theme.breakpoints.up("sm")]: {
			flexDirection: "row",
		},
	},
	formGroup: {
		display: "flex",
		flexDirection: "column",
	},
	formLabel: {
		marginTop: "3vh",
	},
}));

const Products = () => {
	const classes = useStyles();

	const [filters, setFilters] = useState([]);
	const [products, setProducts] = useState([]);
	const [savedProducts, setSavedProducts] = useState([]);

	const retrieveProducts = async () => {
		try {
			const res = await http.get(`/products`);
			console.log("Products: ", res.data);

			setProducts(res.data.products);
			setSavedProducts(res.data.products);
		} catch (error) {
			console.log("Error retrieving products: ", error);
		}
	};

	const handleFilters = value => {
		let products = savedProducts;
		console.log("Checked filter: ", value);

		const index = filters.findIndex(filter => filter === value);
		if (index < 0) {
			filters.push(value);
			setFilters(filters);
		} else {
			filters.splice(index, 1);
		}

		if (filters.length <= 0) {
			return setProducts(savedProducts);
		}
		setProducts(
			products.filter(product => filters.includes(product.company))
		);

		console.log("Filters: ", filters);
	};

	useEffect(() => {
		retrieveProducts();
	}, []);

	return (
		<div>
			<Container className={classes.flexContainer} maxWidth="lg">
				<Box m={3}>
					<div className={classes.root}>
						<Typography component="h6" variant="h6">
							FILTRIRANJE
						</Typography>
						<FormControl
							className={classes.formControl}
							component="fieldset"
						>
							<FormLabel
								className={classes.formLabel}
								component="legend"
							>
								PROIZVOĐAČ
							</FormLabel>
							<FormGroup className={classes.formGroup}>
								<FormControlLabel
									control={
										<Checkbox
											inputProps={{
												"aria-label":
													"secondary checkbox",
											}}
											onChange={e =>
												handleFilters(e.target.value)
											}
											value="Apple"
										/>
									}
									label="Apple"
								/>
								<FormControlLabel
									control={
										<Checkbox
											inputProps={{
												"aria-label":
													"secondary checkbox",
											}}
											onChange={e =>
												handleFilters(e.target.value)
											}
											value="Huawei"
										/>
									}
									label="Huawei"
								/>
								<FormControlLabel
									control={
										<Checkbox
											inputProps={{
												"aria-label":
													"secondary checkbox",
											}}
											onChange={e =>
												handleFilters(e.target.value)
											}
											value="Samsung"
										/>
									}
									label="Samsung"
								/>
								<FormControlLabel
									control={
										<Checkbox
											inputProps={{
												"aria-label":
													"secondary checkbox",
											}}
											onChange={e =>
												handleFilters(e.target.value)
											}
											value="Xiaomi"
										/>
									}
									label="Xiaomi"
								/>
							</FormGroup>
						</FormControl>
					</div>
				</Box>
				<Container className={classes.cardGrid} maxWidth="md">
					<Grid container spacing={4}>
						{products.map(product => (
							<Grid key={product.name} item xs={12} sm={6} md={4}>
								<ProductCard {...product} />
							</Grid>
						))}
					</Grid>
				</Container>
			</Container>
		</div>
	);
};

export default Products;
