import React from "react";

import { renderMinutes } from "../helpers";

const MeterGroup = ({
  data,
  orientation = "horizontal",
  legend = true,
  labelTemplate = null,
  legendTemplate = null,
}) => {
  const total = data?.reduce((acc, val) => acc + +val.value, 0);

  const calculatePercentage = (value) => {
    return Math.floor((value / total) * 100);
  };

  const itemStyleHorizontal = (item, index) => {
    return {
      width: calculatePercentage(item.value) + "%",
      backgroundColor: item.color,
      height: "100%",
      borderRadius:
        index === 0
          ? "15px 0 0 15px"
          : index === data?.length - 1
          ? "0 15px 15px 0"
          : "0 0 0 0",
    };
  };
  const itemStyleVertical = (item, index) => {
    return {
      height: calculatePercentage(item.value) + "%",
      backgroundColor: item.color,
      width: "100%",
      borderRadius:
        index === 0
          ? "15px 15px 0 0"
          : index === data?.length - 1
          ? "0 0 15px 15px"
          : "0 0 0 0",
    };
  };

  const labelStyleHorizontal = () => {
    return {
      left: "50%",
      bottom: "-10px",
      transform: "translateX(-50%) translateY(100%)",
      position: "absolute",
      width: "max-content",
    };
  };

  const labelStyleVertical = () => {
    return {
      top: "50%",
      right: "-45px",
      transform: "translateY(-50%)",
      position: "absolute",
    };
  };

  const legendItem = (item) => {
    return (
      <div className="flex align-items-center gap-2 text-xs">
        <div
          style={{
            background: item.color,
            width: "10px",
            height: "10px",
            borderRadius: "5px",
          }}
        />
        <span>{`${renderMinutes(item.value)}mn ${item.label}`}</span>
      </div>
    );
  };
  return (
    <div
      className={`flex flex-column align-items-center gap-3 ${
        orientation === "horizontal" ? "w-full" : "h-full"
      }`}
    >
      <div
        className={`flex ${
          orientation === "horizontal"
            ? "h-2rem w-full"
            : "w-2rem flex-column flex-grow-1"
        }`}
      >
        {data.map((item, index) => {
          return (
            <div
              key={index}
              className="relative"
              style={
                orientation === "horizontal"
                  ? itemStyleHorizontal(item, index)
                  : itemStyleVertical(item, index)
              }
            >
              <span
                style={
                  orientation === "horizontal"
                    ? labelStyleHorizontal()
                    : labelStyleVertical()
                }
              >
                {!!labelTemplate
                  ? labelTemplate({
                      ...item,
                      percentage:
                        item?.percentage || calculatePercentage(item.value),
                    })
                  : (item?.percentage
                      ? item?.percentage
                      : calculatePercentage(item.value)) + "%"}
              </span>
            </div>
          );
        })}
      </div>

      {legend && (
        <div>
          {data.map((item, index) => {
            return (
              <React.Fragment key={index}>
                {!!legendTemplate
                  ? legendTemplate(item, calculatePercentage(item.value))
                  : legendItem(item)}
              </React.Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MeterGroup;
MeterGroup.defaultProps = {
  data: [
    {
      label: "mn pick",
      value: "20",
      color: "blue",
    },
    {
      label: "mn Pack",
      value: "10",
      color: "blue",
    },
    {
      label: "mn Support",
      value: "8",
      color: "blue",
    },
    {
      label: "mn Temps manquant",
      value: "8",
      color: "blue",
    },
  ],
};
