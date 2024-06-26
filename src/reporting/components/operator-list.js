import { useState, useMemo } from "react";
import { Carousel } from "primereact/carousel";
import { InputText } from "primereact/inputtext";

import { customOrder } from "../helpers";

const OperatorList = ({ selectedOperator, onOperatorClick, operators }) => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("asc");

  const operatorTemplate = (item) => {
    return (
      <div
        onClick={() => onOperatorClick(item)}
        className={`text-white flex align-items-center justify-content-center	cursor-pointer py-3 max-h-3rem min-w-full custom-bg-hover ${
          selectedOperator?.id === item?.id ? "custom-bg-selected" : ""
        }`}
      >
        {item.operator}
      </div>
    );
  };

  const renderSearchedOperator = useMemo(() => {
    let newOperators = operators;
    if (search) {
      const expr = new RegExp(search, "i");
      return newOperators?.filter((op) => expr.test(op.operator));
    }
    return newOperators.sort(customOrder("operator", sort));
  }, [search, sort, operators]);
  return (
    <div className="bg-blue-800 border-round-2xl shadow-1 h-full flex flex-column  text-center px-4">
      <div
        className="text-white border-bottom-1 border-200 text-center py-4 cursor-pointer "
        onClick={() => {
          setSort(sort === "asc" ? "desc" : "asc");
        }}
      >
        Opérateurs<span class="text-sm pi pi-sort-alt ml-1"></span>
      </div>
      <span className="p-input-icon-left w-15rem mx-auto mt-3">
        <i className="pi pi-search" />
        <InputText
          placeholder="Rechercher..."
          className="w-full border-round-3xl surface-200 border-none py-2 pr-5"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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
      {/* <Carousel
        value={renderSearchedOperator}
        numVisible={12}
        numScroll={1}
        orientation="vertical"
        // verticalViewPortHeight="calc(100% - 100px)"
        itemTemplate={operatorTemplate}
        showIndicators={false}
        pt={{
          root: {
            className: "h-full",
          },
          content: "h-full",
          container: "h-full",
          itemscontent: "flex-grow-1",
          item: "max-h-3rem flex justify-content-center",
        }}
      /> */}
      <div className="flex-grow-1 overflow-auto py-2 costume-scrollbar">
        {renderSearchedOperator?.map((item) => operatorTemplate(item))}
      </div>
    </div>
  );
};

export default OperatorList;
