'use client'
import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthProvider } from "../../context/AuthProvider";
import { PaypalContent } from "../paypalContent";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { IOrder } from "../myOrders/type";
import { useParams } from "next/navigation";

export interface IOrderDetails {
    orderDetails: {
        _id: string,
        orderNumber: String,
        paperName: String,
        paperLink: String,
        paperDoi: String,
        orderedBy: String,
        orderStatus: String,
        orderedAt: Date,
        numofCitation: Number,
        amount: Number,
        transactionStatus: String
    }
}

export function Paypal({ orderDetails }: IOrderDetails) {
    const [paypalClientId, setPaypalClientId] = useState<string>("")
    const [clientSideOrderDetails,setClientSideOrderDetails] = useState<IOrder>(orderDetails)
    const params = useParams()

    useEffect(() => {
        const fetchRecentOrder = async() =>{
        try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/myRecentOrder/${params.id}`)
            if(res.status===200){
              setClientSideOrderDetails(await res.json())
            }
          }catch(error){
              console.error(error)
          }
        }
        if(orderDetails){
            fetchRecentOrder()
        }
      }, [orderDetails,params]);

    const getClientId = useCallback(async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getPaypalClientId`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            if (res.status === 200) {
                setPaypalClientId(await res.text())
            }
        } catch (error) {
            console.error(error)
        }
    }, [])

    useEffect(() => {
        getClientId()
    }, [paypalClientId])


    const initialOptions = useMemo(()=>{
        return({
        clientId: paypalClientId,
        currency: "USD",
        intent: "capture"})
    },[paypalClientId]);

    return (
        <>
            <AuthProvider>
                {paypalClientId &&
                    <PayPalScriptProvider options={initialOptions}>
                        <PaypalContent orderDetails={clientSideOrderDetails} setClientSideOrderDetails={setClientSideOrderDetails}/>
                    </PayPalScriptProvider>
                }
            </AuthProvider>
        </>
    )
}



