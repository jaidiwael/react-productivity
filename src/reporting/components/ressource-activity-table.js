import { useState, useMemo } from "react";
import { InputText } from "primereact/inputtext";
import Logo from "../../assets/images/alki-logo.svg";

import { customOrder } from "../helpers";

const RessourceActivityTable = ({
  firstColumn,
  products,
  selectedRow,
  onRowSelection,
  blueTheme,
  selectedColor,
  height,
  withSearch,
}) => {
  const [order, setOrder] = useState({ column: 0, direction: "asc" });
  const [visibleSearch, setVisibleSearch] = useState(false);
  const [search, setSearch] = useState("");

  const renderProductByOrder = useMemo(() => {
    let newProducts = products;
    if (search) {
      const expr = new RegExp(search, "i");
      newProducts = newProducts?.filter((op) =>
        expr.test(op[firstColumn?.field])
      );
    }
    switch (order.column) {
      case 0:
      default:
        return newProducts.sort(
          customOrder(firstColumn?.field, order.direction)
        );
      case 1:
        return newProducts.sort(customOrder("productivity", order.direction));
      case 2:
        return newProducts.sort(customOrder("volumes", order.direction));
      case 3:
        return newProducts.sort(customOrder("objective", order.direction));
    }
  }, [order, products, firstColumn, search]);

  const itemTemplate = (item) => {
    return (
      <div
        className={`grid cursor-pointer m-auto align-items-center text-xs tableRow ${
          item?.id === selectedRow ? "selectedTableRow border-round-left" : ""
        } ${
          blueTheme
            ? "text-white border-white-alpha-10"
            : "border-black-alpha-10 text-color"
        } ${selectedColor ? firstColumn?.field : item[firstColumn?.field]}`}
        onClick={() => onRowSelection(item?.id)}
        style={{
          "--color": selectedColor || item.color,
        }}
      >
        <div className="col-6 flex">
          <div
            className="border-round-xl text-white px-3 py-1"
            style={{
              backgroundColor: item?.id === selectedRow ? "unset" : item?.color,
            }}
          >
            {item[firstColumn?.field]}
          </div>
        </div>
        <div className="col-3 flex align-items-center  gap-3">
          <span>{item.productivity}</span>
        </div>
        <div className={`col-3 md:col-2 lg:col-2`}>
          <span className="font-bold">{item?.volumes}</span>
        </div>
        {/* <div className={`col-3 z-1 text-teal-400`}>
          <span className="mr-1">{item?.objective}</span>
        </div> */}
      </div>
    );
  };

  const updateOrder = (columnId) => {
    setOrder((od) => {
      if (od.column === columnId) {
        return {
          column: columnId,
          direction: od.direction === "asc" ? "desc" : "asc",
        };
      } else {
        return {
          column: columnId,
          direction: "asc",
        };
      }
    });
  };

  return (
    <div
      className={`border-round-2xl shadow-2 flex flex-column h-full pb-2 ${
        blueTheme ? "bg-blue-800" : "bg-white"
      }`}
    >
      <div
        className={`header grid border-round-top-2xl border-bottom-1 border-opacity-white mx-3 mb-3 mt-0 text-xs ${
          blueTheme ? "text-light-blue" : "text-color surface-50"
        }`}
        style={{
          marginTop: "0px !important",
        }}
      >
        <div
          onClick={() => updateOrder(0)}
          className={`cursor-pointer col-6 flex align-items-center ${
            order.column === 0 ? "text-white" : ""
          }`}
        >
          {firstColumn.header}
          <span
            className={`text-xs pi ${
              order.column === 0 && order.direction === "asc"
                ? "pi-chevron-down"
                : "pi-chevron-up"
            } ml-1`}
          ></span>
          {withSearch && (
            <i
              className="pi pi-search text-xs ml-auto cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setVisibleSearch(!visibleSearch);
              }}
            />
          )}
        </div>
        <div
          onClick={() => updateOrder(1)}
          className={`cursor-pointer col-3 flex align-items-center  ${
            order.column === 1 ? "text-white" : ""
          }`}
        >
          Réel
          <span
            className={`text-xs pi ${
              order.column === 1 && order.direction === "asc"
                ? "pi-chevron-down"
                : "pi-chevron-up"
            } ml-1`}
          ></span>
        </div>
        <div
          onClick={() => updateOrder(2)}
          className={`cursor-pointer col-3 flex align-items-center  ${
            order.column === 2 ? "text-white" : ""
          }`}
        >
          Planifié
          <span
            className={`text-xs pi ${
              order.column === 2 && order.direction === "asc"
                ? "pi-chevron-down"
                : "pi-chevron-up"
            } ml-1`}
          ></span>
        </div>
        {/* <div
          onClick={() => updateOrder(3)}
          className={`cursor-pointer col-3 flex align-items-center justify-content-center ${
            order.column === 3 ? "text-white" : ""
          }`}
        >
          <img src={Logo} width="10px" />
          <span
            className={`text-xs pi ${
              order.column === 3 && order.direction === "asc"
                ? "pi-chevron-down"
                : "pi-chevron-up"
            } ml-1`}
          ></span>
        </div> */}
      </div>
      {/* <Carousel
        value={renderProductByOrder}
        numVisible={2}
        numScroll={1}
        orientation="vertical"
        verticalViewPortHeight={height || "150px"}
        itemTemplate={itemTemplate}
        showIndicators={false}
        pt={{
          previousbutton: {
            className: `${blueTheme ? "text-white" : ""}  w-1rem h-1rem`,
          },
          nextbutton: {
            className: `${blueTheme ? "text-white" : ""} w-1rem h-1rem`,
          },
          itemscontainer: {
            className: "align-items-start",
          },
          item: {
            style: {
              flex: "none",
              minWidth: "100%",
            },
          },
        }}
      /> */}
      {visibleSearch && (
        <div>
          <span className="p-input-icon-left w-10rem mx-2">
            <i className="pi pi-search text-xs" />
            <InputText
              placeholder="Rechercher..."
              className="w-full border-round-3xl bg-white-alpha-10 border-none py-1 pr-3 pl-5 text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              pt={{
                root: {
                  className: "text-white",
                },
              }}
            />
            {search && (
              <i
                className="pi pi-times-circle custom-remove-icon cursor-pointer"
                onClick={() => {
                  setSearch("");
                }}
              />
            )}
          </span>
        </div>
      )}
      <div className="flex-grow-1 overflow-auto py-2 costume-scrollbar">
        {renderProductByOrder?.map((item) => itemTemplate(item))}
      </div>
    </div>
  );
};

export default RessourceActivityTable;

RessourceActivityTable.defaultProps = {
  firstColumn: { field: "activity", header: "Activités" },
  products: [
    {
      activity: "Pinking",
      productivity: "120",
      performance: "+8%",
      objective: "100%",
    },
    {
      activity: "Packing",
      productivity: "98",
      performance: "+2%",
      objective: "99%",
    },
    {
      activity: "Emballage",
      productivity: "110",
      performance: "-2%",
      objective: "98%",
    },
    {
      activity: "Reception",
      productivity: "80",
      performance: "-2%",
      objective: "90%",
    },
    {
      activity: "Pinking",
      productivity: "120",
      performance: "+8%",
      objective: "100%",
    },
    {
      activity: "Packing 1",
      productivity: "98",
      performance: "+2%",
      objective: "99%",
    },
  ],
};
