'use client'
import { Avatar, Box, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, Grid, Stack, Typography } from "@mui/material";
import { ICitationRate, IVisual, citationRate, visual } from "./data";
import Link from "next/link";
import { useAuthContext } from "../../context/AuthContext";
import styles from './PricingComponent.module.css'; 

export function Pricing(){
  const {isLoggedIn} = useAuthContext()
    return(
        <>
        <Stack sx={{
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        padding:"70px 0px 70px 0px"
        }}>
            <Typography textAlign={"center"} variant="h3">Flat Rates! Pay Per Citations</Typography>
            <Typography textAlign={"center"} variant="h5">Lowest rate in the market to increase your citations. Buy our latest plans to get started</Typography>
        </Stack>
        <Box sx={{
            padding:"150px",
            backgroundColor:"teal",
            marginBottom:"20px"
        }}>
            <Grid container spacing={4}>
            {citationRate.map((item:ICitationRate,index:number)=>(
                <Grid item xs={6} key={index}>
                <Card 
                sx={{
                   }}>
                    <CardActionArea>
                        <Stack direction={"row"} justifyContent={"center"}>
                        <CardHeader avatar={<Avatar src="assets/icons/rate.svg" alt="rate" sx={{height:"100px",width:"100px"}} ></Avatar>}/>
                        </Stack>
                        <CardContent >
                            <Typography textAlign={"center"} variant="h3">Get {item.value} citation for {item.rate}$</Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button href={isLoggedIn?`/order?numofCitation=${item.value}&rate=${item.rate}`:'/login'}>Buy Now</Button>
                    </CardActions>
                </Card>
                </Grid>
            ))}
            </Grid>
            <Stack direction={"row"} justifyContent={"center"} pt={"40px"}>
            <Box sx={{
                backgroundColor:"white",
                borderRadius:"40px",
                border:" 2px solid black",
                padding:"20px"
            }}>
                <Typography>For Bulk Orders, 
                    <Link href={"/contact"}>Contact Us</Link>
                </Typography>
            </Box>
        </Stack>
        </Box>
        <Box>
        <Typography variant="h6" textAlign={"center"}>EASY TO USE</Typography>
        <Typography variant="h5" textAlign={"center"}>Simple and Intuitive</Typography>
        <Stack justifyContent={"space-evenly"} direction={"row"} pt={"50px"} pb={"50px"}>
        {visual.map((item:IVisual,index:number)=>(
            <Box sx={{
                width:"350px",
                backgroundColor:"gainsboro",
                pt:"20px"
            }} key={index}>
            <Stack justifyContent={"center"} direction={"row"} pb={"10px"}>
            <Avatar>{item.value}</Avatar></Stack>
            <Typography textAlign={"center"} variant="h4">{item.title}</Typography>
            <Typography textAlign={"center"}>{item.subTitle}</Typography>
            </Box>
        ))}
        </Stack>
        </Box>
        </>
    )
}