// Function to shorten Ethereum address for better visibility !

export const shortenAddress = (address) =>
  `${address.slice(0, 10)}...${address.slice(address.length - 4)}`;
