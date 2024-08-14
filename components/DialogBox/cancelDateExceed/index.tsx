import { Button, Dialog, Stack, Typography } from "@mui/material";

interface ICancelDateExceed{
    handleClose: () => void
    open:boolean
}

export function CancelDateExceed({open,handleClose}:ICancelDateExceed){
    return(
        <Dialog
        open={open}
        onClose={handleClose}
      >
        <Stack sx={{
            padding:"50px 70px"
        }}>
            <Typography textAlign={"center"} variant='h4'>
                Your time to cancel this order is exceeded. You can only cancel your order within 30 days.
            </Typography>
                <Button variant='contained' sx={{
                    textTransform:"none",
                    color:"black",
                    width:"100px",
                    marginTop:"30px",
                    marginLeft:"180px"
                }}
                onClick={handleClose}
                >Okay</Button>
        </Stack>
      </Dialog>
    )
}