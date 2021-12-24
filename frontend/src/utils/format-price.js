export const formatPrice = number => {
	return new Intl.NumberFormat("hr", {
		style: "currency",
		currency: "HRK",
	}).format(number / 100);
};
