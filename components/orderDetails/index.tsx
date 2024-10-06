import { useCallback, useEffect, useState } from "react";
import { Button, Stack, TableCell, TableRow, styled, tableCellClasses } from "@mui/material";
import { IOrder } from "../../modules/myOrders/type";
import { EditOrder } from "../DialogBox/editOrder";
import { CancelOrder } from "../DialogBox/cancelOrder";
import { CancelDateExceed } from "../DialogBox/cancelDateExceed";
import Link from "next/link";
import { RateExpDialog } from "../DialogBox/rateYourExp";
import { useRateYourExp } from "../DialogBox/rateYourExp/useRateYourExp";

interface IOrderDetails{
    order?:IOrder
    reFetch?: (filters?: {}) => Promise<void> 

}


export function OrderDetails({ order, reFetch }: IOrderDetails) {
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false)
    const [cancelModalOpen, setCancelModalOpen] = useState<boolean>(false)
    const [cancelDateExceedModalOpen, setCancelDateExceedModalOpen] = useState<boolean>(false)
    const [openRateYourExp, setOpenRateYourExp] = useState<boolean>(false)
    const [buttonText, setButtonText] = useState<String>("Rate your experience");
    const { alreadyReviewGiven } = useRateYourExp()
    // const [open, setOpen] = useState(false);
    // const anchorRef = useRef<HTMLButtonElement>(null);

    // const handleToggle = () => {
    //     setOpen((prevOpen) => !prevOpen);
    //   };

    //   const handleClose = (event: Event | React.SyntheticEvent) => {
    //     if (
    //       anchorRef.current &&
    //       anchorRef.current.contains(event.target as HTMLElement)
    //     ) {
    //       return;
    //     }

    //     setOpen(false);
    //   };


    const EditOrderOpen = useCallback(() => {
        setEditModalOpen(true);
    }, []);

    const CancelOrderOpen = useCallback(() => {
        let orderedDate = convertDateFormat1(order ? order?.orderedAt : new Date())
        const today = convertDateFormat1(new Date())
        const orderDate1 = new Date(orderedDate)
        const todayDate = new Date(today)
        let Difference_In_Time = todayDate.getTime() - orderDate1.getTime();
        let Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));
        if (Difference_In_Days < 30) {
            setCancelModalOpen(true)
        }
        else {
            setCancelDateExceedModalOpen(true)
        }
    }, [order]);

    const convertDateFormat1 = ((dateString: Date) => {
        const date = new Date(dateString);

        return String((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear())
    })

    const convertDateFormat = ((dateString: Date) => {
        const date = new Date(dateString);

        return String(date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear())
    })

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 16,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const checkIfReviewAlreadyGiven = useCallback(async () => {
        const resp = alreadyReviewGiven(order ?order?._id:"")
        if (await resp) {
            setButtonText("Edit Review")
        }
    }, [order?._id])

    useEffect(() => {
        checkIfReviewAlreadyGiven()
    }, [order?._id])

    // const kebabOption = [
    //     {
    //         type: "ACTION",
    //         title: "Edit Order details",
    //         id: "01",
    //         action: EditOrderOpen
    //     },
    //     {
    //         type: "ACTION",
    // title: "Cancel Order",
    //         id: "01",
    //         action: CancelOrderOpen
    //     }

    // ];

    return (
        <>
            <StyledTableRow>
                <StyledTableCell sx={{ maxWidth: "150px", wordWrap: "break-word" }}>{order ?order.orderNumber :""}</StyledTableCell>
                <StyledTableCell>{convertDateFormat(order ?order?.orderedAt :new Date())}</StyledTableCell>
                <StyledTableCell sx={{
                    color: order?.orderStatus === "Success" ? "green" : "red"
                }}>{order?order.orderStatus:""}</StyledTableCell>
                <StyledTableCell sx={{ maxWidth: "180px", wordWrap: "break-word" }} >{order?order.paperName:""}</StyledTableCell>
                <StyledTableCell sx={{ maxWidth: "180px", wordWrap: "break-word" }} ><Link href={encodeURI(order?order.paperLink.toString():"")} rel="noopener noreferrer" target="_blank">{order?order.paperLink:""}</Link></StyledTableCell>
                <StyledTableCell sx={{ maxWidth: "175px", wordWrap: "break-word" }} >{order?order.paperDoi:""}</StyledTableCell>
                <StyledTableCell align="center">{String(order?order.numofCitation:"")}</StyledTableCell>
                <StyledTableCell align="center">{String(order?order.amount:"")}$</StyledTableCell>
                <StyledTableCell align="center" sx={{
                    color: order?.transactionStatus === "Successful" ? "green" : "red"
                }}>{order?order.transactionStatus:""}</StyledTableCell>
                <StyledTableCell>
                    {order?.orderStatus !== "Success" ?
                        <Stack gap={"10px"}>
                            <Button variant="outlined" sx={{
                                textTransform: "none",
                                color: "black",
                            }} onClick={EditOrderOpen}>Edit</Button>
                            <Button variant="contained" sx={{
                                textTransform: "none",
                                backgroundColor: "navy"
                            }} onClick={CancelOrderOpen}>Cancel</Button>

                        </Stack> :
                        <Stack direction={"row"} justifyContent={"center"}>
                            <Button variant="contained" sx={{
                                textTransform: "none",
                                backgroundColor: "navy",
                            }} onClick={() => setOpenRateYourExp(true)}>{buttonText}</Button>
                        </Stack>
                    }
                </StyledTableCell>

                {/* <TableCell><IconButton onClick={(e)=>{handleToggle()}} ref={anchorRef} ><MoreVertIcon /></IconButton></TableCell> */}
                {/* <VerticalMenuComponent
                open={open}
                setOpen={setOpen}
                handleClose={handleClose}
                anchorRef={anchorRef}
                kebabOption={kebabOption}
            /> */}
            </StyledTableRow>
            {editModalOpen && <EditOrder open={editModalOpen} handleClose={() => setEditModalOpen(false)} order={order} reFetch={reFetch} />}
            {cancelModalOpen && <CancelOrder open={cancelModalOpen} handleClose={() => setCancelModalOpen(false)} order={order} reFetch={reFetch} />}
            {cancelDateExceedModalOpen && <CancelDateExceed open={cancelDateExceedModalOpen} handleClose={() => setCancelDateExceedModalOpen(false)} />}
            {openRateYourExp && <RateExpDialog open={openRateYourExp} handleClose={() => setOpenRateYourExp(false)} setButtonText={setButtonText} buttonText={buttonText} orderId={order?._id} />}
        </>
    )
}