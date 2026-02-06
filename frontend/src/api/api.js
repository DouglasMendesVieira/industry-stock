import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

api.interceptors.response.use(

    response=>response,

    error=>{

        const message =
            error?.response?.data?.message ||
            "Unexpected error occurred";

        return Promise.reject(error);
    }

);
