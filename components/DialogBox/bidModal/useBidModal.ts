import { useCallback, useEffect, useState } from "react"
import { IOrder } from "../../../modules/researchPapers/type"
import { IBidResponse, IUserDetails } from "./type";
import { useAuthContext } from "../../../context/AuthContext";

export const useBidModal = () => {

    const [biddingDetails, setBiddingDetails] = useState<IBidResponse>()
    const [winner,setWinner] = useState<IUserDetails>()
    const {userInfo}=useAuthContext()
    const [isLoggedInUserWon,setIsLoggedInUserWon]= useState<boolean>(false)


    useEffect(()=>{
        if(String(winner?._id)==userInfo._id){
            setIsLoggedInUserWon(true)
        }
    },[winner])


    const createBid = useCallback(async (BidDetails: IOrder, storage: String,amount:number,startDate:string | undefined,endDate:string | undefined) => {
        var current = new Date()
        const nextDate = new Date(current.getTime() + 86400000)
        const payload = {
            paperId: BidDetails._id,
            paperName: BidDetails.paperName,
            paperLink: BidDetails.paperLink,
            paperDoi: BidDetails.paperDoi,
            postedBy: BidDetails.orderedBy,
            numberOfCitation: BidDetails.numofCitation,
            postedOn: BidDetails.orderedAt,
            bidAmount: amount,
            bidStartDate:startDate ? startDate : new Date(),
            bidEndDate:endDate ? endDate : nextDate,
            bidBy: {
                _id: userInfo._id
            }
        }
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_FREELANCER}/createBid`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${storage}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)

            })
            if (res.status === 200) {
                return true
            }
        } catch (error) {
            console.error(error)
        }
        return false
    }, [])

    const fetchBidDetailsOnThisReport = useCallback(async (paperId: String, userId: Number, storage: String) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_FREELANCER}/fetchBidDetailsOnThisReport/${paperId}/${userId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${storage}`,
                    'Content-Type': 'application/json',
                }
            })
            if (res.status === 200) {
                setBiddingDetails(await res.json())
            }
        } catch (error) {
            console.error(error)
        }
    }, [])

    const fetchWinner = useCallback(async(paperId : String,storage: String)=>{
        try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_FREELANCER}/fetchWinner/${paperId}`,{
                method: "GET",
                headers: {
                    Authorization: `Bearer ${storage}`,
                    'Content-Type': 'application/json',
                }
            })
            if (res.status === 200) {
                setWinner(await res.json())
            }
        }catch (error) {
            console.error(error)
        }
    },[winner,setWinner])

    return {
        biddingDetails,
        winner,
        isLoggedInUserWon,
        setIsLoggedInUserWon,
        setWinner,
        fetchWinner,
        setBiddingDetails,
        createBid,
        fetchBidDetailsOnThisReport
    }
}