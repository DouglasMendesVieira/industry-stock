import { useEffect, useState } from "react";
import { api } from "../api/api";
import page from "../styles/pageStyles";
import Skeleton from "../components/Skeleton";

export default function ProductionSuggestion(){

    const [data,setData] = useState(null);

    async function load(){
        const res = await api.get("/production-suggestion");
        setData(res.data);
    }

    useEffect(()=>{load()},[]);

    if(!data){
        return(
            <>
                <Skeleton height={40}/>
                <div style={{height:20}}/>
                <Skeleton height={80}/>
                <div style={{height:10}}/>
                <Skeleton height={80}/>
            </>
        );
    }

    return(
        <div>

            <h1 style={page.title}>Production Suggestion</h1>

            <div style={{marginBottom:20,fontSize:20}}>
                <b>Total Value:</b> $ {data.grandTotal}
            </div>

            {data.items.length === 0 && (
                <div style={page.card}>
                    No production possible with current stock.
                </div>
            )}

            {data.items.map((item,i)=>(
                <div key={i} style={{...page.card,marginBottom:12}}>
                    <b>{item.productName}</b>

                    <p>Quantity Possible: {item.quantityPossible}</p>
                    <p>Total Value: $ {item.totalValue}</p>
                </div>
            ))}

        </div>
    )
}
