'use client'
import { AuthProvider } from "../../../context/AuthProvider";
import { MyOrders } from "../../../modules/myOrders";


export default function MyOrdersPage(){
    return(
       <AuthProvider>
        <MyOrders/>
        </AuthProvider>
    )
}