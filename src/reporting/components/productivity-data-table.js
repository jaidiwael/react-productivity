import { Carousel } from "primereact/carousel";

const ProductivityDataTable = ({
  firstColumn,
  products,
  selectedRow,
  onRowSelection,
}) => {
  const itemTemplate = (item) => {
    return (
      <div
        className={`grid cursor-pointer border-bottom-1 border-200 h-full m-auto align-items-center ${
          item?.id === selectedRow?.id ? "selectedTableRow text-white" : ""
        }`}
        onClick={() => onRowSelection(item)}
      >
        <div className="col-4">{item[firstColumn?.field]}</div>
        <div className="flex align-items-center gap-3 col-4">
          <span>{item.productivity}/h</span>
          <div
            className={`text-sm bg-white p-1 border-round-xl text-center ${
              item?.performance[0] === "-" ? "text-red-400" : "text-teal-400"
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
        <div className={`col-4 `}>
          <span
            className={`text-white border-round-2xl py-1 px-3 ${
              item?.objective !== "100%" ? "objective-bg1" : "objective-bg2"
            }`}
          >
            {item?.objective}
          </span>
        </div>
      </div>
    );
  };
  return (
    <div className="ba-white p-2 border-round-2xl shadow-2">
      <div className="header grid border-bottom-1 border-200 m-auto text-600">
        <div className="col-4">{firstColumn.header}</div>
        <div className="col-4">Productivités</div>
        <div className="col-4">Objectif</div>
      </div>
      <Carousel
        value={products}
        numVisible={5}
        numScroll={1}
        orientation="vertical"
        verticalViewPortHeight="200px"
        itemTemplate={itemTemplate}
        showIndicators={false}
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
