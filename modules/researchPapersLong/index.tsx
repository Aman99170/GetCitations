import { Avatar, Button, Card, Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { IOrder } from "../researchPapers/type";
import { useState } from "react";
import { BidModal } from "../../components/DialogBox/bidModal";

export function ResearchPapersLong({ allRP }: { allRP: IOrder }) {

    const[openBidModal,setOpenBidModal]= useState<boolean>(false)
    const convertDateFormat = ((dateString: Date) => {
        const date = new Date(dateString);

        return String(date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear())
    })
    

    return (
        <>
        <Card
            sx={{
                backgroundColor: '#6DC893',

                margin: '1rem 0',
                overflow: 'visible',
                cursor: 'pointer',
                border: "2px solid black",
                borderRadius: "10px"

            }}
        >
            <Grid container gap={"50px"} sx={{
            }}>
                <Grid item xs={2} sx={{
                    pl: "47px",
                    pt: "42px",
                    background: "teal",
                    borderRadius: "10px 0px 0px 10px"
                }}>
                    <Avatar src="/assets/icons/user.svg" sx={{
                        height: 120,
                        width: 120
                    }} />
                </Grid>
                <Grid item xs={6}>
                    <Stack direction={"row"} gap={"10px"}>
                        <Typography variant="h6">Research Paper Name: </Typography>
                        <Typography variant="h6">{allRP.paperName}</Typography>
                    </Stack>
                    <Stack direction={"row"} gap={"10px"}>
                        <Typography variant="h6">Researcher Name: </Typography>
                        <Typography variant="h6">{allRP.userDetails.firstName} {allRP.userDetails.lastName}</Typography>
                    </Stack>
                    <Stack direction={"row"} gap={"10px"}>
                        <Typography variant="h6">Research Paper Link: </Typography>
                        <Typography variant="h6">
                            <Link href={encodeURI(allRP.paperLink.toString())} rel="noopener noreferrer" target="_blank">{allRP.paperLink}</Link>
                        </Typography>
                    </Stack>
                    <Stack direction={"row"} gap={"10px"}>
                        <Typography variant="h6">Research Paper DOI: </Typography>
                        <Typography variant="h6">{allRP.paperDoi}</Typography>
                    </Stack>
                    <Stack direction={"row"} gap={"10px"}>
                        <Typography variant="h6">Posted On: </Typography>
                        <Typography variant="h6">{convertDateFormat(allRP.orderedAt)}</Typography>
                    </Stack>
                    <Stack direction={"row"} gap={"10px"}>
                        <Typography variant="h6">Required Number of Citation: </Typography>
                        <Typography variant="h6">{allRP.numofCitation.toString()}</Typography>
                    </Stack>
                </Grid>
                <Grid item xs={3} sx={{
                    pt:"75px"
                }}>
                    <Button variant="contained" sx={{
                        textTransform:"none",
                        background:"teal",
                        ":hover":{
                            background:"teal"
                        }
                    }} onClick={()=>setOpenBidModal(true)}>Bid for this Reseach Paper</Button>
                </Grid>
            </Grid>

        </Card>
        {openBidModal && <BidModal open={openBidModal} handleClose={()=>setOpenBidModal(false)} allRP={allRP}/>}
        </>
    )
}