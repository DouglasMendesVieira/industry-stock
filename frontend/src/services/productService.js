import { api } from "../api/api";

export const productService = {

    async getAll(){
        const response = await api.get("/products");

        if(Array.isArray(response.data))
            return response.data;

        if(response.data?.content)
            return response.data.content;

        if(response.data?.data)
            return response.data.data;

        return [];
    },

    async create(data){
        const response = await api.post("/products", data);
        return response.data;
    },

    async delete(id){
        await api.delete(`/products/${id}`);
    }

};
