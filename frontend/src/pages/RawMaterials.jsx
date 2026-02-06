import { useState } from "react";
import theme from "../styles/theme";
import Modal from "../components/Modal";
import Spinner from "../components/Spinner";
import { useToast } from "../context/ToastContext";

import useMaterials from "../hooks/useMaterials";
import { materialService } from "../services/materialService";

export default function RawMaterials(){

    const {materials, loading, reload} = useMaterials();
    const {showToast} = useToast();

    const [form,setForm] = useState({
        name:"",
        stock:""
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

            await materialService.create({
                name:form.name,
                stockQuantity:Number(form.stock)
            });

            setForm({name:"",stock:""});
            reload();

            showToast("Material created!");

        }catch{
            showToast("Error creating material","error");
        }
        finally{
            setSaving(false);
        }
    }

    async function confirmDelete(){

        try{
            await materialService.delete(selected);

            showToast("Material removed!");
            reload();

        }catch{
            showToast("Error removing material","error");
        }
        finally{
            setSelected(null); // FECHA MODAL
        }
    }

    return(
        <div style={theme.container}>

            <h1 style={theme.title}>Raw Materials</h1>

            {/* FORM */}
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
                        name="stock"
                        placeholder="Stock"
                        type="number"
                        value={form.stock}
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

            {/* LIST */}
            {loading ? <Spinner/> : materials.map(m=>(
                <div
                    key={m.id}
                    style={{
                        ...theme.card,
                        marginTop:20,
                        display:"flex",
                        justifyContent:"space-between",
                        alignItems:"center"
                    }}
                >

                    <span>
                        <b>{m.name}</b> — Stock: {m.stockQuantity}
                    </span>

                    <button
                        style={theme.dangerButton}
                        onClick={()=>setSelected(m.id)}
                    >
                        Delete
                    </button>

                </div>
            ))}

            {/* MODAL */}
            {selected && (
                <Modal
                    title="Remove Material"
                    message="Are you sure you want to remove this material?"
                    onConfirm={confirmDelete}
                    onCancel={()=>setSelected(null)}
                />
            )}

        </div>
    );
}
