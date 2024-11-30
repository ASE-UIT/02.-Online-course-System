// 120000 -> 120.000
export function formatCurrency(amount) {
  const numberPrice = Number(amount);
  return numberPrice.toLocaleString("en-US");
}

// return percent discount
export function calculateDiscountPercentage(originalPrice, discountedPrice) {
  if (originalPrice <= 0 || discountedPrice < 0) {
    throw new Error("Invalid price values");
  }
  const discount = originalPrice - discountedPrice;
  const discountPercentage = (discount / originalPrice) * 100;
  if (discountPercentage < 0) return 0;
  return discountPercentage.toFixed(0);
}

//20.5 -> 20 giờ 30 phút
export function convertToHoursAndMinutes(decimalNumber) {
  const hours = Math.floor(decimalNumber); // Extract the integer part as hours
  const minutes = Math.round((decimalNumber - hours) * 60); // Convert the decimal part to minutes
  return `${hours} giờ ${minutes} phút`;
}
