import { Grid, Box, Typography, Container, Paper } from "@mui/material";
import {CustomButton} from "../../LandingPageResearcher/Button";

export function SignUp() {
    return (
        <>

<Container maxWidth="lg" sx={{ mt: 8 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Welcome to GetCitations
      </Typography>
      <Typography variant="h6" align="center" color="textSecondary" paragraph>
        Join our community where researchers and freelancers collaborate to achieve success together. Whether you are looking to advance your research or contribute your skills, the Research Hub is the perfect place for you.
      </Typography>
      <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              p: 4,
              boxShadow: 3,
              borderRadius: 2,
              backgroundColor: '#f5f5f5',
              textAlign: 'center',
            }}
          >
            <Typography variant="h4" gutterBottom>
              Get Started with GetCitations
            </Typography>
            <Typography variant="body1" paragraph>
              Create your account and start your journey towards groundbreaking research and collaborative opportunities. Our platform brings together skilled professionals and researchers from across the globe.
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Why GetCitations?
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 4, textAlign: 'center',height:"170px" }}>
              <Typography variant="h6" gutterBottom>
                Global Collaboration
              </Typography>
              <Typography variant="body1">
                Join a community of experts from around the world. Whether you’re sharing research ideas or collaborating on innovative projects, Research Hub makes it easy to connect with global talent.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 4, textAlign: 'center',height:"170px" }}>
              <Typography variant="h6" gutterBottom>
                Expand Your Network
              </Typography>
              <Typography variant="body1">
                Network with professionals, academics, and experts across various fields. Build long-lasting partnerships and unlock new opportunities for both research and professional growth.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 4, textAlign: 'center',height:"170px" }}>
              <Typography variant="h6" gutterBottom>
                Streamlined Workflows
              </Typography>
              <Typography variant="body1">
                Our platform is designed to simplify your workflow. Manage your projects, communicate with your team, and track your progress all in one place.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          How It Works
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 4,height:"100px" }}>
              <Typography variant="h6" gutterBottom>
                1. Create an Account
              </Typography>
              <Typography variant="body1">
                Sign up for free and create your profile. Whether you are a researcher or a freelancer, it only takes a few minutes to get started.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 4,height:"100px" }}>
              <Typography variant="h6" gutterBottom>
                2. Find Your Match
              </Typography>
              <Typography variant="body1">
                Researchers can post projects and find the perfect freelancer for their needs, while freelancers can browse available opportunities and connect with researchers.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 4,height:"100px" }}>
              <Typography variant="h6" gutterBottom>
                3. Start Collaborating
              </Typography>
              <Typography variant="body1">
                Once you’ve found a match, start collaborating on exciting projects. Work together to achieve breakthroughs, innovate, and deliver results.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 4,height:"100px" }}>
              <Typography variant="h6" gutterBottom>
                4. Deliver and Grow
              </Typography>
              <Typography variant="body1">
                Deliver results, receive feedback, and grow your professional profile. Build your reputation within the research and freelance communities.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Ready to Join the GetCitations?
        </Typography>
        <Typography variant="h6" color="textSecondary" paragraph>
          Sign up today and start collaborating with researchers and freelancers around the world!
        </Typography>
      </Box>
    </Container>
                <Grid container spacing={4} justifyContent="center" sx={{ mt: 4,mb:4 }}>
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
                            <Typography variant="body1" paragraph pb={"26px"}>
                                Are you a freelancer looking to work on exciting research projects?
                            </Typography>
                            <CustomButton
                                href="/signup-freelancer"
                                text="Sign Up as Freelancer"
                            />
                        </Box>
                    </Grid>
                </Grid>
            </>
            )
}