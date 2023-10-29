import axios from "axios";
import { store } from "../store";
import { setAccessToken } from "../Redux/reducer/userReducer";
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
  request.headers.Authorization = `Bearer ${store.getState().user.accessToken}`;
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
  function (error) {
    const originalRequest: any = error.config;
    if (
      error.response.status === 401 &&
      originalRequest.url ===
        `${process.env.REACT_APP_BACKEND_URL}/api/user/refresh`
    ) {
      return Promise.reject(error);
    }
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = store.getState().user.refreshToken;
      return globalaxiosInstance
        .post(`${process.env.REACT_APP_BACKEND_URL}/api/user/refresh`, {
          email: store.getState().user.email,
          refreshToken: refreshToken,
        })
        .then((res) => {
          if (res.status === 201) {
            store.dispatch(setAccessToken(res.data.accessToken));
            protectedaxiosInstance.defaults.headers.common["Authorization"] =
              "Bearer " + store.getState().user.accessToken;
            return protectedaxiosInstance(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);

// (err) => {
//   if (err.response && err.response.data) {
//     throw Error(JSON.stringify(err.response.data.message));
//   }
//   throw Error(err.message);
// }
