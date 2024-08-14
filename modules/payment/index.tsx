import { Box, Button, Card, CardActionArea, CardContent, CardMedia, FormControlLabel, Radio, RadioGroup, Stack, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { useState } from "react";

export function Payment() {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<String>('');
    const params = useParams<{ id: string }>()

    const handlePaymentMethodChange = (event: any) => {
        setSelectedPaymentMethod(event.target.value);
    };
    return (
        <>
            <Stack direction={"row"} justifyContent={"center"} pb={"100px"} pt={"20px"}>
                <Typography textAlign={"center"} variant="h3">Choose a payment method</Typography>
                <Typography pt={"26px"}>(Choose one of the option below)</Typography>
            </Stack>
            <RadioGroup value={selectedPaymentMethod} onChange={handlePaymentMethodChange}>
                <Stack direction={"row"} justifyContent={"center"}>
                    <FormControlLabel value="creditcard" control={<Radio />} label={<><Card sx={{ width: "300px" }}>
                        <CardMedia component={"img"} image="/assets/icons/creditcard.jpg" height={"100px"} ></CardMedia>
                    </Card><Typography textAlign={"center"}>Pay with credit card</Typography></>} />
                    <FormControlLabel value="paypal" control={<Radio />} label={<><Card sx={{ width: "300px" }}>
                        <CardMedia component={"img"} image="/assets/icons/paypal.jpg" height={"100px"} ></CardMedia>
                    </Card><Typography textAlign={"center"}>Pay with paypal</Typography></>} />
                    <FormControlLabel value="cryptocurrency" control={<Radio />} label={<><Card sx={{ width: "300px" }}>
                        <CardMedia component={"img"} image="/assets/icons/cryptocurrency.jpg" height={"100px"} ></CardMedia>
                    </Card><Typography textAlign={"center"}>Pay with cryptocurrency</Typography></>} />
                </Stack>
            </RadioGroup>
            <Typography pt={"100px"} textAlign={"center"}>Click on the continue button to complete your payment.</Typography>
            <Stack direction={"row"} justifyContent={"center"} pt={"20px"} pb={"20px"}>
                <Button variant="contained" href={`/payments/${params.id}/${selectedPaymentMethod}`}>Continue</Button>
            </Stack>
        </>
    )
}