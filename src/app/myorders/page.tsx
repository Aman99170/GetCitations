'use client'
import { useRouter } from "next/navigation";
import { AuthProvider } from "../../../context/AuthProvider";
import { MyOrders } from "../../../modules/myOrders";
import { useAuthContext } from "../../../context/AuthContext";
import { useEffect } from "react";

export default function MyOrdersPage(){
    const router = useRouter()
    const{isLoggedIn} = useAuthContext()
    useEffect(()=>{
            if(!isLoggedIn){
                router.push(`/`);
            }else{
                router.push("/profile")
            }
        },[isLoggedIn])
    return(
       <AuthProvider>
        <MyOrders/>
        </AuthProvider>
    )
}