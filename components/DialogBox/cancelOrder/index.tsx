import { Button, Dialog, Stack, Typography } from "@mui/material";
import { useCallback } from "react";
import { useMyOrders } from "../../../modules/myOrders/useMyOrders";
import { IOrder } from "../../../modules/myOrders/type";

interface ICancelOrder{
    handleClose: () => void
    open:boolean
    order: IOrder
    reFetch: (filters?: {}) => Promise<void>
}

export function CancelOrder({open,handleClose,reFetch,order}:ICancelOrder){

    const {deleteOrder} = useMyOrders()

    const handleNo = useCallback(()=>{
        handleClose()
    },[])

    const handleCancelOrder = useCallback(()=>{
        deleteOrder(order._id,handleClose)
        setTimeout(reFetch,1000)
    },[order])

    return(
        <Dialog
        open={open}
        onClose={handleClose}
      >
        <Stack sx={{
            padding:"50px 70px"
        }}>
            <Typography textAlign={"center"} variant='h4'>
                Are you sure you want to cancel this order?
            </Typography>
            <Stack direction={"row"} justifyContent={"center"} gap={"30px"} pt={"30px"}>
                <Button variant='contained' sx={{
                    textTransform:"none",
                    color:"black"
                }} onClick={handleNo}>No</Button>
                <Button variant='contained' sx={{
                    textTransform:"none",
                    color:"black"
                }}
                onClick={handleCancelOrder}
                >Cancel Order</Button>
            </Stack>
        </Stack>
      </Dialog>
    )
}