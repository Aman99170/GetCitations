import { useEffect, useRef, useState } from "react"
import { useResearchPapers } from "./useResearchPapers"
import { Box, Button, Stack, Typography } from "@mui/material"
import { ResearchPapersLong } from "../researchPapersLong"
import { IOrder } from "./type"

export function ResearchPapers(){
    const {allRPperPage,fetchAllOrders,page,lastElementRef,isFirstFetch} = useResearchPapers()
    const [allRP,setAllRP] = useState<IOrder[]>([])
    useEffect(()=>{
        fetchAllOrders()
    },[page])

    useEffect(() => {
        if (isFirstFetch.current && allRPperPage.length > 0) {
            setAllRP((prevOrders) => [...prevOrders, ...allRPperPage])
            isFirstFetch.current = false;
        }
    }, [allRPperPage]);
    return(
        <Stack sx={{
                padding: "40px 100px 30px 100px",
        }}>
        <Typography variant="h3" textAlign={"center"} pb={"20px"}>
          Explore Research Papers Posted by Experts
        </Typography>

        <Typography variant="h5" pb={"20px"}>
          Welcome to the Research Paper Portal for Freelancers. Here, you can explore a wide range of research papers
          posted by industry experts and academic researchers. Whether you're interested in emerging technologies,
          scientific discoveries, or advanced studies, you'll find valuable projects to engage with and contribute your
          expertise.
        </Typography>

        <Typography variant="h5" pb={"20px"}>
          Each paper represents a unique opportunity for freelancers like you to collaborate with researchers, provide
          insights, and even assist with citations or data analysis. Browse through the list of research papers, and
          select the ones that match your skills and interests.
        </Typography>

        <Typography variant="h4" >
          How to Get Started:
        </Typography>
        <Typography variant="h6" paragraph>
          1. Review the list of research papers below.<br />
          2. Click "View Details" for more information on each paper.<br />
          3. Once you find a project you like, click "Select Paper" to show your interest and get in touch with the
          researcher.
        </Typography>

        <Typography variant="h4" textAlign={"center"}>
          Browse Research Papers
        </Typography>
     
        {allRP?.map((allRPs,index)=>(
            <div
            key={index}
            ref={index === allRP.length - 1 ? lastElementRef : null}
            style={{ padding: '20px', borderBottom: '1px solid #ccc' }}
          >
            <ResearchPapersLong allRP={allRPs} key={index}/>
            </div>
        ))}
         </Stack>
        
    )
}