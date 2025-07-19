import { Layout } from "@/components"
import {BrowserRouter,Routes, Route} from "react-router-dom"
import * as Pages from "@/pages"
import { PrivateRoute } from "./privateRoute"

export const AppRouter: React.FC = () => {
  
    return <BrowserRouter>
    <Routes>
        <Route path="/" element={<Layout/>}>

        <Route index element={<Pages.Front.Home/>}/>

        <Route path="category/:id" element={<Pages.Front.Category/>}/>

        <Route path="brand/:id" element={<Pages.Front.Brand/>}/>
        
        <Route path="product/:id" element={<Pages.Front.Product/>}/>

        <Route path="register" element={<Pages.Auth.Register/>}/>

        <Route path="login" element={<Pages.Auth.Login/>}/>

        {/* <Route path="checkout" element={<PrivateRoute element = {<Pages.Front.Checkout/>}/>}/> */}

        
        </Route>
       </Routes>
    </BrowserRouter>


}