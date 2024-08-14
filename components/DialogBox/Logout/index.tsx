import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import { Button, Stack, Typography } from '@mui/material';
import { useAuthContext } from '../../../context/AuthContext';
import { useCallback } from 'react';
interface ILogoutDialog{
    handleClose: () => void
    open:boolean
}

export function LogoutDialog({open,handleClose}:ILogoutDialog) {
    const {logOut,setIsLoggedIn} = useAuthContext()
    const handleLogOut = useCallback(()=>{
        handleClose()
        logOut()
        setIsLoggedIn?.(false)
    },[handleClose,logOut])
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <Stack sx={{
            padding:"50px 70px"
        }}>
            <Typography textAlign={"center"} variant='h4'>
                Are you sure you want to logout?
            </Typography>
            <Stack direction={"row"} justifyContent={"center"} gap={"30px"} pt={"30px"}>
                <Button variant='contained' sx={{
                    textTransform:"none",
                    color:"black"
                }} onClick={handleClose}>Cancel</Button>
                <Button variant='contained' sx={{
                    textTransform:"none",
                    color:"black"
                }}
                onClick={handleLogOut}
                >Logout</Button>
            </Stack>
        </Stack>
      </Dialog>
    </>
  );
}