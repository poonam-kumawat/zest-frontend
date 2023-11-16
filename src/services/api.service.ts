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

export const getLocation = (filter: any) => {
  return globalaxiosInstance.post(`/api/pincode/`, filter);
};

export const getAddresses = (filter: any) => {
  return globalaxiosInstance.post(`/api/address/get`, filter);
};

export const createAddress = (filter: any) => {
  return globalaxiosInstance.post(`/api/address/`, filter);
};

export const updateAddress = (filter: any) => {
  return globalaxiosInstance.put(`/api/address/`, filter);
};

export const deleteAddress = (filter: any) => {
  return globalaxiosInstance.delete(`/api/address/${filter.id}`);
};
