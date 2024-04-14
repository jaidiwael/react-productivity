import { Carousel } from "primereact/carousel";
import PerformanceCard from "./performance-card";

const PerformanceSlider = ({ onClickCard }) => {
  const products = [
    {
      equipe: "Picking",
      award: "best",
      average: 120,
      averageUnit: "lignes/h",
      performance: "+8%",
      amount: 950,
      amountUnit: "commandes",
    },
    {
      equipe: "Réception",
      award: "worst",
      average: 80,
      averageUnit: "lignes/h",
      performance: "-6%",
      amount: 950,
      amountUnit: "colis",
    },
    {
      equipe: "Emballage",
      average: 110,
      performance: "+2%",
      amount: 950,
      amountUnit: "colis",
    },
    {
      equipe: "Flachage",
      average: 110,
      performance: "-2%",
      amount: 950,
      amountUnit: "colis",
    },
    {
      equipe: "Flachage",
      average: 110,
      performance: "-2%",
      amount: 950,
      amountUnit: "colis",
    },
  ];

  const productTemplate = (product) => {
    return <PerformanceCard data={product} onClick={onClickCard} />;
  };

  return (
    <div className="bg-blue-800 border-round-2xl p-3 ">
      <Carousel
        value={products}
        numVisible={4}
        numScroll={1}
        itemTemplate={productTemplate}
        // circular
        showIndicators={false}
        pt={{
          item: {
            className: "p-3",
          },
          previousbutton: {
            className: "text-white",
          },
          nextbutton: {
            className: "text-white",
          },
        }}
      />
    </div>
  );
};
export default PerformanceSlider;
