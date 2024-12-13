'use client'
import {  useRouter, useSearchParams } from "next/navigation"
import { AuthProvider } from "../../../context/AuthProvider"
import { OrderProvider } from "../../../context/OrderProvider"
import { Order } from "../../../modules/order"
import { useState, useEffect, Suspense } from "react"
export default function OrderPage() {
    return (
        <AuthProvider>
            <OrderProvider>
                <Order />
            </OrderProvider>
        </AuthProvider>
    )
}