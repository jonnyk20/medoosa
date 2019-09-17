import html2canvas from "html2canvas";

const makeCanvas = async (target, options = {}) => {
  console.log("START");
  const { clientHeight, clientWidth } = target;
  const canvas = await html2canvas(target, {
    backgroundColor: "transparent",
    height: clientHeight,
    width: clientWidth,
    scale: 1,
    ...options
  });
  return canvas;
};

export default makeCanvas;
