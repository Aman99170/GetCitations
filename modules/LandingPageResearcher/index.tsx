'use client'
import { Stack, Typography, Box, Card, CardContent, Container, Grid, Paper, Rating } from "@mui/material";
import Link from "next/link";
import { useAuthContext } from "../../context/AuthContext";
import { CustomButton } from "./Button";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

interface IUserDetails {
  firstName: string;
  lastName: string;
  __v: number;
}

interface IReview {
  _id: string;
  ratingValue: number;
  review: string;
  reviewedBy: string;
  orderId: string;
  reviewedAt: string;
  __v: number;
  userDetails: IUserDetails;
}

export function LandingPageResearcher() {
  const { isLoggedIn, userInfo } = useAuthContext();
  const [reviewData, setReviewData] = useState<IReview[]>();
  const searchParams = useSearchParams()
  const userType = searchParams.get('userType')
  const storage = useMemo(() => {
    if (typeof window !== 'undefined')
      return (
        localStorage.getItem('user')
      )
    return null
  }, [])

  const fetchReview = useCallback(async () => {
    let res
    const BASE_URL = userType === "Researcher" ? process.env.NEXT_PUBLIC_API_URL : process.env.NEXT_PUBLIC_API_URL_FREELANCER
    try {
      {
        isLoggedIn ?
          res = await fetch(`${BASE_URL}/fetchReviewWithUserDetails/${userInfo._id}`, {
            method: 'GET',
            headers: {
              Authorization: userType === "Researcher" ? `${storage}` : `Bearer ${storage}`,
              'Content-Type': 'application/json',
            },

          })
          :
          res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fetchPublicReviewWithUserDetails`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          })
      }
      if (res.status === 200) {
        setReviewData(await res.json())
      }
    } catch (err) {
      console.error(err)
    }
  }, [isLoggedIn, userInfo])

  useEffect(() => {
    fetchReview()
  }, [userInfo, isLoggedIn])

  return (
    <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}>
      <Stack justifyContent={"center"} alignItems={"center"} width={"850px"} padding={"120px 0px 0px 50px"}>
        {userType === "Researcher" ?
          <Box>
            <Typography variant='h3' pb={"10px"} textAlign="center" style={{ fontWeight: "bold" }}>
              Boost Your Paper Citations with{" "}
              <div style={{ color: "#00A67E", fontWeight: "bold" }}>GetCitations!</div>
            </Typography>
            <Typography textAlign="center">
              Turbocharge Your Research Impact. Thousands Have Already Seen Results. Let Us Increase Your Paper&apos;s Citations and Elevate Your Academic Reach!
            </Typography>
          </Box>
          : <Box>
            <Typography variant='h3' pb={"10px"} textAlign="center" style={{ fontWeight: "bold" }}>
              Grow Your Freelance Career with{" "}
              <div style={{ color: "#00A67E", fontWeight: "bold" }}>GetCitations!</div>
            </Typography>
            <Typography textAlign="center">
              Join a thriving community of freelancers helping researchers worldwide. Start bidding on citation projects today and boost your professional portfolio!
            </Typography>
          </Box>}
        {!isLoggedIn &&
          <>
            <br />

            <CustomButton href="/getstarted" text="Get Started" />

            <br />
          </>
        }
        <Container sx={{ py: 4 }} maxWidth="md">
          <Typography variant="h4" align="center" gutterBottom>
            Our Features
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  For Researchers
                </Typography>
                <Typography>
                  Submit your research papers and get them cited by high-quality articles written by freelancers.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  For Freelancers
                </Typography>
                <Typography>
                  Write articles and get paid for citing research papers, while also building your writing portfolio.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  How It Works
                </Typography>
                <Typography>
                  Researchers submit papers, freelancers write articles citing them, and everyone benefits!
                </Typography>
              </Paper>
            </Grid>
          </Grid>
          {isLoggedIn && userType === "Researcher" ? (
            <Box paddingTop={"40px"} paddingLeft={"250px"}>
              <Link href={"/"} color='black'>Get citations for your research articles.</Link>
            </Box>
          ) : !isLoggedIn ? (
            <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
              <Grid item xs={12} md={5}>
                <Box
                  sx={{
                    p: 4,
                    boxShadow: 3,
                    borderRadius: 2,
                    textAlign: 'center',
                    backgroundColor: '#f5f5f5',
                    height: "200px"
                  }}
                >
                  <Typography variant="h5" gutterBottom>
                    For Researchers
                  </Typography>
                  <Typography variant="body1" paragraph pb={"26px"}>
                    Are you a researcher looking for your paper citations?
                  </Typography>
                  <CustomButton
                    href="/signup-researcher"
                    text="Sign Up as Researcher"
                  />
                </Box>
              </Grid>

              <Grid item xs={12} md={5}>
                <Box
                  sx={{
                    p: 4,
                    boxShadow: 3,
                    borderRadius: 2,
                    textAlign: 'center',
                    backgroundColor: '#f5f5f5',
                    height: "200px"
                  }}
                >
                  <Typography variant="h5" gutterBottom>
                    For Freelancers
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Are you a freelancer looking to work on exciting research projects?
                  </Typography>
                  <CustomButton
                    href="/signup-freelancer"
                    text="Sign Up as Freelancer"
                  />
                </Box>
              </Grid>
            </Grid>
          ) : <></>}

          <Typography variant="h4" align="center" gutterBottom sx={{ mt: 5 }}>
            Testimonials
          </Typography>
          <Grid container spacing={4}>
            {reviewData?.map((review, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card sx={{ display: 'flex', flexDirection: 'column', height: "220px" }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {review && review?.userDetails?.firstName} {review && review?.userDetails?.lastName}
                    </Typography>
                    <Rating name="read-only" value={review.ratingValue} readOnly />
                    <Typography>
                      {review && review.review}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

      </Stack>
    </Stack>
  );
}
