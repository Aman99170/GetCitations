import { AppBar, Stack, Toolbar, Button, IconButton, Typography } from "@mui/material";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
export default function BottomBar() {
  return (
    <>
      <AppBar
        position="relative"
        sx={{
          backgroundColor: "white",
          boxShadow: "none",
          borderTop: "1px solid #e0e0e0",
          width: "100%",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            flexWrap: "wrap", // Allows wrapping on smaller screens
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            sx={{
              flexWrap: "wrap", // Allows wrapping on smaller screens
            }}
          >
            {['Home', 'Contact', 'Help', 'Terms', 'Privacy'].map((text, index) => (
              <Button
                key={index}
                sx={{
                  color: "black",
                  fontWeight: "bold",
                  textTransform: "none",
                  "&:hover": {
                    color: "#4CAF50",
                  },
                }}
                variant="text"
                href={`/${text.toLowerCase()}`}
              >
                {text}
              </Button>
            ))}
          </Stack>
          <Stack direction="row" spacing={1}>
            <a href="https://twitter.com/GetCitations" target="_blank" rel="noopener noreferrer">
              <IconButton size="large">
                <TwitterIcon />
              </IconButton>
            </a>
            <a href="https://www.linkedin.com/company/getcitations" target="_blank" rel="noopener noreferrer">
              <IconButton size="large">
                <LinkedInIcon />
              </IconButton>
            </a>
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  )
}