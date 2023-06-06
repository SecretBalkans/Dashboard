export const fixNumber = (num, {
  minimumFractionNonZeroDigits = 4,
  maximumFractionNonZeroDigits= 4,
} = {}) => {
  let number = Math.round((num + Number.EPSILON) * 10 ** 18) / 10 ** 18;
  const fractionPart = ('' + number).split('.')[1];
  if (fractionPart?.length) {
    let leadingZeros = fractionPart.match('^0*')[0].length;
    minimumFractionNonZeroDigits += leadingZeros;
    maximumFractionNonZeroDigits += leadingZeros;
  }
  return number.toLocaleString(undefined, {
      minimumFractionDigits: minimumFractionNonZeroDigits,
      maximumFractionDigits: maximumFractionNonZeroDigits,
    });
};

export const chainsLogo = {
  Injective: "/chains/injective.png",
  Axelar: "/chains/axelar.jpg",
  Quicksilver: "/chains/qck.png",
  Persistence: "/chains/xprt.png",
  Comdex: "/chains/comdex.jpg",
  Juno: "/chains/juno.png",
  Stride: "/chains/stride.png",
  Cosmos: "/chains/cosmos.png",
  Osmosis: "/chains/osmosis.png",
  Secret: "/chains/secret.png",
  Agoric: "/chains/agoric.png",
};
