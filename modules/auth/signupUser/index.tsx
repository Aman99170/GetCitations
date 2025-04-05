'use client'
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form"
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import {fields,Ifields, IFormField} from "./data"
import { useCallback } from "react"
import { useRouter } from "next/navigation";


export function SignUpUser({userType}:{userType:String}){

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
    formState: { errors },
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
            confirmPassword:getValues("confirmPassword"),
            userType:userType

        }
        const BASE_URL = userType==="Researcher"?process.env.NEXT_PUBLIC_API_URL:process.env.NEXT_PUBLIC_API_URL_FREELANCER
        const res = await fetch(`${BASE_URL}/signup`,{
            method:'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if(res.status === 401){
            alert('User session expired, logging out')
            router.push("/");
            localStorage.clear();
        }
        else if(res.status === 200){
            router.replace("/login")
        }}
        catch(err){
            console.error(err)
        }

    },[getValues,fetch])

    return(
        <>
        <Typography variant="h3" align="center" pt={"20px"}>
                Join the GetCitations
            </Typography>
            <Typography variant="h6" align="center" color="textSecondary" padding={"10px 200px 10px 200px"}>
                Whether you're a researcher looking for freelancers to assist with your projects, or a freelancer looking for exciting research collaborations, we have the right opportunities for you!
            </Typography>
            <Box
                sx={{
                    p: 4,
                    textAlign: 'center',
                }}
            >
                <Typography variant="h4" >
                    Sign Up as {userType === 'Researcher' ? 'Researcher' : 'Freelancer'}
                </Typography>
                <Typography variant="body1" color="textSecondary" pl={"40px"}>
                    {userType === 'Researcher'
                        ? 'As a researcher, you can connect with skilled freelancers to help you with your research projects. Find the perfect candidate and accelerate your work.'
                        : 'As a freelancer, you’ll gain access to groundbreaking research projects and work with experts in various fields. Join and apply your skills to real-world problems.'}
                </Typography>
            </Box>
        
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