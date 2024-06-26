import React from "react";
import { Tooltip } from "primereact/tooltip";

import { renderMinutes } from "../helpers";

const MeterGroup = ({
  data,
  orientation = "horizontal",
  legend = true,
  labelTemplate = null,
  legendTemplate = null,
  onItemClick,
  activeItem,
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

  const labelStyleHorizontal = (ort) => {
    let style = {};
    if (ort === "top") {
      style = {
        bottom: "60px",
      };
    } else {
    }
    return {
      left: "50%",
      bottom: "-10px",
      transform: "translateX(-50%) translateY(100%)",
      position: "absolute",
      width: "max-content",
      fontSize: "12px",
      fontWeight: "500",
      ...style,
    };
  };

  const labelStyleVertical = () => {
    return {
      top: "50%",
      right: "-10px",
      transform: "translateY(-50%) translateX(100%)",
      position: "absolute",
      fontSize: "14px",
      fontWeight: "500",
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
        <span>{`${item.label}`}</span>
      </div>
    );
  };
  return (
    <div
      className={`flex flex-column align-items-center gap-2 ${
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
          const ort = index % 2 === 0 ? "top" : "bottom";
          return (
            <>
              <Tooltip
                target={`.tooltip${index}`}
                // content={`${renderMinutes(item.value)} mn`}
                position={
                  orientation === "horizontal"
                    ? ort === "top"
                      ? "bottom"
                      : "top"
                    : "left"
                }
                pt={{
                  text: {
                    className: "p-2",
                  },
                }}
              >
                <div className="text-xs max-w-6rem ">
                  <div>{renderMinutes(item.value)} mn</div>
                  <div className="flex align-items-center gap-1 text-xs">
                    <div
                      style={{
                        background: item.color,
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "0.6rem",
                      }}
                    >{`${item.label}`}</span>
                  </div>
                </div>
              </Tooltip>

              <div
                onClick={() => {
                  if (onItemClick) {
                    onItemClick(item);
                  }
                }}
                key={index}
                className={`relative tooltip${index} cursor-pointer ${
                  activeItem?.label === item?.label
                    ? "custom-selected-shadow"
                    : ""
                }`}
                style={
                  orientation === "horizontal"
                    ? itemStyleHorizontal(item, index)
                    : itemStyleVertical(item, index)
                }
              >
                <span
                  style={
                    orientation === "horizontal"
                      ? labelStyleHorizontal(ort)
                      : labelStyleVertical(ort)
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
            </>
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
