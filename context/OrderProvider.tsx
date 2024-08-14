'use client'
import { PropsWithChildren, useCallback, useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { IOrderContext, OrderContext } from "./OrderContext"
import { useAuthContext } from "./AuthContext"

export function OrderProvider ({children}:PropsWithChildren){
    const router = useRouter()
    const {userInfo} = useAuthContext()
    const searchParam = useSearchParams()
    const numOfCitation = Number(searchParam.get('numofCitation'))
    const rate = Number(searchParam.get('rate'))
    const [formData, setFormData] = useState({
        paperName:'',
        paperLink: '',
        paperDoi: ''
    });
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };



    const handleSubmit = useCallback(async(e:any)=>{
        e.preventDefault()
        const payload ={
            paperName:formData.paperName,
            paperLink:formData.paperLink,
            paperDoi:formData.paperDoi,
            orderedBy:userInfo._id,
            numofCitation:numOfCitation,
            amount:rate,
            transactionStatus:"Initiated"
        }
        try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order`,{
                method:'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if(res.status===200){
                const data = await res.json()
                router.replace(`/payment/${data._id}`)
            }
        }catch(err){
            console.error(err)
        }
    },[formData,userInfo,router])

    const contextValue: IOrderContext = useMemo(() => ({
        handleChange,
        handleSubmit,
        numOfCitation,
        formData,
        rate
    }), [handleChange,handleSubmit,numOfCitation,formData,rate])

    return(
        <OrderContext.Provider value={contextValue}>
            {children}
        </OrderContext.Provider>
    )
}