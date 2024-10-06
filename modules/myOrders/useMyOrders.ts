import { useCallback, useMemo, useState } from "react";
import { IBidDetails, IOrder } from "./type";
import { IformData } from "../../components/DialogBox/editOrder";
import { useAuthContext } from "../../context/AuthContext";

export const useMyOrders = ()=>{
    const storage = useMemo(() => {
        if (typeof window !== 'undefined')
            return (
                localStorage.getItem('user')
            )
        return null
    }, [])
    const [orders, setOrders] = useState<IOrder[]>()
    const [bids,setBids] = useState<IBidDetails[]>()
    const {userInfo} = useAuthContext()

    const getBids = useCallback(async(filters={})=>{
        try{
            const queryParams = new URLSearchParams(filters)
                const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL_FREELANCER}/fetchAllBids/${userInfo._id}?${queryParams}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${storage}`,
                        'Content-Type': 'application/json',
                    }
                })
            if(resp.status===200){
                setBids(await resp.json())
            }
        }catch (error) {
            console.error(error)
        }
    },[userInfo])

    const getMyOrders = useCallback(async (filters={}) => {
        try {
            const queryParams = new URLSearchParams(filters)
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/myOrders?${queryParams}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `${storage}`,
                        'Content-Type': 'application/json',
                    }
                })

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
        bids,
        setBids,
        getBids,
        setOrders,
        getMyOrders,
        updateOrders,
        deleteOrder
    }
}