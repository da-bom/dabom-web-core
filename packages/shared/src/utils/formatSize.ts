const BYTES_PER_GB = 1024 * 1024 * 1024;

export const formatSize = (bytes: number) => {
  if (bytes === 0) {
    return {
      value: 0,
      unit: "GB",
      total: "0 GB",
    };
  }

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  const total = Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2));

  return {
    value: total,
    unit: sizes[i],
    total: total + " " + sizes[i],
  };
};

export const formatToBytes = (value: number, unit: string): number => {
  const unitMultipliers: Record<string, number> = {
    Bytes: 1,
    KB: 1024,
    MB: 1024 ** 2,
    GB: 1024 ** 3,
    TB: 1024 ** 4,
  };

  const multiplier = unitMultipliers[unit] || 1;
  return Math.floor(value * multiplier);
};

export const bytesToGB = (bytes: number) =>
  Number((bytes / BYTES_PER_GB).toFixed(1));

export const gbToBytes = (gb: number) => {
  return gb * BYTES_PER_GB;
};
