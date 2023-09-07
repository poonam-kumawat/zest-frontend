import axios from "axios";
// import store from 'src/store'

export const protectedaxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});
export const globalaxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

// const requestHandler = (request) => {
//   request.headers.Authorization = `Bearer ${store.getState().common.token}`
//   return request
// }

const requestHandler = (request: any) => {
  return request;
};
//

const responseHandler = (response: any) => {
  return response;
};

protectedaxiosInstance.interceptors.request.use((request) =>
  requestHandler(request)
);

protectedaxiosInstance.interceptors.response.use(
  (response) => responseHandler(response),
  (err) => {
    if (err.response && err.response.data) {
      throw Error(JSON.stringify(err.response.data.message));
    }
    throw Error(err.message);
  }
);
