import { Paypal } from "../../../../../modules/paypal";



export default async function PaymentGateway({params:{id,slug}}:{params:{id:string,slug:string}}) {

    async function getOrderDetails(){
        try{
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/myRecentOrder/${id}`)
          if(res.status===200){
            return res.json()
          }
        }catch(error){
            console.error(error)
        }
    }
    const orderDetails = await getOrderDetails()
    return (
            <>
            {slug === "paypal" && <Paypal orderDetails={orderDetails} />}
            </>
    )
}