import { useEffect, useState } from "react";
import { materialService } from "../services/materialService";

export default function useMaterials(){

    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchMaterials(){
        try{
            const data = await materialService.getAll();
            setMaterials(data);
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchMaterials();
    },[]);

    return {
        materials,
        loading,
        reload: fetchMaterials
    };
    
}
