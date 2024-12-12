'use client'
import { useRouter } from "next/navigation"
import { AuthProvider } from "../../../context/AuthProvider"
import { Pricing } from "../../../modules/pricing"
import { useState, useEffect } from "react"
export default function PricingPage() {
    const router = useRouter()
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
            router.push("/pricing")
        }
    },[userType])
    return (
        <AuthProvider>
            <Pricing />
        </AuthProvider>
    )
}