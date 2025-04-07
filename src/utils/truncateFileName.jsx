export const truncateFileName = (filename, max = 50) => {
  const parts = filename.split(".");
  const ext = parts.length > 1 ? "." + parts.pop() : "";
  const namewithoutExt = parts.join(".");

  return namewithoutExt.length > max
    ? namewithoutExt.slice(0, max) + "..." + ext
    : filename;
};