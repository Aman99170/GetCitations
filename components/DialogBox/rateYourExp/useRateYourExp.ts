import { useCallback, useState } from "react"
import { useAuthContext } from "../../../context/AuthContext"
import { useRouter } from "next/navigation"

export interface IReviewData {
    value: number | null
    review: String
}

export const useRateYourExp = ()=>{
    const router = useRouter()
    const { userInfo } = useAuthContext()
    const [ratingData, setRatingData] = useState<IReviewData>({
        value: 0,
        review: ""
    });

    const alreadyReviewGiven = useCallback(async (orderId:String) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/myReviewForAOrder/${orderId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            if(res.status === 401){
                alert('User session expired, logging out')
                router.push("/");
                localStorage.clear();
            }
            else if (res.status === 200) {
                const data = await res.json()
                if (data !== null) {
                    setRatingData({
                        value: data.ratingValue,
                        review: data.review
                    })
                    return true
                }
            }
        } catch (error) {
            console.error(error)
        }
    }, [])
    
    const handleSubmit = useCallback(async (orderId:String) => {
        const payload = {
            review: ratingData.review,
            ratingValue: ratingData.value,
            reviewedBy: userInfo._id,
            orderId: orderId
        }
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/review`, {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if(res.status === 401){
                alert('User session expired, logging out')
                router.push("/");
                localStorage.clear();
            }
            else if (res.status === 200) {
                return true
            }
        } catch (err) {
            console.error(err)
        }
    }, [ratingData])

    const editReview = useCallback(async(orderId:String,editedReviewDetails:IReviewData)=>{
        try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/editReview/${orderId}`,{
                method:'PUT',
                body: JSON.stringify(editedReviewDetails),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            if(res.status === 401){
                alert('User session expired, logging out')
                router.push("/");
                localStorage.clear();
            }
            else if(res.status===200){
                return true
            }
        }catch (err) {
            console.error(err)
        }
    },[])

    return{
        ratingData,
        setRatingData,
        alreadyReviewGiven,
        handleSubmit,
        editReview
    }
}