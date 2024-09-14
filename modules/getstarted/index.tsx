import { Grid, Box, Typography, Button, Stack } from "@mui/material";
import Link from "next/link";
import { CustomButton } from "../LandingPageResearcher/Button";
export function GetStarted() {
    return (
        <>
            <Grid container gap={28} sx={{ fontFamily: 'Roboto, sans-serif' }}>
                <Grid item xs={5} pl={"20px"}>
                    <Box sx={{ width: '100%', padding: 3 }}>
                        <Typography variant="h4" component="h2" sx={{ color: 'green', fontWeight: 'bold', marginBottom: 2 }}>
                            Unlock the Full Potential of Your Research!
                        </Typography>
                        <Typography variant="h5" component="h3" sx={{ color: "#00A67E", fontWeight: "bold", marginBottom: 2 }}>
                            Guaranteed Increase in Citations with GetCitations
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Welcome to GetCitations, your trusted partner in maximizing the impact of your research.
                            Our expert team is dedicated to increasing the visibility and citations of your academic papers.
                            With GetCitations, your work reaches the right audience, ensuring it gains the recognition it deserves.
                        </Typography>

                        <Typography variant="h5" component="h3" sx={{ color: "#00A67E", fontWeight: "bold", marginBottom: 2 }}>
                            Key Benefits:
                        </Typography>
                        <ul style={{ paddingLeft: '20px' }}>
                            <Typography component="li" variant="body1" sx={{ marginBottom: 1 }}>Expert promotion across diverse platforms</Typography>
                            <Typography component="li" variant="body1" sx={{ marginBottom: 1 }}>Significant Boost in Citations: Experience a noticeable increase in the number of citations your paper receives.</Typography>
                            <Typography component="li" variant="body1" sx={{ marginBottom: 1 }}>Expert Promotion: Our team specializes in promoting research articles to the right audience.</Typography>
                            <Typography component="li" variant="body1" sx={{ marginBottom: 1 }}>Wide Distribution Network: Your paper is shared across numerous platforms and academic networks.</Typography>
                            <Typography component="li" variant="body1" sx={{ marginBottom: 1 }}>Increased Visibility: Gain recognition from peers and researchers worldwide.</Typography>
                            <Typography component="li" variant="body1" sx={{ marginBottom: 1 }}>Enhanced Academic Profile: Improve your research impact and academic standing.</Typography>
                            <Typography component="li" variant="body1" sx={{ marginBottom: 1 }}>Affordable Plans: Choose from various plans to suit your budget and needs.</Typography>
                            <Typography component="li" variant="body1" sx={{ marginBottom: 1 }}>Real-Time Analytics: Track the progress and impact of our promotion efforts.</Typography>
                        </ul>
                        <Box sx={{ paddingTop: 2 }}>
                            <Typography variant="body1">
                                To know more see <Link href={"/faq"} passHref><Button sx={{ color: 'black', textDecoration: 'underline' }}>How it Works?</Button></Link>
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={5} >
                    <Box sx={{ width: '100%', padding: 3 }}>
                        <Stack spacing={4} justifyContent="center" sx={{ mt: 8,mr:8 }}>
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
                        </Stack>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}






// Headline
// Unlock the Full Potential of Your Research!
// Guaranteed Increase in Citations with GetCitations

// Front Page Design and Content
// Layout Suggestions:
// Header:

// Company Logo (top-left)
// Navigation Menu (top-right): Home, About Us, Services, Submit Your Paper, Contact
// Main Banner:

// Eye-catching image related to academic research
// Headline: "Unlock the Full Potential of Your Research!"
// Subheadline: "Guaranteed Increase in Citations with GetCitations"
// Call-to-Action Button: "Submit Your Paper Now"
// Introduction Section:

// Brief introduction about GetCitations and its mission
// Key benefits of using GetCitations
// How It Works:

// Step-by-step process with icons for each step: Submit Your Paper, Customized Promotion Plan, Wide Distribution, Watch Your Citations Grow
// Testimonials:

// Quotes from satisfied researchers with their photos
// Featured Papers:

// Showcase some of the papers that have seen significant citation increases
// Contact Section:

// Easy access to contact information and a contact form
// Content of the Front Page
// Header:
// Logo: ![GetCitations Logo]
// Menu: Home | About Us | Services | Submit Your Paper | Contact

// Main Banner:
// Image: (A vibrant, academic-themed image)
// Headline: Unlock the Full Potential of Your Research!
// Subheadline: Guaranteed Increase in Citations with GetCitations
// Button: Submit Your Paper Now

// Introduction Section:
// Text:
// Welcome to GetCitations, your trusted partner in maximizing the impact of your research. Our expert team is dedicated to increasing the visibility and citations of your academic papers. With GetCitations, your work reaches the right audience, ensuring it gains the recognition it deserves.

// Key Benefits:

// Significant Boost in Citations: Experience a noticeable increase in the number of citations your paper receives.
// Expert Promotion: Our team specializes in promoting research articles to the right audience.
// Customized Strategies: Each paper receives a tailored promotion strategy.
// Wide Distribution Network: Your paper is shared across numerous platforms and academic networks.
// Increased Visibility: Gain recognition from peers and researchers worldwide.
// Enhanced Academic Profile: Improve your research impact and academic standing.
// Time-Saving: Let us handle the promotion while you focus on your research.
// Affordable Plans: Choose from various plans to suit your budget and needs.
// Real-Time Analytics: Track the progress and impact of our promotion efforts.
// How It Works:
// Submit Your Paper
// Upload your research paper on our website.
// Customized Promotion Plan
// Our team crafts a personalized plan to maximize your paper’s reach and citations.
// Wide Distribution
// We distribute and promote your paper across relevant platforms.
// Watch Your Citations Grow
// Sit back and see your paper’s citations and impact increase.
// Testimonials:
// "GetCitations significantly increased the visibility of my research. My paper’s citations doubled within months!" - Dr. Jane Smith

// "Thanks to GetCitations, my work is now recognized by peers worldwide. Highly recommended!" - Prof. John Doe

// Featured Papers:
// Highlight some of the success stories, showcasing papers that have seen notable increases in citations after using GetCitations.