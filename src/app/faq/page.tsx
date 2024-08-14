'use client'
import { AuthProvider } from "../../../context/AuthProvider";
import { Faq } from "../../../modules/faq";

export default function faq() {
    return (
        <AuthProvider>
            <Faq />
        </AuthProvider>
    )
}