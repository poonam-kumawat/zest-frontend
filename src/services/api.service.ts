import { globalaxiosInstance } from "./axiosSetup";

export const getProducts = (filter: any) => {
    return globalaxiosInstance.post(`/api/product`, filter);
}

export const getCategories=()=>{
    return globalaxiosInstance.get('/api/category/')
}


export const sendOTP = (email: string) => {
    return globalaxiosInstance.post('/api/user/send-otp', { email});
};

export const verifyOTP=(email:string,otp:any)=>{
    return globalaxiosInstance.post('/api/user/verify-otp',{email,otp})
}