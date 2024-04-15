import img1 from "../images/bg1.png";
import img2 from "../images/bg2.png";

const PerformanceCard = ({ data, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white border-round-2xl px-3 min-h-full flex flex-column blue-shadow cursor-pointer"
      style={{
        backgroundImage: `url(${data?.award === "best" ? img1 : img2})`,
        backgroundPosition: "bottom center",
        backgroundRepeat: "no-repeat",
        paddingBottom: "70px",
      }}
    >
      {data?.award === "best" && (
        <div className="bg-blue-600 text-white text-center -mx-3 p-2 border-round-top-2xl text-xs">
          Meilleure performance
        </div>
      )}
      {data?.award === "worst" && (
        <div className="bg-red-500 text-white text-center -mx-3 p-2 border-round-top-2xl  text-xs">
          Moins bonnes performances
        </div>
      )}
      <div className="font-bold text-color text-center border-bottom-1 border-200 pb-2 mb-2 mt-3">
        {data.equipe}
      </div>
      <div className="text-4xl text-color text-center font-semibold">
        {data?.average}
      </div>
      <div className="text-sm text-color-secondary text-center">
        {data?.averageUnit}
      </div>
      <div
        className={`text-sm text-center mt-2 ${
          data?.performance[0] === "-" ? "text-red-400" : "text-teal-400"
        }`}
      >
        {data?.performance[0] === "-" ? (
          <i className="pi pi-sort-down-fill text-red-400 text-xs mr-2"></i>
        ) : (
          <i className="pi pi-sort-up-fill text-teal-400 text-xs mr-2"></i>
        )}
        {data?.performance}
      </div>
      <div className="h-5rem" />
      <div className="text-sm text-color text-center font-medium border-top-1 border-200 pt-2 mt-auto">
        {data?.amount}
        <br />
        {data?.amountUnit + " " + "traitées"}
      </div>
    </div>
  );
};
export default PerformanceCard;
