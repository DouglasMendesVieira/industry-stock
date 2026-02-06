export default function Toast({message,type}){

    if(!message) return null;

    return(

        <div style={{
            position:"fixed",
            bottom:30,
            right:30,
            background:type==="error" ? "#ef4444" : "#22c55e",
            padding:"14px 22px",
            borderRadius:10,
            color:"white",
            fontWeight:600,
            boxShadow:"0 10px 30px rgba(0,0,0,0.4)"
        }}>
            {message}
        </div>

    );
}
