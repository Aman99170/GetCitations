'use client'

import { AuthProvider } from "../../../../context/AuthProvider"
import { Payment } from "../../../../modules/payment"

export default function PaymentPage() {
    return (
        <AuthProvider>
            <Payment />
        </AuthProvider>
    )
}