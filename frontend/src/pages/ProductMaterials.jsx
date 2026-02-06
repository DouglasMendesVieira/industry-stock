import { useEffect, useState } from "react";
import { api } from "../api/api";
import theme from "../styles/theme";
import Confirm from "../components/Confirm";
import { useToast } from "../context/ToastContext";

export default function ProductMaterials() {

    const {showToast} = useToast();

    const [products,setProducts]=useState([]);
    const [materials,setMaterials]=useState([]);
    const [linked,setLinked]=useState([]);
    const [confirmId,setConfirmId]=useState(null);

    const [form,setForm]=useState({
        productId:"",
        rawMaterialId:"",
        quantity:""
    });

    async function loadData(){
        const [p,m]=await Promise.all([
            api.get("/products"),
            api.get("/raw-materials")
        ]);

        setProducts(p.data);
        setMaterials(m.data);
    }

    async function loadLinked(productId){

        if(!productId){
            setLinked([]);
            return;
        }

        const res=await api.get(`/products/${productId}/materials`);
        setLinked(res.data);
    }

    useEffect(()=>{
        loadData();
    },[]);

    useEffect(()=>{
        loadLinked(form.productId);
    },[form.productId]);

    function handleChange(e){
        setForm({...form,[e.target.name]:e.target.value});
    }

    async function associate(e){

        e.preventDefault();

        try{

            await api.post(`/products/${form.productId}/materials`,{
                rawMaterialId:Number(form.rawMaterialId),
                quantity:Number(form.quantity)
            });

            showToast("Material associated!");
            loadLinked(form.productId);

        }catch(err){

            showToast(
                err.response?.data?.message ||
                "Association already exists."
            );
        }
    }

    async function remove(id){

        await api.delete(`/products/${form.productId}/materials/${id}`);

        showToast("Material removed!");
        loadLinked(form.productId);
        setConfirmId(null);
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

                    <button style={theme.button}>
                        Associate
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
                                <b>{l.rawMaterial.name}</b> — Qty: {l.quantity}
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
