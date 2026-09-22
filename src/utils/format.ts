const numberFormatter = new Intl.NumberFormat("en-IN");
const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export const formatNumber = (value: number): string => numberFormatter.format(value);
export const formatCurrency = (value: number): string => currencyFormatter.format(value);
