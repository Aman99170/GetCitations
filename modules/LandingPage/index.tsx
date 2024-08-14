'use client'
import { Stack, Typography, Box, Card, CardContent, CardMedia, Container, Grid, Paper, Rating } from "@mui/material";
import Link from "next/link";
import { useAuthContext } from "../../context/AuthContext";
import Button from "./Button";
import { useCallback, useEffect, useMemo, useState } from "react";

interface IUserDetails {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: number;
  password: string;
  createdAt: string;
  updatedAt: string;
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

export function LandingPage() {
  const { isLoggedIn } = useAuthContext();
  const [reviewData, setReviewData] = useState<IReview[]>();
  console.log(process.env.NEXT_PUBLIC_API_URL)
  const storage = useMemo(() => {
    if (typeof window !== 'undefined')
      return (
        localStorage.getItem('user')
      )
    return null
  }, [])

  const fetchReview = useCallback(async () => {
    let res
    try {
      {
        isLoggedIn ?
          res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fetchReviewWithUserDetails`, {
            method: 'GET',
            headers: {
              Authorization: `${storage}`,
              'Content-Type': 'application/json',
            }
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
      }catch (err) {
        console.error(err)
      }
    }, [])

  useEffect(() => {
    fetchReview()
  }, [])

  return (
    <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}>
      <Stack justifyContent={"center"} alignItems={"center"} width={"850px"} padding={"120px 0px 0px 50px"}>
        <Typography variant='h3' pb={"10px"} textAlign="center" style={{ fontWeight: "bold" }}>
          Boost Your Paper Citations with{" "}
          <div style={{ color: "#00A67E", fontWeight: "bold" }}>GetCitations!</div>
        </Typography>
        <Typography textAlign="center">
          Turbocharge Your Research Impact. Thousands Have Already Seen Results. Let Us Increase Your Paper&apos;s Citations and Elevate Your Academic Reach!
        </Typography>
        {!isLoggedIn &&
          <>
            <br />

            <Button />

            <br />
          </>
        }

        {isLoggedIn ? (
          <Box paddingTop={"10px"}>
            <Link href={"/"} color='black'>Get citations for your research articles.</Link>
          </Box>
        ) : (
          <></>
        )}
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

          <Typography variant="h4" align="center" gutterBottom sx={{ mt: 5 }}>
            Testimonials
          </Typography>
          <Grid container spacing={4}>
            {reviewData?.map((review, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card sx={{ display: 'flex', flexDirection: 'column', height: "220px" }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {review && review?.userDetails.firstName} {review && review.userDetails.lastName}
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
