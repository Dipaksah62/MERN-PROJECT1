import { Layout } from "@/components"
import * as Pages from "@/pages"
import {BrowserRouter,Routes, Route, Outlet} from "react-router-dom"
import { PrivateRoute } from "./privateRoute"
import { AdminRoute } from "./AdminRoute"
import { StaffRoute } from "./StaffRoute"

export const AppRouter: React.FC = () => {
  
    return <BrowserRouter>
    <Routes>
        <Route path="/" element={<Layout/>}>
        <Route index element = {<PrivateRoute element={<Pages.Dashboard.Home/>}/>}/>

        <Route path="profile/edit" element = {<PrivateRoute element={<Pages.Profile.Edit/>}/>}/>

        <Route path="profile/password" element = {<PrivateRoute element={<Pages.Profile.Password/>}/>}/>

        <Route path="reviews" element = {<PrivateRoute element={<Pages.Reviews.List/>}/>}/>

        <Route path="orders" element = {<PrivateRoute element={<Pages.Orders.List/>}/>}/>

        <Route path="staffs" element={<PrivateRoute element={<AdminRoute element={<Outlet/>}/>}/>}>
           <Route index element={<Pages.Staffs.List/>}/>
           <Route path="create" element={<Pages.Staffs.Create/>}/>
           <Route path=":id" element={<Pages.Staffs.Edit/>}/>
        </Route>

        {/* <Route path="customers" element={<PrivateRoute element={<Outlet/>}/>}>
           <Route index element={<Pages.Customers.List/>}/>
           <Route path="create" element={<Pages.Customers.Create/>}/>
           <Route path=":id" element={<Pages.Customers.Edit/>}/>
        </Route> */}

         <Route path="customers" element={<PrivateRoute element={<StaffRoute element={<Outlet/>}/>}/>}>
           <Route index element={<Pages.Customers.List/>}/>
           <Route path="create" element={<Pages.Customers.Create/>}/>
           <Route path=":id" element={<Pages.Customers.Edit/>}/>
         </Route>

        {/* <Route path="categories" element={<PrivateRoute element={<Outlet/>}/>}>
           <Route index element={<Pages.Categories.List/>}/>
           <Route path="create" element={<Pages.Categories.Create/>}/>
           <Route path=":id" element={<Pages.Categories.Edit/>}/>
        </Route> */}

         <Route path="categories" element={<PrivateRoute element={<StaffRoute element={<Outlet/>}/>}/>}>
           <Route index element={<Pages.Categories.List/>}/>
           <Route path="create" element={<Pages.Categories.Create/>}/>
           <Route path=":id" element={<Pages.Categories.Edit/>}/>
         </Route>

        
        {/* <Route path="brands" element={<PrivateRoute element={<Outlet/>}/>}>
           <Route index element={<Pages.Brands.List/>}/>
           <Route path="create" element={<Pages.Brands.Create/>}/>
           <Route path=":id" element={<Pages.Brands.Edit/>}/>
        </Route> */}

         <Route path="brands" element={<PrivateRoute element={<StaffRoute element={<Outlet/>}/>}/>}>
           <Route index element={<Pages.Brands.List/>}/>
           <Route path="create" element={<Pages.Brands.Create/>}/>
           <Route path=":id" element={<Pages.Brands.Edit/>}/>
         </Route>

         <Route path="products" element={<PrivateRoute element={<Outlet/>}/>}>
           <Route index element={<Pages.Products.List/>}/>
           <Route path="create" element={<Pages.Products.Create/>}/>
           <Route path=":id" element={<Pages.Products.Edit/>}/>

   
        </Route>

        

        
      <Route path="login" element = {<Pages.Auth.Login/>}/>
        
        </Route>
    </Routes>
    </BrowserRouter>


}