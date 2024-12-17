export const formatCurrency = (amount) => {
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2, // Ensures that two decimal places are shown
    maximumFractionDigits: 2, // Limits the decimal places to two
  });

  return formatter.format(amount); // Formats the amount as per INR and ITL system
};
