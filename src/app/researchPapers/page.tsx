'use client'
import { useState, useEffect } from "react";
import { AuthProvider } from "../../../context/AuthProvider";
import { ResearchPapers } from "../../../modules/researchPapers";
import { useRouter } from "next/navigation";

export default function researchPapers() {
    const router = useRouter()
    const [userType, setUserType] = useState<String | null>()
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const userType = localStorage.getItem('userType');
            setUserType(userType);
        }
    }, []);
    useEffect(()=>{
        if(userType===null || userType!="Freelancer"){
            router.push(`/userType=${userType}`);
        }else{
            router.push("/researchPapers")
        }
    },[userType])
    return (
        <>
        <AuthProvider>
            <ResearchPapers />
        </AuthProvider>
        </>
    )
}