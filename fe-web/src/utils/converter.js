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
// 20.5 -> hh:mm:ss || mm:ss
export function convertMinutesToTime(input) {
  // Parse the input as a float number
  const totalMinutes = parseFloat(input);

  // Handle invalid input
  if (isNaN(totalMinutes) || totalMinutes < 0) {
    return "0";
  }

  // Calculate total seconds
  const totalSeconds = Math.round(totalMinutes * 60);

  // Calculate hours, minutes, and seconds
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // Format the result as hh:mm:ss or mm:ss
  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  } else {
    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  }
}
