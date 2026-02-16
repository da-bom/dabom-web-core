const bytesToGB = (bytes: number) =>
  Number((bytes / (1024 * 1024 * 1024)).toFixed(1));
export default bytesToGB;
