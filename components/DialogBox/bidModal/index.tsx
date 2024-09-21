import { Box, Button, Dialog, Grid, Stack, TextField, Typography } from "@mui/material"
import { IOrder } from "../../../modules/researchPapers/type"
import { useCallback, useEffect, useMemo, useState } from "react";
import { useBidModal } from "./useBidModal";
import { useAuthContext } from "../../../context/AuthContext";
import { QuantityInput } from "./quantityInput";
import { IBid } from "./type";

interface IBidModal {
    open: boolean,
    handleClose: () => void,
    allRP: IOrder
}

export function BidModal({ open, handleClose, allRP }: IBidModal) {
    const { biddingDetails, createBid, fetchBidDetailsOnThisReport } = useBidModal()
    const { userInfo } = useAuthContext()
    const [storage, setStorage] = useState<String | null>(null)
    const [startDate, setStartDate] = useState<string>()
    const [biddingAmount, setBiddingAmount] = useState<number | null>(0)
    const lowestBid: IBid | undefined = useMemo(() => {
        let lowest: IBid
        if (biddingDetails) {
            biddingDetails?.loggedInUser[0]?.bidAmount < biddingDetails?.someOneElseUser[0]?.bidAmount ?
                lowest = biddingDetails.loggedInUser[0] :
                lowest = biddingDetails.someOneElseUser[0]
            return lowest
        }
    }, [biddingDetails,allRP,biddingAmount])
    console.log(lowestBid)
    const isLowestBidUserLoggeUser = useMemo(()=>{
        if(lowestBid?.userDetails?._id === biddingDetails?.loggedInUser[0]?.userDetails._id)
          return true 
        else
          return false
    },[biddingDetails])
    const endDate = useMemo(() => {
        let start
        let endDate
        if (startDate) {
            start = new Date(startDate);
            endDate = new Date(start?.getTime() + 24 * 60 * 60 * 1000);
        }
        return endDate?.toISOString();
    }, [startDate])

    useEffect(() => {
        setStartDate(biddingDetails?.startingDate)
    }, [biddingDetails])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const user = localStorage.getItem('user');
            setStorage(user)
        }
    }, [])

    useEffect(() => {
        if (storage !== null) {
            fetchBidDetailsOnThisReport(allRP._id, parseInt(userInfo._id), storage)
        }
    }, [storage])

    const handleCreateBid = useCallback(() => {
        let resp
        if (storage && biddingAmount) {
            resp = createBid(allRP, storage, biddingAmount)
        }
        if (resp) {
            handleClose()
        }
    }, [allRP, biddingAmount])
    return (
        <Dialog open={open} onClose={handleClose}>
            <Typography variant="h4" textAlign={"center"} pb={"20px"} pt={"10px"}>
                Auction Details
            </Typography>
            {startDate &&
                <Typography variant="body1" pl={"20px"} >
                    <strong>Starting Date:</strong> {new Date(startDate).toLocaleString()}
                </Typography>
            }
            {endDate &&
                <Typography variant="body1" pl={"20px"}>
                    <strong>End Date:</strong> {new Date(endDate).toLocaleString()}
                </Typography>
            }
            <Grid container spacing={"20px"} sx={{
                padding: "30px 20px 30px 20px"
                , width: "600px"
            }}>
                <Grid item xs={6}>
                    {biddingDetails && biddingDetails?.loggedInUser?.length > 0 ? biddingDetails?.loggedInUser?.map((loggedUser, index) => (
                        <Box key={index}>
                            <Typography><strong>Your Bid:</strong> {loggedUser.bidAmount}$</Typography>
                            <Typography><strong>Placed On:</strong>{new Date(loggedUser.bidAt).toLocaleString()}</Typography>
                        
                        {!isLowestBidUserLoggeUser &&
                            <Stack justifyContent={"center"} direction={"row"} gap={"3px"}>
                            <Button variant="contained" sx={{
                                textTransform: "none",
                                background: "#6DC893",
                                mt: "20px",
                                ":hover": {
                                    background: "#6DC893"
                                }
                            }}
                                onClick={() => handleCreateBid()}
                            >Bid Now</Button>
                            <Box sx={{
                                mt: "20px"
                            }}>
                                <QuantityInput biddingAmount={biddingAmount} setBiddingAmount={setBiddingAmount} maximumBid={lowestBid ? lowestBid.bidAmount-1 : Number(allRP.numofCitation) * 2.5} />
                            </Box>
                        </Stack>
                        }
                        </Box>
                    )) :
                        <Box>
                            <Typography variant="h5">You have not bidded for this paper yet.</Typography>
                            <Stack justifyContent={"center"} direction={"row"} gap={"3px"}>
                                <Button variant="contained" sx={{
                                    textTransform: "none",
                                    background: "#6DC893",
                                    mt: "20px",
                                    ":hover": {
                                        background: "#6DC893"
                                    }
                                }}
                                    onClick={() => handleCreateBid()}
                                >Bid Now</Button>
                                <Box sx={{
                                    mt: "20px"
                                }}>
                                    <QuantityInput biddingAmount={biddingAmount} setBiddingAmount={setBiddingAmount} maximumBid={lowestBid ? lowestBid.bidAmount-1 :Number(allRP.numofCitation) * 2.5} />
                                </Box>
                            </Stack>
                        </Box>
                    }
                </Grid>
                <Grid item xs={6}>
                    {lowestBid ? 
                        <Box>
                            <Typography><strong>Lowest Bid: </strong>{lowestBid?.bidAmount}$</Typography>
                            {lowestBid &&
                                <Typography><strong>Placed On:</strong>{new Date(lowestBid?.bidAt).toLocaleString()}</Typography>
                            }
                            <Typography><strong>By: </strong> {lowestBid?.userDetails.firstName}{lowestBid?.userDetails.lastName} </Typography>

                        </Box>
                     : <Typography variant="h5">No one has bidded for this paper yet.</Typography>}
                </Grid>
            </Grid>
            <Typography pl={"20px"}>Maximum Amount to be bid for this paper is : {Number(allRP.numofCitation) * 2.5}</Typography>
        </Dialog>
    )
}