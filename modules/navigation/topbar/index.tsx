import React, { useEffect } from 'react';
import { AppBar, Stack, Toolbar, IconButton, Avatar, Button } from "@mui/material";
import { useAuthContext } from "../../../context/AuthContext";
import { useCallback, useRef, useState } from "react";
import { VerticalMenuComponent } from "../../../components/verticalMenuComponent";
import { LogoutDialog } from "../../../components/DialogBox/Logout";
import CustomButton from './CustomButton'; // Import your custom button component

export default function TopBar() {
  const { isLoggedIn } = useAuthContext();
  const [open, setOpen] = useState(false);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  console.log(isLoggedIn)
  const [userType, setUserType] = useState<String | null>();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userType = localStorage.getItem('userType');
      setUserType(userType);
    }
  }, []);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  const LogoutOpen = useCallback(() => {
    setOpenLogoutDialog(true);
  }, []);

  const kebabOption = [
    {
      type: "LINK",
      title: "Profile",
      id: "01",
      path: "/profile"
    },
    {
      type: "LINK",
      title: "Account",
      id: "02",
      path: "/account"
    },
    {
      type: "LINK",
      title: "My Orders",
      id: "02",
      path: "/myorders"
    },
    {
      type: "ACTION",
      title: "Logout",
      id: "03",
      action: LogoutOpen
    }
  ];

  return (
    <>
      <AppBar position='sticky' sx={{
        backgroundColor: "white",
        boxShadow: "none",
        borderBottom: "1px solid #e0e0e0",
        width: "100%",
      }}>
        <Toolbar sx={{
          justifyContent: "space-between"
        }}>

          <IconButton href="/">
            <Avatar src="/assets/GetCitations-logo.png" alt="GetCitations" sx={{ width: 120, height: 60 }} />
          </IconButton>
          <Stack direction={"row"} gap={"10px"}>

            <Button sx={{
              color: "black",
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
              color: "black",
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
              color: "black",
              fontWeight: "bold",
              textTransform: "none",
              "&:hover": {
                color: "#4CAF50",
              },
            }}
              variant='text'
              href='/faq'
            >Help</Button>
            {isLoggedIn && userType === "Researcher" ?
              <Button sx={{
                color: "black",
                fontWeight: "bold",
                textTransform: "none",
                "&:hover": {
                  color: "#4CAF50",
                },
              }}
                variant='text'
                href='/pricing'
              >Pricing</Button>
              : isLoggedIn && userType === "Freelancer" ?
                <Button sx={{
                  color: "black",
                  fontWeight: "bold",
                  textTransform: "none",
                  "&:hover": {
                    color: "#4CAF50",
                  },
                }}
                  variant='text'
                  href='/researchPapers'
                >Research Papers</Button>:<></>
          }
            {!isLoggedIn ?
              <>
                <CustomButton href='/sign-up'>Sign-up</CustomButton>
                <CustomButton href='/login'>Login</CustomButton>
              </> :
              <>
                <IconButton ref={anchorRef} onClick={handleToggle}>
                  <Avatar src="/assets/icons/logo.svg" />
                </IconButton>
                {open &&
                  <VerticalMenuComponent
                    open={open}
                    setOpen={setOpen}
                    handleClose={handleClose}
                    anchorRef={anchorRef}
                    kebabOption={kebabOption}
                  />}
                <LogoutDialog
                  open={openLogoutDialog}
                  handleClose={() => { setOpenLogoutDialog(false) }}
                />
              </>
            }
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  )
}
