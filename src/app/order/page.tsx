'use client'
import {  useRouter, useSearchParams } from "next/navigation"
import { AuthProvider } from "../../../context/AuthProvider"
import { OrderProvider } from "../../../context/OrderProvider"
import { Order } from "../../../modules/order"
import { useState, useEffect } from "react"
export default function OrderPage() {
    const searchParams = useSearchParams()
    const numOfCitation = searchParams.get('numofCitation')
    const rate = searchParams.get('rate')
    const router = useRouter()
    const [userType, setUserType] = useState<String | null>()
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const userType = localStorage.getItem('userType');
            setUserType(userType);
        }
    },[]);
    useEffect(()=>{
        if(userType===null || userType!="Researcher"){
            router.push("/");
        }else{
            router.push(`/order?numofCitation=${numOfCitation}&rate=${rate}`)
        }
    },[userType])
    return (
        <AuthProvider>
            <OrderProvider>
                <Order />
            </OrderProvider>
        </AuthProvider>
    )
}