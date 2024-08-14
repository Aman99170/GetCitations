'use client'
import { AuthProvider } from "../../../context/AuthProvider"
import { GetStarted } from "../../../modules/getstarted"
export default function PricingPage() {
    return (
        <AuthProvider>
            <GetStarted />
        </AuthProvider>
    )
}