import { Carousel } from "primereact/carousel";

import PerformanceCard from "./performance-card";

import NextIcon from "../../assets/images/next-arrow.svg";
import PrevIcon from "../../assets/images/pervious-arrow.svg";

const PerformanceSlider = ({ onClickCard, products }) => {
  const productTemplate = (product) => {
    return (
      <PerformanceCard
        data={product}
        onClick={() => onClickCard(product?.id)}
        isMaximum={
          product?.average ===
          Math.max(...products.map(({ average }) => average))
        }
        isMinimum={
          product?.average ===
          Math.min(...products.map(({ average }) => average))
        }
      />
    );
  };

  return (
    <div className="bg-blue-800 border-round-2xl px-3 py-2 ">
      <div className="text-white text-center font-semibold ">
        Productivité par domaine d'activité
      </div>
      <Carousel
        value={products}
        numVisible={6}
        numScroll={1}
        itemTemplate={productTemplate}
        // circular
        nextIcon={<img alt="" src={NextIcon} />}
        prevIcon={<img alt="" src={PrevIcon} />}
        showIndicators={false}
        pt={{
          item: {
            className: "px-3 py-2 max-w-14rem",
          },
          previousbutton: {
            className: "text-white",
          },
          nextbutton: {
            className: "text-white",
          },
          itemsContainer: {
            //className: "justify-content-center",
          },
        }}
      />
    </div>
  );
};
export default PerformanceSlider;
