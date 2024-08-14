'use client'
import { AuthProvider } from "../../../context/AuthProvider"
import { OrderProvider } from "../../../context/OrderProvider"
import { Order } from "../../../modules/order"
export default function OrderPage() {
    return (
        <AuthProvider>
            <OrderProvider>
                <Order />
            </OrderProvider>
        </AuthProvider>
    )
}