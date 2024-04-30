export const customCanvasBackgroundColor = {
  id: "customCanvasBackgroundColor",
  beforeDraw: (chart, args, options) => {
    const lineWidth =
      chart.getDatasetMeta(0)?.data[1]?.outerRadius -
      chart.getDatasetMeta(0)?.data[1]?.innerRadius;
    const {
      chartArea: { left, top, right, bottom },
      ctx,
    } = chart;
    const centerX = (left + right) / 2;
    const centerY = (top + bottom) / 2;
    const r = Math.min(right - left - lineWidth, bottom - top - lineWidth) / 2;

    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = "#555C86";
    ctx.arc(centerX, centerY, r, 0, 2 * Math.PI);
    ctx.stroke();
  },
};

export const pluginImageCenter = (img) => {
  const image = new Image();
  image.src = img;

  return {
    id: "customCanvasBackgroundImage",
    beforeDraw: (chart) => {
      if (image.complete) {
        const ctx = chart?.ctx;
        const { top, left, width, height } = chart.chartArea;
        const imageSize = width / 4;
        const x = left + width / 2 - imageSize / 2;
        const y = top + height / 2 - imageSize / 2;
        ctx.drawImage(image, x, y, imageSize, imageSize);
      } else {
        image.onload = () => chart.draw();
      }
    },
  };
};

export const pluginImageTopCenter = (img) => {
  const image = new Image();
  image.src = img;

  return {
    id: "customCanvasBackgroundImage",
    beforeDraw: (chart) => {
      console.log("CHART", chart.getDatasetMeta(0)._parsed);
      if (image.complete) {
        const ctx = chart.ctx;
        const { top, left, width, height } = chart.chartArea;
        const imageSize = width / 4;
        const x = left + width / 2 - imageSize / 2;
        const y = top + height / 4 - imageSize / 4;
        ctx.drawImage(image, x, y, imageSize, imageSize);
        const value = chart.getDatasetMeta(0)._parsed[0];
        ctx.font = imageSize / 2 + "px Arial Bold";
        if (value >= 100) {
          ctx.fillStyle = "#50F58F";
        } else {
          ctx.fillStyle = "#ffffff";
        }

        ctx.textAlign = "left";
        ctx.fillText(value + "%", x, y * 3);
      } else {
        image.onload = () => chart.draw();
      }
    },
  };
};

export const elementArcGradient = {
  elements: {
    arc: {
      backgroundColor: function (context) {
        const chartArea = context.chart.chartArea;
        if (!chartArea) {
          return;
        }
        const ctx = context.chart.ctx;
        let gradient = ctx.createLinearGradient(0, 0, 0, 280);
        gradient.addColorStop(0, "#52FD7F");
        gradient.addColorStop(0.4, "#48DBC8");
        gradient.addColorStop(1, "#48DBC8");
        return gradient;
      },
    },
  },
};

export const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: true,
  cutout: "80%",
  plugins: {
    tooltip: false,
  },
};
