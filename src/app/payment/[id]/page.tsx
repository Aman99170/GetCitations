'use client'

import { useParams, useRouter } from "next/navigation"
import { AuthProvider } from "../../../../context/AuthProvider"
import { Payment } from "../../../../modules/payment"
import { useState, useEffect } from "react"

export default function PaymentPage() {
    const router = useRouter()
    const params = useParams<{ id: string }>()
    const [userType, setUserType] = useState<String | null>()
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const userType = localStorage.getItem('userType');
            setUserType(userType);
        }
    }, []);
    useEffect(()=>{
        if(userType===null || userType!="Researcher"){
            router.push("/");
        }else{
            router.push(`/payment/${params.id}`)
        }
    },[userType])
    return (
        <AuthProvider>
            <Payment />
        </AuthProvider>
    )
}