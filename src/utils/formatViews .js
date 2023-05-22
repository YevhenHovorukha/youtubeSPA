export const formatViews = (number) => {
  if (number < 1000) {
    return number;
  } else if (number < 1000000) {
    return (number / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  } else if (number < 1000000000) {
    return (number / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  } else {
    return (number / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
  }
};
