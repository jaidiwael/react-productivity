const headers = {
  Authorization:
    "Bearer eyJraWQiOiJPZ2hsaHJOZThuZWdrZGxXYVJHeG5LQ3VNdVltWUJ3Mm1nSTMxdW5jOWZrPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIyYWI3ZjkwNC1hMDc0LTQ2ZDctOTAxYy02MzQzMWYyOTAzYzAiLCJjb2duaXRvOmdyb3VwcyI6WyJNQVJTQU5OQVkiXSwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTMuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0zX1F6YlBvSHNndyIsImNvZ25pdG86dXNlcm5hbWUiOiJqYWlkaXdhZWwiLCJvcmlnaW5fanRpIjoiODA4YzIyYmEtMzg0ZC00NTlkLWFhNmMtZTJlZjZkY2E4MmZhIiwiYXVkIjoiM2hzdG9rNGt1czhjMXNzMGZtc3M5c3Y4MmYiLCJldmVudF9pZCI6ImZjNmI1MmZlLWRlZmQtNDIwOS1iNzdjLWZmMjc4ZTdkMjU2ZSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNzE3MDYwMjUxLCJleHAiOjE3MTgwMjgwMDksImlhdCI6MTcxODAyNDQwOSwianRpIjoiNjk2NGUzMTUtZTk3NS00ZGUxLThlODYtMjVlN2FjZWI3MTdkIiwiZW1haWwiOiJqYWlkaXdhZWxAZ21haWwuY29tIn0.SWYov--E25cRvsnIOJpSvK7JDgQVB4xfrbZmdodp6JjoQAIEF-uJFmFS5r0rUV0b9pwrhZwqe4e_aUmPIkhKpOE5E3mAUOuCMB9MJlRj1wjbqzZPjsqA8Eep-8D2PxJIAvsmNU1OkQ4h6NXWo_CsqTBE05B-xsJG3AK-7ioLxc_IZAhfh9N-wBZmkW29UOg7DgEKA1nC-3v4ZLFJ5OvQI319Uf1_znAn1APC4rRj0pwe3rQbQCmZBNkmt9RBUZ-UcLC-UCz93kYm_wqP8wROH7E79H0N2XLAN6fW5FgvB75yaAt365ctFXdSpAVNBnVeBWsGGJ-7q5-NNAFNXCVb-g",
};

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

export const getProductivityDetailGoals = async ({ queryKey }) => {
  let res;
  try {
    res = await fetch(
      `https://l1efaqhstd.execute-api.eu-west-3.amazonaws.com/preprod/productivity-detail-goals?startDate=${queryKey[1]}&endDate=${queryKey[2]}`
    ).then((res) => res.json());
  } catch (e) {
    throw e;
  }
  return res;
};

export const getProductivityDetailRessources = async ({ queryKey }) => {
  let res;
  try {
    res = await fetch(
      `https://l1efaqhstd.execute-api.eu-west-3.amazonaws.com/preprod/productivity-detail-ressources?startDate=${queryKey[1]}&endDate=${queryKey[2]}&domainId=${queryKey[3]}`
    ).then((res) => res.json());
  } catch (e) {
    throw e;
  }
  return res;
};

export const getProductivityDetailRealForecast = async ({ queryKey }) => {
  let res;
  try {
    res = await fetch(
      `https://l1efaqhstd.execute-api.eu-west-3.amazonaws.com/preprod/productivity-detail-realforecast?startDate=${queryKey[1]}&endDate=${queryKey[2]}&domainId=${queryKey[3]}`,
      { headers }
    ).then((res) => res.json());
  } catch (e) {
    throw e;
  }
  return res;
};
