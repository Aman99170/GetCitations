import { AppBar, Stack, Toolbar, Button, IconButton, Typography } from "@mui/material";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
export default function BottomBar(){
    return(
      <>
        <AppBar position="relative" sx={{
            backgroundColor:"white",
            boxShadow: "none",
            borderTop: "1px solid #e0e0e0",
            width: "100%",
        }}>
            <Toolbar sx={{
              justifyContent:"space-between"
            }}>
              
            <Stack direction={"row"} gap={"10px"} justifyContent={"center"}>
            <Button sx={{
                color:"black",
                fontWeight: "bold",
                textTransform: "none",
                "&:hover": {
                  color: "#4CAF50", 
                },
              }}
              variant='text'
              href='/'
              >Home</Button>
            <Button sx={{
                color:"black",
                fontWeight: "bold",
                textTransform: "none",
                "&:hover": {
                  color: "#4CAF50", 
                },
              }}
              variant='text'
              href='/contact'
              >Contact</Button>
              <Button sx={{
                color:"black",
                fontWeight: "bold",
                textTransform: "none",
                "&:hover": {
                  color: "#4CAF50", 
                },
              }}
              variant='text'
              href='/faq'
              >Help</Button>
            <Button sx={{
                color:"black",
                fontWeight: "bold",
                textTransform: "none",
                "&:hover": {
                  color: "#4CAF50", 
                },
              }}
              variant='text'
              href='/pricing'
              >Pricing</Button>
            <Button sx={{
                color:"black",
                fontWeight: "bold",
                textTransform: "none",
                "&:hover": {
                  color: "#4CAF50", 
                },
              }}
              variant='text'
              href='/company/terms'
              >Terms</Button>
            <Button sx={{
                color:"black",
                fontWeight: "bold",
                textTransform: "none",
                "&:hover": {
                  color: "#4CAF50", 
                },
              }}
              variant='text'
              href='/company/privacy'
              >Privacy</Button>
            </Stack>
            <Stack direction={"row"} >
              <a href="https://twitter.com/GetCitations" target="_blank"><IconButton size={"large"}><TwitterIcon/></IconButton></a>
              <IconButton size={"large"}><LinkedInIcon/></IconButton> 
            </Stack>
            </Toolbar>
        </AppBar>
          </>
    )
}