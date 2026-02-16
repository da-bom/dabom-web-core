const formatSize = (bytes: number) => {
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

export default formatSize;
