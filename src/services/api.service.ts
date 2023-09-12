import { globalaxiosInstance } from "./axiosSetup";

export const getProducts = (filter: any) => {
    return globalaxiosInstance.post(`/api/product/find`, filter);
}

export const getCategories=()=>{
    return globalaxiosInstance.get('/api/category/categories')
}