import { Box, Button, CardActionArea, Grid, Stack, TextField, Typography } from "@mui/material";
import { IContactData, ILeaveMsgData, contactdata, leaveMsgData } from "./data";
import Image from "next/image";
import emailjs from '@emailjs/browser';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useState } from "react";

interface IFormField{
    name:string,
    email:string,
    subject:string,
    mobileNumber:string,
    description:string
}

export function ContactPage(){
    const schema = yup.object().shape({
        name: yup.string().required("Name is required"),
        email: yup
        .string()
        .required('Email is required')
        .matches(
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'invalid email'
        ),
        subject: yup.string().required("Subject is required"),
        mobileNumber: yup.string().min(10, ' Mobile number too short').max(10, 'Mobile number too long').required(),
        description: yup.string().required("Description is required")
    })

    const defaultValues = {
        name:"",
        email:"",
        subject:"",
        mobileNumber:"",
        description:""
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        } = useForm<IFormField>({
            mode:"all",
            defaultValues:defaultValues,
            resolver: async (data, context, options) => {
                return yupResolver(schema)(data, context, options)
            }
        });

        const [formData, setFormData] = useState({
          name: "",
          email: "",
          subject: "",
          mobileNumber: "",
          description: ""
        });

        const handleChange = (e:any) => {
          const { name, value } = e.target;
          setFormData(prevState => ({
            ...prevState,
            [name]: value
          }));
        };

        const onsubmit = (e:any) =>{
             emailjs
            .send('service_78eojkg', 'template_j5fqw4t', formData, {
              publicKey: 'W_A-VhK2AC7YKq0oh',
            })
            .then(
              () => {
                reset()          
              },
              (error:any) => {
                console.error('FAILED...', error.text);
              },
            );
        }

    return(
        <>
        <Stack sx={{
            padding:"40px 0px 30px 0px"
        }}>
        <Typography variant="h3" textAlign={"center"} >Got a question?</Typography>
        <Typography variant="h5" textAlign={"center"}>We'd love to talk about how we can help you.</Typography>
        </Stack>
        <Stack direction={"row"} justifyContent={"center"} padding={"50px"} gap={"20px"} sx={{
            backgroundColor:"teal"
        }}>
            {contactdata.map((item:IContactData,index:number)=>(
                <Box sx={{
                    width:"350px",
                    backgroundColor:"antiquewhite",
                    pb:"20px"
                }} key={index} component={CardActionArea}>
                <Stack justifyContent={"center"} direction={"row"} pb={"10px"} pt={"20px"}>
                    <Image src={item.imagesrc} alt="img" height={30} width={30}></Image>
                </Stack>
                <Typography textAlign={"center"} variant="h4">{item.title}</Typography>
                {item.email && <Typography textAlign={"center"}>{item.email}</Typography>}
                {item.phone && <Typography textAlign={"center"}>{item.phone}</Typography>}
                {item.address && <Typography textAlign={"center"}>{item.address}</Typography>}
                </Box>
            ))}
        </Stack>
        <Box pt={"50px"} pb={"50px"}>
        <Typography textAlign={"center"}>LEAVE A MESSAGE</Typography>
        <Typography variant="h4" textAlign={"center"}>How can we help?</Typography>
        <Grid container columnSpacing={6} rowSpacing={4} padding={"100px 250px 50px 250px"}>
            {leaveMsgData.map((title:ILeaveMsgData,index:number)=>(
                <Grid item xs={6} key={index}>
                    <Stack direction={"row"} pb={"5px"}>
                    <Typography>{title.title}</Typography>
                    <Typography color={"red"}>*</Typography>
                    </Stack>
                    {title.multiLine ? <TextField id={title.value} fullWidth multiline rows={4} {...register(title.value as keyof IFormField)} onChange={handleChange}/> :
                    <TextField id={title.value} fullWidth {...register(title.value as keyof IFormField)} onChange={handleChange}/>}
                    <Typography
                      color={'red'}
                      pl={'5px'}
                    >
                    {errors[title.value as keyof IFormField]
                     ? `${
                      errors[title.value as keyof IFormField]
                          ?.message
                      }`
                    : ''}
                </Typography>
                </Grid>
            ))}
        </Grid>
        <Stack direction={"row"} justifyContent={"center"} pt={"40px"}>
            <Button variant="contained" sx={{
            backgroundColor:"seagreen",
            textTransform: "none",
            color:"white",
            width:"200px",
            ":hover":{
                backgroundColor:"seagreen"
            }
        }}
        onClick={handleSubmit(onsubmit)}>Submit</Button>
        </Stack>
        </Box>
        </>
    )
}