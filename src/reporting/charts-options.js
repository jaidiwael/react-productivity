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

export const doughnutOptions = {
  // responsive: true,
  cutout: "80%",
  plugins: {
    customCanvasBackgroundColor: {
      color: "green",
    },
  },
};
