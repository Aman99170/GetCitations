'use client'
import { AuthProvider } from "../../../context/AuthProvider"
import { Pricing } from "../../../modules/pricing"
export default function PricingPage() {
    return (
        <AuthProvider>
            <Pricing />
        </AuthProvider>
    )
}