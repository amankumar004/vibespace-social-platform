import axios from "axios";

export const axiosInstance = axios.create({});

export const apiConnector = (
  method,
  url,
  body = null,
  headers = {},
  params = {},
) =>
  axiosInstance({
    method: `${method}`,
    url: `${url}`,
    data: body ? body : null,
    headers: headers ? headers : null,
    params: params ? params : null,
  });

export default apiConnector;
