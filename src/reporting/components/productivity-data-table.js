import { useState, useMemo } from "react";
import { Carousel } from "primereact/carousel";
import Logo from "../../assets/images/alki-logo.svg";

import { customOrder } from "../helpers";

const ProductivityDataTable = ({
  firstColumn,
  products,
  selectedRow,
  onRowSelection,
  blueTheme,
  selectedColor,
}) => {
  const [order, setOrder] = useState({ column: 0, direction: "asc" });

  const renderProductByOrder = useMemo(() => {
    switch (order.column) {
      case 0:
      default:
        return products.sort(customOrder(firstColumn?.field, order.direction));
      case 1:
        return products.sort(customOrder("productivity", order.direction));
      case 2:
        return products.sort(customOrder("objective", order.direction));
      case 3:
        return products.sort(customOrder("performance", order.direction));
      case 4:
        return products.sort(customOrder("volumes", order.direction));
    }
  }, [order, products, firstColumn]);

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
        <div className="col-4 flex">
          <div
            className="border-round-xl text-white px-3 py-1"
            style={{
              backgroundColor: item?.id === selectedRow ? "unset" : item?.color,
            }}
          >
            {item[firstColumn?.field]}
          </div>
        </div>

        <div className={`col-2`}>
          <span className="font-bold">{item?.productivity}</span>
        </div>
        <div className={`col-2 z-1`}>
          <span className="mr-1">{item?.objective}</span>
        </div>
        <div className="flex align-items-center gap-1 col-2">
          <div
            className={`text-xs text-center ${
              item?.performance[0] === "-" ? "text-red-400" : "text-teal-400"
            } ${
              item?.id === selectedRow
                ? "border-round-xl bg-white pl-1 pr-1"
                : ""
            }`}
          >
            {item?.performance[0] === "-" ? (
              <i className="pi pi-sort-down-fill text-red-400 text-xs mr-2"></i>
            ) : (
              <i className="pi pi-sort-up-fill text-teal-400 text-xs mr-2"></i>
            )}
            {item?.performance}%
          </div>
        </div>
        <div className={`col-2 z-1`}>
          <span className="mr-1">{item?.volumes}</span>
        </div>
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
      className={`border-round-2xl shadow-2 ${
        blueTheme ? "bg-blue-800" : "bg-white"
      }`}
    >
      <div
        className={`header grid border-round-top-2xl border-bottom-1 border-opacity-white text-xs ml-3 mr-3 mb-3 mt-0 ${
          blueTheme ? " text-light-blue" : "text-color surface-50"
        }`}
        style={{
          marginTop: "0px !important",
        }}
      >
        <div
          onClick={() => updateOrder(0)}
          className={`cursor-pointer col-4 flex align-items-center ${
            order.column === 0 ? "text-white" : ""
          }`}
        >
          {firstColumn.header}
          <span
            className={`text-xs pi ${
              order.column === 0 && order.direction === "asc"
                ? "pi-chevron-down"
                : "pi-chevron-up"
            } ml-2`}
          ></span>
        </div>
        <div
          onClick={() => updateOrder(1)}
          className={`cursor-pointer col-2 flex align-items-center ${
            order.column === 1 ? "text-white" : ""
          }`}
        >
          Réalisé
          <span
            className={`text-xs pi ${
              order.column === 1 && order.direction === "asc"
                ? "pi-chevron-down"
                : "pi-chevron-up"
            } ml-2`}
          ></span>
        </div>
        <div
          onClick={() => updateOrder(2)}
          className={`cursor-pointer col-2 flex align-items-center ${
            order.column === 2 ? "text-white" : ""
          }`}
        >
          Cible
          <span
            className={`text-xs pi ${
              order.column === 2 && order.direction === "asc"
                ? "pi-chevron-down"
                : "pi-chevron-up"
            } ml-2`}
          ></span>
        </div>
        <div
          onClick={() => updateOrder(3)}
          className={`cursor-pointer col-2 flex align-items-center ${
            order.column === 3 ? "text-white" : ""
          }`}
        >
          Variation
          <span
            className={`text-xs pi ${
              order.column === 3 && order.direction === "asc"
                ? "pi-chevron-down"
                : "pi-chevron-up"
            } ml-2`}
          ></span>
        </div>
        <div
          onClick={() => updateOrder(4)}
          className={`cursor-pointer col-2 flex align-items-center ${
            order.column === 3 ? "text-white" : ""
          }`}
        >
          Volume
          <span
            className={`text-xs pi ${
              order.column === 3 && order.direction === "asc"
                ? "pi-chevron-down"
                : "pi-chevron-up"
            } ml-2`}
          ></span>
        </div>
      </div>
      <Carousel
        value={renderProductByOrder}
        numVisible={2}
        numScroll={1}
        orientation="vertical"
        verticalViewPortHeight="150px"
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
      />
      {/*  <DataTable
        value={products}
        paginator
        paginatorPosition={"both"}
        rows={4}
        className="text-center productivity-table"
        size={"small"}
        paginatorTemplate="PrevPageLink NextPageLink"
        selectionMode="single"
        selection={currentPage}
        onSelectionChange={(e) => setCurrentPage(e.value)}
        dataKey="id"
        metaKeySelection={false}
        pt={{
          prevPageButton: {
            style: {
              transform: "rotate(-45deg)",
            },
          },
        }}
      >
        <Column
          key={firstColumn.field}
          field={firstColumn.field}
          header={firstColumn.header}
        />
        <Column
          field="productivity"
          header="Productivités"
          body={productivityBodyTemplate}
          className="text-center"
          pt={{
            headerContent: {
              className: "justify-content-center",
            },
          }}
        />
        <Column
          field="objective"
          header="Objectif"
          body={objectiveBodyTemplate}
          className="text-right"
          pt={{
            headerContent: {
              className: "justify-content-end",
            },
          }}
        />
      </DataTable> */}
    </div>
  );
};

export default ProductivityDataTable;

ProductivityDataTable.defaultProps = {
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
