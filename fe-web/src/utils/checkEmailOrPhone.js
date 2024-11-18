export const isEmail = (emailOrPhone) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (emailPattern.test(emailOrPhone)) {
    return true;
  }
  return false;
};
