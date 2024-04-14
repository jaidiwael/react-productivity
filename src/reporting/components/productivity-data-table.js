import { Carousel } from "primereact/carousel";

const ProductivityDataTable = ({
  firstColumn,
  products,
  selectedRow,
  onRowSelection,
  blueTheme,
}) => {
  const itemTemplate = (item) => {
    return (
      <div
        className={`grid cursor-pointer border-bottom-1 h-full m-auto align-items-center ${
          item?.id === selectedRow ? "selectedTableRow text-color" : ""
        } ${
          blueTheme
            ? "text-white border-white-alpha-10"
            : "border-black-alpha-10 text-color"
        }`}
        onClick={() => onRowSelection(item?.id)}
      >
        <div className="col-3">{item[firstColumn?.field]}</div>
        <div className="flex align-items-center gap-3 col-3">
          <span>{item.productivity}/h</span>
          <div
            className={`text-sm text-center ${
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
        <div className={`col-3`}>
          <span className="font-bold">{item?.volumes} </span>
          <span className="font-light">lignes</span>
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
        className={`header grid m-auto border-round-top-2xl p-2 ${
          blueTheme ? "bg-black-alpha-10 text-white" : "text-color surface-50"
        }`}
      >
        <div className="col-3">{firstColumn.header}</div>
        <div className="col-3">Productivités</div>
        <div className="col-3">Volumes</div>
        <div className="col-3">Objectif</div>
      </div>
      <Carousel
        value={products}
        numVisible={5}
        numScroll={1}
        orientation="vertical"
        verticalViewPortHeight="200px"
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
