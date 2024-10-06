import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import { Button, Rating, Stack, TextField, Typography } from '@mui/material';
import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import { useRateYourExp } from './useRateYourExp';
interface IRateExpDialog {
    handleClose: () => void
    open: boolean
    setButtonText: Dispatch<SetStateAction<String>>
    buttonText: String
    orderId?: string
}


export function RateExpDialog({ open, handleClose, setButtonText, buttonText, orderId }: IRateExpDialog) {
    const { alreadyReviewGiven, ratingData, setRatingData, handleSubmit, editReview } = useRateYourExp()

    const handleSubmitButton = useCallback(async () => {
        if (buttonText === "Rate your experience") {
            const resp = handleSubmit(orderId?orderId:"")
            if (await resp) {
                setButtonText("Edit Review")
                handleClose()
            }
        }
        else if(buttonText==="Edit Review"){
            const resp = editReview(orderId?orderId:"",ratingData)
            if (await resp) {
                handleClose()
            }
        }
    }, [orderId, ratingData])

    useEffect(() => {
        if (buttonText === "Edit Review")
            alreadyReviewGiven(orderId?orderId:"")
    }, [])

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <Stack sx={{
                    padding: "50px 70px"
                }}>
                    <Typography textAlign={"center"} variant='h4'>
                        RATE US
                    </Typography>
                    <Typography textAlign={"center"} variant='h4'>
                        Tell us your experience
                    </Typography>
                    <Stack direction={"row"} justifyContent={"center"} pt={"30px"}>
                        <Rating name="half-rating" defaultValue={0} precision={0.5} value={ratingData.value} size='large'
                            onChange={(event, newValue) => {
                                setRatingData(prevData => ({
                                    ...prevData,
                                    value: newValue
                                }));
                            }} />
                    </Stack>
                    <Stack direction={"row"} justifyContent={"center"} gap={"30px"} pt={"30px"} pl={"50px"}>
                        <Typography variant='h6'>Review:</Typography>
                        <TextField sx={{
                            width: "300px",
                            borderRadius: "5px",
                            border: "2px solid black"
                        }} multiline rows={4} value={ratingData.review} onChange={(e) => {
                            setRatingData(prevData => ({
                                ...prevData,
                                review: e.target.value
                            }))
                        }}></TextField>
                    </Stack>
                    <Stack direction={"row"} justifyContent={"center"} gap={"30px"} pt={"30px"} pl={"150px"}>
                        <Button variant='contained' sx={{
                            textTransform: "none",
                        }} onClick={handleClose}>Skip</Button>
                        <Button variant='contained' sx={{
                            textTransform: "none",
                            background: "green",
                            ":hover": {
                                backgroundColor: "green"
                            }
                        }} onClick={() => handleSubmitButton()}>Submit</Button>
                    </Stack>
                </Stack>
            </Dialog>
        </>
    );
}