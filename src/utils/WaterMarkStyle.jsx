export const waterMarkStyle = (text) => {
  console.log("waterMarkStyle", text);
  return `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><text x='50%' y='50%' font-size='30' fill='gray' opacity='0.2' text-anchor='middle' dominant-baseline='middle' transform='rotate(-45, 200, 200)'>${text}</text></svg>")`;
};