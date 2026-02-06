import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Products from "./pages/Products";
import RawMaterials from "./pages/RawMaterials";
import ProductMaterials from "./pages/ProductMaterials";
import ProductionSuggestion from "./pages/ProductionSuggestion";

function App(){
    return(
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Products/>}/>
                    <Route path="/products" element={<Products/>}/>
                    <Route path="/raw-materials" element={<RawMaterials/>}/>
                    <Route path="/associate" element={<ProductMaterials/>}/>
                    <Route path="/production" element={<ProductionSuggestion/>}/>
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
