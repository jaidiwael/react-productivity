const PerformanceCard = ({ data }) => {
  return (
    <div className="bg-white border-round-2xl p-3 shadow-1 h-full flex flex-column">
      {data?.award === "best" && (
        <div className="best-performance-bg text-white text-center -mt-3 mb-3 -mx-3 p-2 border-round-top-2xl">
          Meilleure performance
        </div>
      )}
      {data?.award === "worst" && (
        <div className="worst-performance-bg text-white text-center -mt-3 mb-3 -mx-3 p-2 border-round-top-2xl">
          Moins bonnes performances
        </div>
      )}
      <div className="text-l text-color text-center border-bottom-1 border-200 pb-2 mb-2">
        {data.equipe}
      </div>
      <div className="text-3xl text-color text-center font-bold">
        {data?.average}
      </div>
      <div className="text-sm text-400 text-center">{data?.averageUnit}</div>
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
      <div className="text-l text-color text-center border-top-1 border-200 pt-2 mt-auto">
        {data?.amount}
        <br />
        {data?.amountUnit + " " + "traitées"}
      </div>
    </div>
  );
};
export default PerformanceCard;
