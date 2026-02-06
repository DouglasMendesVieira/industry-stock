export default function Skeleton({height=20}){

    return(
        <div style={{
            width:"100%",
            height,
            borderRadius:8,
            background:"linear-gradient(90deg,#020617,#0f172a,#020617)",
            backgroundSize:"200% 100%",
            animation:"shine 1.4s infinite"
        }}/>
    );
}
