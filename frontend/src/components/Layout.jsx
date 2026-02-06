import Sidebar from "./Sidebar";

export default function Layout({children}){

    return(
        <div style={{
            display:"flex",
            minHeight:"100vh",
            background:"linear-gradient(135deg,#0f172a,#020617)",
            color:"white"
        }}>

            <Sidebar/>

            <div style={{
                flex:1,
                padding:"clamp(16px,4vw,40px)",
                maxWidth:1400,
                margin:"0 auto",
                width:"100%"
            }}>
                {children}
            </div>

        </div>
    );
}
