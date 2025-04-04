'use client'
import { useEffect } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import { AuthProvider } from "../../../context/AuthProvider";
import { ProfilePage } from "../../../modules/profile";
import { useRouter } from "next/navigation";

export default function Profile() {
    const router = useRouter()
    const{isLoggedIn} = useAuthContext()
    useEffect(()=>{
            if(!isLoggedIn){
                router.push(`/`);
            }else{
                router.push("/profile")
            }
        },[isLoggedIn])
    return (
        <AuthProvider>
            <ProfilePage />
        </AuthProvider>
    )
}