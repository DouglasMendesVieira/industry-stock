import { NavLink } from "react-router-dom";

export default function Sidebar(){

    const linkStyle = ({isActive}) => ({
        padding:"12px 16px",
        borderRadius:10,
        textDecoration:"none",
        color:"white",
        fontWeight:500,
        background: isActive ? "#2563eb" : "transparent",
        transition:"0.2s"
    });

    return(
        <div style={{
            width:240,
            background:"#020617",
            borderRight:"1px solid rgba(255,255,255,0.05)",
            padding:20,
            display:"flex",
            flexDirection:"column",
            gap:10
        }}>
            <h2 style={{
                marginBottom:30,
                fontSize:20
            }}>
                Industry Stock
            </h2>

            <NavLink to="/products" style={linkStyle}>
                Products
            </NavLink>

            <NavLink to="/raw-materials" style={linkStyle}>
                Raw Materials
            </NavLink>

            <NavLink to="/associate" style={linkStyle}>
                Associate
            </NavLink>

            <NavLink to="/production" style={linkStyle}>
                Production
            </NavLink>

        </div>
    );
}
