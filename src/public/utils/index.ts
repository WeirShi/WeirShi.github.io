export const handleMobile = (mobile: string): string => {
  const reg = /^(\d{3})\d{4}(\d{4})$/;
  return mobile.replace(reg, "$1****$2");
};
