import { useEffect, useState } from "react";
import { productService } from "../services/productService";

export default function useProducts(){

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchProducts(){

        setLoading(true);

        try{
            const data = await productService.getAll();

            setProducts(Array.isArray(data) ? data : []);

        }catch(e){
            console.error("Erro ao buscar produtos", e);
            setProducts([]);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchProducts();
    },[]);

    return {
        products,
        loading,
        reload: fetchProducts
    };
}
