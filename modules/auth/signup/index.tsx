'use client'
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form"
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import {fields,Ifields, IFormField} from "./data"
import { useCallback } from "react"
import { useRouter } from "next/navigation";
import TopBar from "../../navigation/topbar/index";
import BottomBar from "../../navigation/bottombar/index";



export function SignUp(){

    const schema = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup
    .string()
    .required('Email is required')
    .matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'invalid email'
    ),
    mobileNumber: yup.string().min(10, 'Mobile number too short').max(10, 'Mobile number too long').required(),
    password: yup.string()
      .required("Password is required")
      .min(4, "Password length should be at least 4 characters")
      .max(12, "Password cannot exceed more than 12 characters"),
    confirmPassword: yup.string()
      .required("Confirm Password is required")
      .min(4, "Password length should be at least 4 characters")
      .max(12, "Password cannot exceed more than 12 characters")
      .oneOf([yup.ref("password")], "Passwords do not match")

    })

    const defaultValues:IFormField = {
        firstName:"",
        lastName:"",
        email:"",
        mobileNumber:"",
        password:"",
        confirmPassword:""
    }

    const router = useRouter()

   const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
    reset,
    } = useForm<IFormField>({
        mode:"all",
        defaultValues:defaultValues,
        resolver: async (data, context, options) => {
            return yupResolver(schema)(data, context, options)
        }
    });

    const onsubmit = useCallback(async ()=>{
        try{
        const payload = {
            firstName:getValues("firstName"),
            lastName:getValues("lastName"),
            email:getValues("email"),
            mobileNumber:getValues("mobileNumber"),
            password:getValues("password"),
            confirmPassword:getValues("confirmPassword")
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signup`,{
            method:'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if(res.status === 200){
            router.replace("/login")
        }}
        catch(err){
            console.error(err)
        }

    },[getValues,fetch])

    return(
        <>
        <Stack direction={"row"} justifyContent={"center"} sx={{
            backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            marginBottom:"20px",
            padding:"40px 0px 30px 0px"
        }}>
        <Typography variant="h3" >Create a FREE account</Typography>
        </Stack>
        {fields.map((fieldname:Ifields,index:number)=>(
            <Stack direction={"row"}justifyContent={"center"} sx={{
                paddingTop:"10px",
            }} key={index}>
            <Stack direction={"row"} gap={"10px"}>
            <Typography sx={{
                paddingTop:"15px",
                minWidth:"150px"
            }}>{fieldname.label}</Typography>
            <Stack>
                <TextField 
                   {...register(fieldname.value as keyof IFormField)}
                      sx={{
                      minWidth:"500px"
                    }}
                    type={fieldname.type??fieldname.type}
                />
                <Typography
                  color={'red'}
                  pl={'5px'}
                >
                    {errors[fieldname.value as keyof IFormField]
                     ? `${
                      errors[fieldname.value as keyof IFormField]
                          ?.message
                      }`
                    : ''}
                </Typography>
            </Stack>
            </Stack>
            </Stack>
        ))}
        
        <Stack direction={"row"} justifyContent={"center"} gap={"10px"} p={"36px 0px 67px 114px"} >
        <Button variant="contained" sx={{
            backgroundColor:"seagreen",
            color:"white",
            width:"200px",
            ":hover":{
                backgroundColor:"seagreen"
            }
        }}
        onClick={handleSubmit(onsubmit)}
        >Signup</Button>
        <Typography pt={"4px"}>Already have an account?</Typography>
        <Typography pt={"4px"}><Link href={"/login"}>Login</Link></Typography>
        </Stack>

        </>
    )
}