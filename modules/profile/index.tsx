'use client'
import { Avatar, Button, Grid, Input, Stack, TextField, Typography } from "@mui/material";
import { profiledata } from "./data";
import { IProfileData, IUserInfo } from "./type";
import { useAuthContext } from "../../context/AuthContext";
import { useCallback, useEffect, useState } from "react";

export function ProfilePage() {
    const { userInfo } = useAuthContext()
    const [isEditable, setIsEditable] = useState<boolean>(false)
    const [oldPassword,setOldPassword] = useState<String>("")
    const [newPassword,setNewPassword] = useState<String>("")
    const [confirmPassword,setConfirmPassword] = useState<String>("")
    const [error,setError] = useState<String>("")
    const [editedUserDetails, setEditedUserDetails] = useState<IUserInfo>({ firstName: "", lastName: "", email: "", mobileNumber: "" })
    const handleEditButton = () => {
        setIsEditable(true)
    }
    const handleSaveButton = useCallback(async() => {
        try{
            let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/updateUserDetails/${userInfo._id}`,{
                method:'PUT',
                body: JSON.stringify(editedUserDetails),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if(res.status===200){
                setIsEditable(false)
            }
        }catch(error){
            console.error(error)
        }
    },[editedUserDetails])

    const handleChangePassword = useCallback(async()=>{
        if(newPassword!==confirmPassword){
            setError("Your new password and confirm password do not match")
        }else{
            setError("")
        }
        try{
            const payload= {
                oldPassword,newPassword
            }
            let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/updateUserPassword/${userInfo._id}`,{
                method:'PATCH',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const data = await res.json()
            if(res.status===200){
                alert(data.message)
                setOldPassword("")
                setNewPassword("")
                setConfirmPassword("")
            }
        }catch(error){
            console.error(error)
        }
    },[newPassword,confirmPassword,oldPassword])

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setEditedUserDetails({
      ...editedUserDetails,
      [name]: value
    });
    }

    useEffect(()=>{
        setEditedUserDetails({ firstName: userInfo.firstName, lastName: userInfo.lastName, email: userInfo.email, mobileNumber: userInfo.mobileNumber })
    },[userInfo])

    return (
        <>
            <Stack sx={{
                padding: "40px 0px 30px 0px",
            }}>
                <Typography variant="h3" textAlign={"center"} >Manage your profile</Typography>
            </Stack>
            <Grid container sx={{
                padding: "40px 40px 30px 40px"
            }}>
                <Grid item xs={3}>
                    <Avatar alt="profile photo" sx={{
                        height: "150px",
                        width: "150px",
                    }} />
                    <Input type="file" sx={{
                        pt: "20px",
                        mb: "20px"
                    }} />
                    <Button variant="contained">Upload Photo</Button>
                </Grid>
                <Grid item xs={5}>
                    {profiledata.map((item: IProfileData, index: number) => (
                        <Stack direction={"row"} justifyContent={"space-evenly"} pb={"10px"} pr={"30px"} key={index}>
                            <Typography sx={{
                                pt: "10px",
                                minWidth: "130px"
                            }}>{item.label}</Typography>
                            <TextField name={item.value} disabled={!isEditable} fullWidth defaultValue={userInfo[item.value as keyof IUserInfo]} onChange={(e)=>handleChange(e)} />
                        </Stack>
                    ))}
                    <Stack direction={"row"} justifyContent={"space-evenly"}>
                        <Button variant="text" sx={{ textTransform: "none" }} onClick={() => handleEditButton()}>Edit Details</Button>
                        <Button variant="contained" sx={{ textTransform: "none" }} onClick={() => handleSaveButton()}>Save Details</Button>
                    </Stack>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h5">Change Password</Typography>
                    <Stack gap={"20px"} sx={{
                        pt: "20px",
                        pb: "20px"
                    }}>
                        <TextField value={oldPassword} placeholder="current password *" sx={{ width: "270px" }} onChange={(e)=>setOldPassword(e.target.value)} />
                        <TextField value={newPassword} placeholder="new password *" sx={{ width: "270px" }} onChange={(e)=>setNewPassword(e.target.value)} />
                        <TextField value={confirmPassword} placeholder="confirm password *" sx={{ width: "270px" }} onChange={(e)=>setConfirmPassword(e.target.value)} />
                        {error!=="" && <Typography sx={{color:"red"}}>{error}</Typography>}
                    </Stack>
                    <Button variant="contained" sx={{
                        textTransform: "none",
                    }} onClick={()=>handleChangePassword()}>Change Password</Button>
                </Grid>
            </Grid>
        </>
    )
}