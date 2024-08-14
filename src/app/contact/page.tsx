'use client'
import { AuthProvider } from "../../../context/AuthProvider";
import { ContactPage } from "../../../modules/contact";

export default function Contact() {
    return (
        <AuthProvider>
            <ContactPage />
        </AuthProvider>
    )
}