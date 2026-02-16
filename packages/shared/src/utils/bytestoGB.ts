export const bytesToGB = (bytes: number) =>
  Number((bytes / (1024 * 1024 * 1024)).toFixed(1));

export const gbToBytes = (gb: number) => {
  return gb * 1024 * 1024 * 1024;
};
