import React from 'react';
import { Button, Box, Container, Grid, Typography, Paper } from '@mui/material';
import { CustomButton } from '../../LandingPageResearcher/Button';

export function LoginPage() {
    return (
        <Container maxWidth="md" sx={{ mt: 8 }}>
            <Typography variant="h3" align="center" gutterBottom>
                Welcome to GetCitations
            </Typography>
            <Typography variant="h6" align="center" color="textSecondary" paragraph>
                Please choose your role and log in to continue.
            </Typography>
            <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
                <Grid item xs={12} md={6}>
                    <Box textAlign="center">
                        <CustomButton
                            href="/login-researcher"
                            text="Login as Researcher"
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box textAlign="center">
                        <CustomButton
                            href="/login-freelancer"
                            text="Login as Freelancer"
                        />
                    </Box>
                </Grid>
            </Grid>
            <Box sx={{ mt: 6 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Why Join Us?
                </Typography>
                <Grid container spacing={4} sx={{ mt: 2 }}>
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 4 }}>
                            <Typography variant="h5" gutterBottom>
                                For Researchers
                            </Typography>
                            <Typography variant="body1">
                                Find the right talent to collaborate on your research projects, get support from freelancers across various domains, and accelerate your research.
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 4 ,height:"137px"}}>
                            <Typography variant="h5" gutterBottom>
                                For Freelancers
                            </Typography>
                            <Typography variant="body1">
                                Discover exciting research projects to work on, use your skills to contribute to ground-breaking studies, and expand your professional network.
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ mt: 8,mb:8 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    What Can You Do After Logging In?
                </Typography>
                <Grid container spacing={4} sx={{ mt: 4 }}>
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 4, textAlign: 'center',height:"135px" }}>
                            <Typography variant="h6" gutterBottom>
                                Manage Projects
                            </Typography>
                            <Typography variant="body1">
                                Access your ongoing projects, communicate with team members, track deadlines, and submit progress updates—all in one place.
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 4, textAlign: 'center' }}>
                            <Typography variant="h6" gutterBottom>
                                Explore New Opportunities
                            </Typography>
                            <Typography variant="body1">
                                Discover new projects, whether you're looking to collaborate on research or find skilled freelancers. Unlock exciting opportunities that match your interests.
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

