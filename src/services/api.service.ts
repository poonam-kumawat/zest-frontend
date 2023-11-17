import { globalaxiosInstance, protectedaxiosInstance } from "./axiosSetup";

export const getProducts = (filter: any) => {
  return globalaxiosInstance.post(`/api/product`, filter);
};

export const getCategories = () => {
  return globalaxiosInstance.get("/api/category");
};

export const sendOTP = (email: string) => {
  return globalaxiosInstance.post("/api/user/send-otp", { email });
};

export const verifyOTP = (email: string, otp: any) => {
  return globalaxiosInstance.post("/api/user/verify-otp", { email, otp });
};

export const getRefreshToken = (email: any, refreshToken: any) => {
  return protectedaxiosInstance.post("/api/user/refresh", {
    email,
    refreshToken,
  });
};

export const fetchUserDetails = (email: string) => {
  return protectedaxiosInstance.post("/api/user/get-details", { email });
};

export const updateUserDetails = (email: string, update: object) => {
  return protectedaxiosInstance.post("/api/user/update-details", {
    email,
    update,
  });
};

export const getLocation = (filter: any) => {
  return globalaxiosInstance.post(`/api/pincode/`, filter);
};

export const getAddresses = (filter: any) => {
  return protectedaxiosInstance.post(`/api/address/get`, filter);
};

export const createAddress = (filter: any) => {
  return protectedaxiosInstance.post(`/api/address/`, filter);
};

export const updateAddress = (filter: any) => {
  return protectedaxiosInstance.put(`/api/address/`, filter);
};

export const deleteAddress = (filter: any) => {
  return protectedaxiosInstance.delete(`/api/address/${filter.id}`);
};

export const generateOrder = (order: any) => {
  return protectedaxiosInstance.post(`/api/payment/orders`, order);
};

export const verifyPayment = (data: any) => {
  return protectedaxiosInstance.post(`/api/payment/verify`, data);
};
