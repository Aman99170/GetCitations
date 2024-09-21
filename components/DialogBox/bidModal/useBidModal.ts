import { useCallback, useEffect, useState } from "react"
import { IOrder } from "../../../modules/researchPapers/type"
import { IBidResponse } from "./type";
import { useAuthContext } from "../../../context/AuthContext";

export const useBidModal = () => {

    const [biddingDetails, setBiddingDetails] = useState<IBidResponse>()
    const {userInfo}=useAuthContext()


    const createBid = useCallback(async (BidDetails: IOrder, storage: String,amount:number) => {
        const payload = {
            paperId: BidDetails._id,
            paperName: BidDetails.paperName,
            paperLink: BidDetails.paperLink,
            paperDoi: BidDetails.paperDoi,
            postedBy: BidDetails.orderedBy,
            numberOfCitation: BidDetails.numofCitation,
            postedOn: BidDetails.orderedAt,
            bidAmount: amount,
            bidBy: {
                _id: userInfo._id
            }
        }
        console.log(payload)
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

    return {
        biddingDetails,
        setBiddingDetails,
        createBid,
        fetchBidDetailsOnThisReport
    }
}