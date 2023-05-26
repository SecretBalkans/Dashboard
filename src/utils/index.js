export const fixNumber = (num, {
  minimumFractionDigits= 4,
  maximumFractionDigits= 4,
} = {}) =>
  (Math.round((num + Number.EPSILON) * 100) / 100).toLocaleString(undefined, {
    minimumFractionDigits,
    maximumFractionDigits,
  });

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
