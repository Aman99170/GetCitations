import { useCallback, useMemo, useState } from "react";
import { IOrder } from "./type";
import { IformData } from "../../components/DialogBox/editOrder";

export const useMyOrders = ()=>{
    const storage = useMemo(() => {
        if (typeof window !== 'undefined')
            return (
                localStorage.getItem('user')
            )
        return null
    }, [])
    const [orders, setOrders] = useState<IOrder[]>()

    const getMyOrders = useCallback(async (filters={}) => {
        try {
            const queryParams = new URLSearchParams(filters)
            let res = null;
            if (queryParams !== null) {
                res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/myOrders?${queryParams}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `${storage}`,
                        'Content-Type': 'application/json',
                    }
                })
            }
            else {
                res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/myOrders`, {
                    method: 'GET',
                    headers: {
                        Authorization: `${storage}`,
                        'Content-Type': 'application/json',
                    }
                })
            }
            if (res.status === 200) {
                setOrders(await res.json())
            }
        } catch (error) {
            console.error(error)
        }
    }, [])

    const updateOrders = useCallback(async(orderId:String,editedOrderDetails:IformData,handleClose: () => void)=>{
        try{
            let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/updateOrder/${orderId}`,{
                method:'PUT',
                body: JSON.stringify(editedOrderDetails),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if(res.status===200){
                handleClose()
            }
        }catch(error){
            console.error(error)
        }
    },[])

    const deleteOrder = useCallback(async(orderId:String,handleClose: () => void)=>{
        try{
            let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/deleteOrder/${orderId}`,{
                method:'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if(res.status===200){
                handleClose()
            }
        }catch(error){
            console.error(error)
        }
    },[])

    return{
        orders,
        setOrders,
        getMyOrders,
        updateOrders,
        deleteOrder
    }
}