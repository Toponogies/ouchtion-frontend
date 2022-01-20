// Group digits in price by the thousand
// https://stackoverflow.com/a/3753507
export const formatPrice = (price) => (1000 * price).toLocaleString("en");
