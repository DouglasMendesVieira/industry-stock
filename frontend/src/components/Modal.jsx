import theme from "../styles/theme";

export default function Modal({
    title,
    children,
    onConfirm,
    onCancel
}){

    return(

        <div style={theme.modalOverlay}>

            <div style={theme.modal}>

                <h2 style={{marginBottom:20}}>
                    {title}
                </h2>

                <p style={{
                    marginBottom:30,
                    opacity:.8
                }}>
                    {children}
                </p>

                <div style={{
                    display:"flex",
                    justifyContent:"flex-end",
                    gap:12
                }}>

                    <button
                        style={theme.cancelButton}
                        onClick={onCancel}
                    >
                        Cancel
                    </button>

                    <button
                        style={theme.dangerButton}
                        onClick={onConfirm}
                    >
                        Confirm
                    </button>

                </div>

            </div>

        </div>
    );
}
