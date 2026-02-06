import theme from "../styles/theme";

export default function Confirm({message,onConfirm,onCancel}){

    return(
        <div style={{
            position:"fixed",
            inset:0,
            background:"rgba(0,0,0,0.65)",
            backdropFilter:"blur(4px)",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            zIndex:9999
        }}>

            <div style={{
                background:"#020617",
                border:"1px solid rgba(255,255,255,0.08)",
                borderRadius:16,
                padding:30,
                width:"90%",
                maxWidth:420,
                boxShadow:"0 20px 60px rgba(0,0,0,0.6)",
                animation:"fadeIn .15s ease"
            }}>

                <h3 style={{
                    marginBottom:25,
                    fontWeight:600
                }}>
                    {message}
                </h3>

                <div style={{
                    display:"flex",
                    justifyContent:"flex-end",
                    gap:12
                }}>

                    <button
                        onClick={onCancel}
                        style={{
                            ...theme.button,
                            background:"transparent",
                            border:"1px solid rgba(255,255,255,0.15)"
                        }}
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        style={theme.dangerButton}
                    >
                        Remove
                    </button>

                </div>

            </div>

        </div>
    );
}
