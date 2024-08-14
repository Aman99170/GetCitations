import { Stack, Typography, Box, Divider, Button } from "@mui/material";
import { useAuthContext } from "../../context/AuthContext";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { IOrder } from "../myOrders/type";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export function PaypalContent({ orderDetails, setClientSideOrderDetails }: { orderDetails: IOrder, setClientSideOrderDetails: Dispatch<SetStateAction<IOrder>> }) {
    const { userInfo } = useAuthContext()

    const updateOrders = useCallback(async (orderId: String, transactionStatus: String) => {
        try {
            const payload = { transactionStatus: transactionStatus }
            let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/updateOrder/${orderId}`, {
                method: 'PUT',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (res.status === 200) {
                const data = await res.json()
                setClientSideOrderDetails(data.finalUpdatedOrder)
            }
        } catch (error) {
            console.error(error)
        }
    }, [])

    const createOrder = async () => {
        try {
            let orderData = null
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-server/create-paypal-order`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    cart: [{ id: orderDetails._id, quantity: orderDetails.numofCitation, amount: orderDetails.amount }],
                }),
            });
            if (response.status === 201) {
                orderData = await response.json();
                updateOrders(orderDetails._id, "Successful")
            }

            if (!orderData.id) {
                const errorDetail = orderData.details[0];
                const errorMessage = errorDetail
                    ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                    : "Unexpected error occurred, please try again.";

                throw new Error(errorMessage);
            }

            return orderData.id;

        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    const onApprove = async (data: any) => {
        // Capture the funds from the transaction.
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-server/capture-paypal-order`, {
            method: "POST",
            body: JSON.stringify({
                orderID: data.orderID
            })
        });

        const details = await response.json();

        // Show success message to buyer
        alert(`Transaction completed by ${details.payer.name.given_name}`);
    }

    return (
        <Stack sx={{
            padding: "40px 90px 34px 90px"
        }}>
            <Typography variant="h4">ORDER {orderDetails?.orderNumber}</Typography>
            <Stack direction={"row"} gap={"40px"} paddingTop={"40px"}>
                <Box sx={{
                    border: "2px solid black",
                    padding: "20px 30px 20px 30px",
                    borderRadius: "10px"
                }}>
                    <Typography variant="h5">SHIPPING</Typography>
                    <Stack gap={"10px"} paddingTop={"10px"} paddingBottom={"10px"}>
                        <Typography>Name: {userInfo.firstName + " " + userInfo.lastName}</Typography>
                        <Typography>Email: {userInfo.email}</Typography>
                        <Typography>Phone: {userInfo.mobileNumber}</Typography>
                        <Box sx={{
                            width: "800px",
                            border: "1px solid black",
                            padding: "10px 20px",
                            background: "goldenrod",
                            borderRadius: "5px"
                        }}>
                            <Typography>{orderDetails.orderStatus}</Typography>
                        </Box>
                    </Stack>
                    <Divider sx={{ borderWidth: "2px" }} />
                    <Typography variant="h5" paddingTop={"10px"}>PAYMENT METHOD</Typography>
                    <Stack gap={"10px"} paddingTop={"10px"} paddingBottom={"10px"}>
                        <Typography>Method: Paypal</Typography>
                        <Box sx={{
                            width: "800px",
                            border: "1px solid black",
                            padding: "10px 20px",
                            background: orderDetails.transactionStatus === "Initiated" ? "goldenrod" : "seagreen",
                            borderRadius: "5px"
                        }}>
                            <Typography>{orderDetails.transactionStatus === "Initiated" ? "Not Paid" : "Successful"}</Typography>
                        </Box>
                    </Stack>
                    <Divider sx={{ borderWidth: "2px" }} />
                    <Typography variant="h5" paddingTop={"10px"}>ORDER ITEMS</Typography>
                    <Stack direction={"row"} justifyContent={"space-between"} padding={"10px 20px 10px 0px"}>
                        <Typography>1.  {orderDetails.paperName}</Typography>
                        <Typography>$ {String(orderDetails.amount)}</Typography>
                    </Stack>
                </Box>
                <Box>
                    <Box sx={{
                        border: "2px solid black",
                        padding: "20px 30px 20px 30px",
                        maxHeight: "150px",
                        borderRadius: "10px",
                    }}>
                        <PayPalButtons createOrder={createOrder} onApprove={onApprove} />

                    </Box>
                    {orderDetails.transactionStatus==='Successful' &&
                        <Box sx={{
                            padding: "30px 40px 30px 40px",
                            border: "2px solid black",
                            borderRadius: "10px",
                            marginTop: "68px"
                        }}>
                            <Stack direction={"row"} justifyContent={"center"}>
                                <CheckCircleOutlineIcon />
                            </Stack>
                            <Typography textAlign={"center"} color={"red"} variant="h4">Order Successful</Typography>
                            <Typography textAlign={"center"} variant="h5">Thank you so much for your order.</Typography>
                            <Stack direction={"row"} justifyContent={"center"}>
                                <Button href="/myorders" variant="contained" sx={{
                                    background: "seagreen",
                                    ":hover": {
                                        backgroundColor: "seagreen"
                                    }
                                }}>Check status</Button>
                            </Stack>
                        </Box>
                    }
                </Box>
            </Stack>
        </Stack >
    )
}