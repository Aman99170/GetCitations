import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { IDoubtData, IFaqData, doubtData, faqData } from "./data";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export function Faq(){
    const [expanded, setExpanded] = useState<string | false>('');
  
    const handleChange =
      (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false);
      };
    return(
        <>
          <Stack sx={{
            backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            padding:"40px 0px 30px 0px"
        }}>
        <Typography variant="h3" textAlign={"center"} >FAQ</Typography>
        <Typography variant="h5" textAlign={"center"}>Search our FAQ for answers to anything you might ask.</Typography>
        </Stack>
        <Stack direction={"row"}  justifyContent={"space-evenly"} pb={"50px"}>
            <Stack alignItems={"center"}>
              <Image src="/assets/icons/faq.jpg" alt="faq" height={500} width={500} priority/>
              <Button variant="contained" sx={{
                width:"200px",
                textTransform:"none"
              }}>Customer Guide</Button>
            </Stack>
            <Box>
                <Typography variant="h4" pb={"20px"} pt={"60px"}>About GetCitations</Typography>
                {faqData.map((items:IFaqData,index:number)=>(
                <Accordion disableGutters elevation={0} square expanded={expanded === `${items.panel}`} onChange={handleChange(`${items.panel}`)} key={index} sx={{
                         borderBottom: "1px solid grey",
                         width:"500px"
                }}>
                    <AccordionSummary id={items.panel}
                          expandIcon={expanded === `${items.panel}` ?<RemoveIcon sx={{ fontSize: '0.9rem' }}/> :<AddIcon sx={{ fontSize: '0.9rem' }}/>}
                    >
                       <Typography variant="h6">{items.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{paddingLeft:"30px"}}>
                       <Typography variant="subtitle2">
                           {items.answer}
                       </Typography>
                    </AccordionDetails>
                </Accordion>
                ))}
            </Box>
        </Stack>
        <Stack justifyContent={"center"} direction={"row"} gap={5} pt={"50px"} pb={"50px"} sx={{
            backgroundColor:"teal"
        }}>
            {doubtData.map((items:IDoubtData,index:number)=>(
                <Button href="/contact" sx={{
                    textTransform:"none",
                    color:"black",
                    backgroundColor:"antiquewhite",
                    '&:hover':{
                        backgroundColor:"antiquewhite"
                    }
                }} key={index}>
                <Box sx={{
                    display:"flex",
                    direction:"row",
                    width:"500px",
                    border:"2px solid black",
                    borderRadius:"10px",
                    padding:"20px 30px",
                    gap:"10px"
                }}>
                    <Image src={items.imgsrc} alt="img" height={40} width={40}/>
                    <Box>
                        <Typography variant="h5">{items.title}</Typography>
                        <Typography>{items.subtitle}</Typography>
                    </Box>
                </Box>
                </Button>
            ))}  
        </Stack>
        </>
    )
}