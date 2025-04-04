'use client'
import { AuthProvider } from "../../../context/AuthProvider";
import { ProfilePage } from "../../../modules/profile";

export default function Profile() {
    
    return (
        <AuthProvider>
            <ProfilePage />
        </AuthProvider>
    )
}