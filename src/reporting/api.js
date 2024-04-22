export const getProductivityTimes = async () => {
  let res;
  try {
    res = await fetch(
      `https://l1efaqhstd.execute-api.eu-west-3.amazonaws.com/preprod/productivity-home-times`
    ).then((res) => res.json());
  } catch (e) {
    throw e;
  }
  return res;
};

export const getProductivityRealForecast = async () => {
  let res;
  try {
    res = await fetch(
      `https://l1efaqhstd.execute-api.eu-west-3.amazonaws.com/preprod/productivity-home-realforeacst`
    ).then((res) => res.json());
  } catch (e) {
    throw e;
  }
  return res;
};

export const getProductivityHomeResources = async () => {
  let res;
  try {
    res = await fetch(
      `https://l1efaqhstd.execute-api.eu-west-3.amazonaws.com/preprod/productivity-home-ressources`
    ).then((res) => res.json());
  } catch (e) {
    throw e;
  }
  return res;
};
