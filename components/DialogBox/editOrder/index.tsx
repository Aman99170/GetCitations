import { Button, Dialog, Stack, TextField, Typography } from "@mui/material"
import { IOrder } from "../../../modules/myOrders/type"
import { useCallback, useState } from "react";
import { useMyOrders } from "../../../modules/myOrders/useMyOrders";

interface IEditOrder {
    open: boolean,
    handleClose: () => void
    order?: IOrder
    reFetch?: (filters?: {}) => Promise<void>
}

export interface IformData{
    paperName: String,
    paperLink: String,
    paperDoi: String
}

export function EditOrder({ open, handleClose, order,reFetch }: IEditOrder) {
    const [formData, setFormData] = useState<IformData>({
        paperName: order?order.paperName:"",
        paperLink: order?order.paperLink:"",
        paperDoi: order?order.paperDoi:""
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const {updateOrders} = useMyOrders()

    const handleCloseButton = useCallback(()=>{
        handleClose()
    },[])

    const handleEditButton = useCallback(()=>{
        updateOrders(order?order._id:"",formData,handleClose)
        setTimeout(reFetch?reFetch:"",1000)
    },[order,formData])

    return (
        <Dialog open={open} onClose={handleClose}>
            <Stack sx={{
                padding: "50px 100px 50px 100px"
            }}>
                <Typography textAlign={"center"} variant="h4" paddingBottom={"60px"}>Edit Order Details</Typography>
                <Stack gap={"20px"}>
                    <Stack direction={"row"} justifyContent={"center"}>
                        <Typography sx={{
                            width:"200px",
                            paddingTop:"15px"
                        }}>Paper Name:</Typography>
                        <TextField
                            variant="outlined"
                            name="paperName"
                            value={formData.paperName}
                            onChange={handleChange}
                            fullWidth
                            required
                            sx={{ borderRadius: 20 }}
                        />
                    </Stack>
                    <Stack direction={"row"} justifyContent={"center"}>
                        <Typography sx={{
                            width:"200px",
                            paddingTop:"15px"
                        }}>Paper Link:</Typography>
                        <TextField
                            variant="outlined"
                            name="paperLink"
                            value={formData.paperLink}
                            onChange={handleChange}
                            fullWidth
                            required
                            sx={{ borderRadius: 20 }}
                        />
                    </Stack>
                    <Stack direction={"row"} justifyContent={"center"}>
                        <Typography sx={{
                            width:"200px",
                            paddingTop:"15px"
                        }}>Paper Doi:</Typography>
                        <TextField
                            variant="outlined"
                            name="paperDoi"
                            value={formData.paperDoi}
                            onChange={handleChange}
                            fullWidth
                            required
                            sx={{ borderRadius: 20 }}
                        />
                    </Stack>
                    <Stack direction={"row"} justifyContent={"space-evenly"} paddingTop={"40px"}>
                    <Button variant="outlined" onClick={handleCloseButton}>Cancel</Button>
                    <Button variant="contained" onClick={handleEditButton}>Edit Details</Button>
                </Stack>
                </Stack>
            </Stack>
        </Dialog>
    )
}