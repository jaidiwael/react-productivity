import { useState } from "react";
import { Carousel } from "primereact/carousel";
import { Style } from "react-style-tag";

const ProductivityDataTable = ({
  firstColumn,
  products,
  selectedRow,
  onRowSelection,
  blueTheme,
}) => {
  const [order, setOrder] = useState(0);

  const itemTemplate = (item) => {
    return (
      <div
        className={`grid cursor-pointer  h-full m-auto align-items-center ${
          item?.id === selectedRow ? "selectedTableRow border-round-left" : ""
        } ${
          blueTheme
            ? "text-white border-white-alpha-10"
            : "border-black-alpha-10 text-color"
        } ${item.activity}`}
        onClick={() => onRowSelection(item?.id)}
        style={{
          backgroundColor: item?.id === selectedRow ? item.color : "",
        }}
      >
        <Style>{`
          .${item.activity}.selectedTableRow::after { border-left-color: ${item.color} }
        `}</Style>
        <div className="col-3 flex">
          <div
            className="border-round-xl text-white pl-3 pr-3"
            style={{
              backgroundColor: item?.id === selectedRow ? "unset" : item?.color,
            }}
          >
            {item[firstColumn?.field]}
          </div>
        </div>
        <div className="flex align-items-center gap-3 col-3">
          <span>{item.productivity}/h</span>
          <div
            className={`text-sm text-center ${
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
            {item?.performance}
          </div>
        </div>
        <div className={`col-3`}>
          <span className="font-bold">{item?.volumes} </span>
        </div>
        <div className={`col-3`}>
          <span>{item?.objective}</span>
        </div>
      </div>
    );
  };
  return (
    <div
      className={`border-round-2xl shadow-2 ${
        blueTheme ? "bg-blue-800" : "bg-white"
      }`}
    >
      <div
        className={`header grid border-round-top-2xl border-bottom-1 border-opacity-white ml-3 mr-3 mb-3 mt-0 ${
          blueTheme ? " text-light-blue" : "text-color surface-50"
        }`}
        style={{
          marginTop: "0px !important",
        }}
      >
        <div
          onClick={() => setOrder(0)}
          className={`cursor-pointer col-3 flex align-items-center ${
            order === 0 ? "text-white" : ""
          }`}
        >
          {firstColumn.header}
          <span className="pi pi-chevron-down ml-1 "></span>
        </div>
        <div
          onClick={() => setOrder(1)}
          className={`cursor-pointer col-3 flex align-items-center ${
            order === 1 ? "text-white" : ""
          }`}
        >
          Productivités<span className="pi pi-chevron-down ml-1 "></span>
        </div>
        <div
          onClick={() => setOrder(2)}
          className={`cursor-pointer col-3 flex align-items-center ${
            order === 2 ? "text-white" : ""
          }`}
        >
          Volumes<span className="pi pi-chevron-down ml-1 "></span>
        </div>
        <div
          onClick={() => setOrder(3)}
          className={`cursor-pointer col-3 flex align-items-center ${
            order === 3 ? "text-white" : ""
          }`}
        >
          Objectif<span className="pi pi-chevron-down ml-1 "></span>
        </div>
      </div>
      <Carousel
        value={products}
        numVisible={5}
        numScroll={1}
        orientation="vertical"
        verticalViewPortHeight="210px"
        itemTemplate={itemTemplate}
        showIndicators={false}
        pt={{
          previousbutton: {
            className: blueTheme ? "text-white" : "",
          },
          nextbutton: {
            className: blueTheme ? "text-white" : "",
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
