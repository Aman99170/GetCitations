import { Box, Stack, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import { ITermsData, privacyData, termsData } from "./data";

export function TermsAndPrivacyPage(){
    let pageData:ITermsData = {
        heading:"",date:"",intro:"",detailedData:[]
    }
    const urlPath = usePathname()
    const pathArray = urlPath.split('/')
    const path = pathArray[pathArray.length - 1]
    if(path === "terms"){
        pageData = termsData
    }
    else if(path === "privacy"){
        pageData = privacyData
    }
    return(
        <>
        <Stack textAlign={"center"} sx={{
            backgroundImage:'url("/assets/icons/lightbg.jpg")',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            padding:"40px 0px 30px 0px"
        }}>
        <Typography variant="h3" >{pageData.heading}</Typography>
        <Typography variant="h6" pl={"10px"}>Effective Date:{pageData.date}</Typography>
        </Stack>
        <Box sx={{
            padding:"40px 250px 130px 250px",
        }}>
            <Typography variant="h4">Welcome to GetCitations</Typography>
            <Typography pl={"10px"} pt={"20px"} variant="h6">{pageData.intro}</Typography>
            {pageData.detailedData.map((item:{title:string,description:string},index:number)=>(
                <Box pt={"50px"} key={index}>
                <Typography variant="h5" fontWeight={"700"}>{index+1}. {item.title}</Typography>
                <Typography variant="h6" pt={"10px"} pl={"10px"}>{item.description}</Typography>
                </Box>
            ))}
        </Box>
        </>
    )
}