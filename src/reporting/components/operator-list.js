import { Carousel } from "primereact/carousel";
import { InputText } from "primereact/inputtext";

const OperatorList = () => {
  const operators = [
    {
      id: "1",
      name: "Sofie Martel",
      onclick: () => {},
    },
    {
      id: "2",
      name: "Sofie Martel",
      onclick: () => {},
    },
    {
      id: "3",
      name: "Sofie Martel",
      onclick: () => {},
    },
    {
      id: "4",
      name: "Sofie Martel",
      onclick: () => {},
    },
    {
      id: "5",
      name: "Sofie Martel",
      onclick: () => {},
    },
    {
      id: "6",
      name: "Sofie Martel",
      onclick: () => {},
    },
    {
      id: "7",
      name: "Sofie Martel",
      onclick: () => {},
    },
  ];
  const operatorTemplate = (item) => {
    return (
      <div
        onclick={item.onclick}
        className="border-bottom-1 border-200 h-full flex align-items-center justify-content-center	"
      >
        {item.name}
      </div>
    );
  };
  return (
    <div className="bg-white border-round-2xl shadow-1 h-full flex flex-column  text-center">
      <div className="border-bottom-1 border-200 text-center p-2">
        Opérateurs
      </div>
      <span className="p-input-icon-left w-15rem mx-auto mt-3">
        <i className="pi pi-search" />
        <InputText
          placeholder="Search"
          className="w-full border-round-3xl surface-200 border-none"
        />
      </span>
      <Carousel
        value={operators}
        numVisible={6}
        numScroll={1}
        orientation="vertical"
        verticalViewPortHeight="300px"
        itemTemplate={operatorTemplate}
        showIndicators={false}
      />
    </div>
  );
};

export default OperatorList;
