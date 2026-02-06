const theme = {

layout:{
    minHeight:"100vh",
    background:"linear-gradient(135deg,#0f172a,#020617)",
    color:"white",
    display:"flex",
    flexDirection:"column"
},

container:{
    width:"100%",
    maxWidth:1200,
    margin:"0 auto",
    padding:"clamp(16px,4vw,40px)",
    flex:1
},

title:{
    fontSize:32,
    fontWeight:"bold",
    marginBottom:30
},

card:{
    background:"rgba(255,255,255,0.05)",
    border:"1px solid rgba(255,255,255,0.08)",
    borderRadius:14,
    padding:20,
    width:"100%",
    transition:"0.2s",
},

input:{
    padding:12,
    borderRadius:10,
    border:"1px solid rgba(255,255,255,0.15)",
    background:"#0f172a",
    color:"#fff",
    flex:1,
    minWidth:180,
    appearance:"none"
},

button:{
    padding:"12px 20px",
    borderRadius:10,
    border:"none",
    background:"#2563eb",
    color:"white",
    cursor:"pointer",
    fontWeight:600
},

dangerButton:{
    padding:"10px 16px",
    borderRadius:10,
    border:"none",
    background:"#ef4444",
    color:"white",
    cursor:"pointer",
    fontWeight:600
},

modalOverlay:{
    position:"fixed",
    top:0,
    left:0,
    width:"100%",
    height:"100%",
    background:"rgba(0,0,0,0.6)",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    zIndex:999
},

modal:{
    background:"#020617",
    padding:30,
    borderRadius:14,
    width:"90%",
    maxWidth:420,
    border:"1px solid rgba(255,255,255,0.08)",
    boxShadow:"0 20px 60px rgba(0,0,0,0.6)"
},

cancelButton:{
    padding:"10px 16px",
    borderRadius:8,
    border:"1px solid rgba(255,255,255,0.2)",
    background:"transparent",
    color:"white",
    cursor:"pointer"
}

};

export default theme;
