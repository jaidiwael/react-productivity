export const plugin = {
  id: "customCanvasBackgroundColor",
  beforeDraw: (chart, args, options) => {
    const {
      chartArea: { left, top, right, bottom },
      ctx,
    } = chart;
    const centerX = (left + right) / 2;
    const centerY = (top + bottom) / 2;
    const r = Math.min(right - left, bottom - top) / 2;

    ctx.beginPath();
    ctx.lineWidth = 27;
    ctx.strokeStyle = "white";
    ctx.arc(centerX, centerY, r - 13 || 0, 0, 2 * Math.PI);
    ctx.stroke();
  },
};

export const pluginImageCenter = (img) => {
  const image = new Image();
  image.src = img;
  const imageSize = 60;
  return {
    id: "customCanvasBackgroundImage",
    beforeDraw: (chart) => {
      if (image.complete) {
        const ctx = chart.ctx;
        const { top, left, width, height } = chart.chartArea;
        const x = left + width / 2 - imageSize / 2;
        const y = top + height / 2 - imageSize / 2;
        ctx.drawImage(image, x, y, imageSize, imageSize);
      } else {
        image.onload = () => chart.draw();
      }
    },
  };
};

export const doughnutOptions = {
  // responsive: true,
  cutout: "80%",
  plugins: {
    customCanvasBackgroundColor: {
      color: "green",
    },
  },
};
