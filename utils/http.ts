import axios from "axios";

const API_ROOT: string =
  process.env.NEXT_PUBLIC_API_URL || "https://pro-api.coinmarketcap.com";
const TIMEOUT: number = 60000;

const http = (baseURL: string = API_ROOT, timeout: number = TIMEOUT) => {
  const headers: { [key: string]: string } = {
    "Content-Type": "application/json",
    "X-CMC_PRO_API_KEY": `${process.env.NEXT_PUBLIC_API_KEY}`,
  };

  const client = axios.create({
    baseURL,
    timeout,
    headers,
  });

  // Intercept response object and handleSuccess and Error Object
  client.interceptors.response.use(handleSuccess, handleError);

  function handleSuccess(response: any) {
    return response;
  }

  /** Intercept any unauthorized request.
   * status 401 means either accessToken is expired or invalid
   * dispatch logout action accordingly **/
  function handleError(error: any) {
    if (error.response?.status !== 500) {
      return Promise.reject(error.response?.data);
    } else if (error.response?.status === 403) {
      window.location.href = "/403";
    } else {
      return Promise.reject(error);
    }
  }

  function get(path: string) {
    return client.get(path).then((response: any) => response.data);
  }

  function post(path: string, payload: any) {
    return client.post(path, payload).then((response: any) => response.data);
  }

  function put(path: string, payload: any) {
    return client.put(path, payload).then((response: any) => response.data);
  }

  function patch(path: string, payload: any) {
    return client.patch(path, payload).then((response: any) => response.data);
  }

  function _delete(path: string, data?: any) {
    if (data) {
      return client
        .delete(path, { data: data })
        .then((response: any) => response.data);
    }
    return client.delete(path).then((response: any) => response.data);
  }

  return {
    get,
    post,
    put,
    patch,
    delete: _delete,
  };
};

export default http;
