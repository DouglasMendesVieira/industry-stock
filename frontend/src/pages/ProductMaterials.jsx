import { useEffect, useState } from "react";
import { api } from "../api/api";
import theme from "../styles/theme";
import Confirm from "../components/Confirm";
import { useToast } from "../context/ToastContext";
import { getErrorMessage } from "../utils/getErrorMessage";

export default function ProductMaterials() {

    const { showToast } = useToast();

    const [products,setProducts] = useState([]);
    const [materials,setMaterials] = useState([]);
    const [linked,setLinked] = useState([]);
    const [confirmId,setConfirmId] = useState(null);

    const [loading,setLoading] = useState(false);

    const [form,setForm] = useState({
        productId:"",
        rawMaterialId:"",
        quantity:""
    });

    async function loadData(){

        try{

            const [p,m] = await Promise.all([
                api.get("/products"),
                api.get("/raw-materials")
            ]);

            setProducts(p.data);
            setMaterials(m.data);

        }catch(err){
            showToast(getErrorMessage(err),"error");
        }
    }

    async function loadLinked(productId){

        if(!productId){
            setLinked([]);
            return;
        }

        try{

            const res = await api.get(`/products/${productId}/materials`);
            setLinked(res.data);

        }catch(err){
            showToast(getErrorMessage(err),"error");
        }
    }

    useEffect(()=>{
        loadData();
    },[]);

    useEffect(()=>{
        loadLinked(form.productId);
    },[form.productId]);

    function handleChange(e){
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    }

    // ⭐ ASSOCIAR MATERIAL
    async function associate(e){

        e.preventDefault();

        if(loading) return;

        try{

            setLoading(true);

            await api.post(`/products/${form.productId}/materials`,{
                rawMaterialId:Number(form.rawMaterialId),
                quantity:Number(form.quantity)
            });

            showToast("Material associated!","success");

            setForm({
                ...form,
                rawMaterialId:"",
                quantity:""
            });

            loadLinked(form.productId);

        }catch(err){
console.log("FULL ERROR:", err);
    console.log("DATA:", err.response?.data);
            showToast(
                getErrorMessage(err),
                "error"
            );

        }finally{
            setLoading(false);
        }
    }

    // ⭐ REMOVER MATERIAL
    async function remove(id){

        try{

            await api.delete(`/products/${form.productId}/materials/${id}`);

            showToast("Material removed!","success");

            loadLinked(form.productId);

        }catch(err){

            showToast(
                getErrorMessage(err),
                "error"
            );

        }finally{
            setConfirmId(null);
        }
    }

    return(
        <div style={theme.container}>

            <h1 style={theme.title}>
                Associate Material to Product
            </h1>

            <div
                style={theme.card}
                onMouseEnter={(e)=>e.currentTarget.style.transform="translateY(-4px)"}
                onMouseLeave={(e)=>e.currentTarget.style.transform="translateY(0)"}
            >

                <form
                    onSubmit={associate}
                    style={{
                        display:"flex",
                        gap:16,
                        flexWrap:"wrap"
                    }}
                >

                    <select
                        name="productId"
                        value={form.productId}
                        onChange={handleChange}
                        style={theme.input}
                        required
                    >
                        <option value="">Select Product</option>
                        {products.map(p=>(
                            <option key={p.id} value={p.id}>
                                {p.name}
                            </option>
                        ))}
                    </select>

                    <select
                        name="rawMaterialId"
                        value={form.rawMaterialId}
                        onChange={handleChange}
                        style={theme.input}
                        required
                    >
                        <option value="">Select Material</option>
                        {materials.map(m=>(
                            <option key={m.id} value={m.id}>
                                {m.name}
                            </option>
                        ))}
                    </select>

                    <input
                        name="quantity"
                        type="number"
                        placeholder="Quantity"
                        value={form.quantity}
                        onChange={handleChange}
                        style={theme.input}
                        required
                    />

                    <button
                        style={theme.button}
                        disabled={loading}
                    >
                        {loading ? "Associating..." : "Associate"}
                    </button>

                </form>
            </div>

            {form.productId && (

                <div
                    style={{
                        ...theme.card,
                        marginTop:30
                    }}
                >

                    <h2 style={{marginBottom:20}}>
                        Materials linked to this product
                    </h2>

                    {linked.length===0 && (
                        <div style={{
                            textAlign:"center",
                            opacity:0.6,
                            padding:40
                        }}>
                            Nothing here yet 🚀
                        </div>
                    )}

                    {linked.map(l=>(

                        <div
                            key={l.id}
                            style={{
                                display:"flex",
                                justifyContent:"space-between",
                                padding:"14px 0",
                                borderBottom:"1px solid rgba(255,255,255,0.05)"
                            }}
                        >

                            <span>
                                <b>{l.rawMaterial.name}</b> — Quantity: {l.quantity}
                            </span>

                            <button
                                style={theme.dangerButton}
                                onClick={()=>setConfirmId(l.id)}
                            >
                                Remove
                            </button>

                        </div>
                    ))}

                </div>
            )}

            {confirmId && (
                <Confirm
                    message="Are you sure you want to remove this material?"
                    onConfirm={()=>remove(confirmId)}
                    onCancel={()=>setConfirmId(null)}
                />
            )}

        </div>
    );
}
