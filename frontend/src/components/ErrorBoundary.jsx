import React from "react";
import Button from "./Button";

export default class ErrorBoundary extends React.Component{

    constructor(props){
        super(props);
        this.state={hasError:false};
    }

    static getDerivedStateFromError(){
        return {hasError:true};
    }

    render(){

        if(this.state.hasError){
            return(
                <div style={{
                    height:"100vh",
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    flexDirection:"column",
                    gap:20
                }}>
                    <h1>Something went wrong.</h1>
                    <Button onClick={()=>location.reload()}>
                        Reload
                    </Button>
                </div>
            );
        }

        return this.props.children;
    }
}
