export const fixNumber = (num) =>
  (Math.round((num + Number.EPSILON) * 100) / 100).toLocaleString(undefined, {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  });

export const chainsLogo = {
  Injective: "/chains/injective.png",
  Axelar: "/chains/axelar.jpg",
  Comdex: "/chains/comdex.jpg",
  Juno: "/chains/juno.png",
  Stride: "/chains/stride.png",
  Cosmos: "/chains/cosmos.png",
  Osmosis: "/chains/osmosis.png",
  Secret: "/chains/secret.png",
  Agoric: "/chains/agoric.png",
};
