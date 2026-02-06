import { useState } from "react";
import theme from "../styles/theme";
import Modal from "../components/Modal";
import Spinner from "../components/Spinner";
import { useToast } from "../context/ToastContext";

import useProducts from "../hooks/useProducts";
import { productService } from "../services/productService";

export default function Products(){

    const {products,loading,reload} = useProducts();
    const {showToast} = useToast();

    const [form,setForm] = useState({
        name:"",
        code:"",
        price:""
    });

    const [selected,setSelected] = useState(null);
    const [saving,setSaving] = useState(false);

    function handleChange(e){
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    }

    async function handleCreate(e){
        e.preventDefault();

        try{

            setSaving(true);

            await productService.create({
                name:form.name,
                code:form.code,
                price:Number(form.price)
            });

            setForm({
                name:"",
                code:"",
                price:""
            });

            reload();
            showToast("Product created!");

        }catch{
            showToast("Error creating product","error");
        }
        finally{
            setSaving(false);
        }
    }

    async function confirmDelete(){

        try{
            await productService.delete(selected);

            showToast("Product removed!");
            reload();

        }catch{
            showToast("Error removing product","error");
        }
        finally{
            setSelected(null);
        }
    }

    return(
        <div style={theme.container}>

            <h1 style={theme.title}>Products</h1>

            <div style={theme.card}>
                <form
                    onSubmit={handleCreate}
                    style={{
                        display:"flex",
                        gap:16,
                        flexWrap:"wrap"
                    }}
                >

                    <input
                        name="name"
                        placeholder="Name"
                        value={form.name}
                        onChange={handleChange}
                        style={theme.input}
                        required
                    />

                    <input
                        name="code"
                        placeholder="Code"
                        value={form.code}
                        onChange={handleChange}
                        style={theme.input}
                        required
                    />

                    <input
                        name="price"
                        type="number"
                        placeholder="Price"
                        value={form.price}
                        onChange={handleChange}
                        style={theme.input}
                        required
                    />

                    <button
                        style={theme.button}
                        disabled={saving}
                    >
                        {saving ? <Spinner/> : "Create"}
                    </button>

                </form>
            </div>

            {loading ? <Spinner/> : Array.isArray(products) && products.map(p=>(
                <div
                    key={p.id}
                    style={{
                        ...theme.card,
                        marginTop:20,
                        display:"flex",
                        justifyContent:"space-between",
                        alignItems:"center"
                    }}
                >

                    <span>
                        <b>{p.name}</b> — {p.code} — ${p.price}
                    </span>

                    <button
                        style={theme.dangerButton}
                        onClick={()=>setSelected(p.id)}
                    >
                        Delete
                    </button>

                </div>
            ))}

            {selected && (
                <Modal
                    title="Remove Product"
                    message="Are you sure you want to remove this product?"
                    onConfirm={confirmDelete}
                    onCancel={()=>setSelected(null)}
                />
            )}

        </div>
    );
}
