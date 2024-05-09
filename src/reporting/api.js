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

export const getProductivityHomeGoal = async () => {
  let res;
  try {
    res = await fetch(
      `https://l1efaqhstd.execute-api.eu-west-3.amazonaws.com/preprod/productivity-home-goal`
    ).then((res) => res.json());
  } catch (e) {
    throw e;
  }
  return res;
};

export const getProductivityHomeProdvalues = async () => {
  let res;
  try {
    res = await fetch(
      `https://l1efaqhstd.execute-api.eu-west-3.amazonaws.com/preprod/productivity-home-prodvalues`
    ).then((res) => res.json());
  } catch (e) {
    throw e;
  }
  return res;
};

export const getProductivityDetailProd = async ({ queryKey }) => {
  let res;
  try {
    res = await fetch(
      `https://l1efaqhstd.execute-api.eu-west-3.amazonaws.com/preprod/productivity-detail-prod?startDate=${queryKey[1]}&endDate=${queryKey[2]}&domainId=${queryKey[3]}`
    ).then((res) => res.json());
  } catch (e) {
    throw e;
  }
  return res;
};

export const getProductivityDetailTimes = async ({ queryKey }) => {
  let res;
  try {
    res = await fetch(
      `https://l1efaqhstd.execute-api.eu-west-3.amazonaws.com/preprod/productivity-detail-times?startDate=${queryKey[1]}&endDate=${queryKey[2]}`
    ).then((res) => res.json());
  } catch (e) {
    throw e;
  }
  return res;
};
