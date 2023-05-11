export const fixNumber = (num) =>
  (Math.round((num + Number.EPSILON) * 100) / 100).toLocaleString(undefined, {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  });
