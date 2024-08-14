import { createContext, useContext } from 'react'

export interface IOrderContext {
    handleSubmit: (e: any) => void,
    handleChange: (e: any) => void,
    formData: {
        paperName: string;
        paperLink: string;
        paperDoi: string;
    },
    numOfCitation: number,
    rate: number
}

const initialContext: IOrderContext = {
    handleChange:(e:any)=>{e.target},
    handleSubmit:(e:any)=>{e.target},
    numOfCitation:0,
    rate:0,
    formData:{
        paperName: "",
        paperLink: "",
        paperDoi: ""
    }
}

export const OrderContext = createContext<IOrderContext>(initialContext)
export const useOrderContext = () => useContext(OrderContext)