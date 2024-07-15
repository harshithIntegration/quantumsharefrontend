import React from 'react';
import Nav from '../Navbar/Nav';
import Sidenav from '../Navbar/Sidenav';
import { Link } from 'react-router-dom';
import { Box, Typography, Grid } from '@mui/material';

const PrivacyPolicy = () => {
    const token = localStorage.getItem('token');

    return (
        <>
            <div>
                <Nav />
                {token && <Sidenav />}
                <Box sx={{ marginTop: token ? '-3.2rem' : '-1.2rem' }}>
                    <Grid container justifyContent="center">
                        <Grid item xs={10} md={10}>
                            <Box mt={4} mb={4}>
                                <Typography variant="h4" gutterBottom sx={{ color: '#b4232a', fontSize: '2.2rem', fontWeight: '600' }}><b>Privacy Policy</b></Typography>
                                <Typography variant="h6" gutterBottom sx={{ fontSize: '2rem', fontWeight: '600' }}>Quantum Share</Typography>
                                <Typography variant="body1" paragraph sx={{ fontSize: '1.3rem' }}>
                                    Last Updated July 5, 2024
                                </Typography>
                                <Typography variant="h6" gutterBottom sx={{ fontSize: '1.6rem' }}><b>What Does Quantum Share Do ?</b></Typography>
                                <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem' }}>
                                    Quantum Share, developed by Quantum Paradigm, is a web application designed to facilitate efficient management and posting of content across multiple social media platforms. The upcoming features serves as a comprehensive tool for social media management, offering capabilities such as content scheduling, engagement tracking, and analytics to enhance users' marketing efforts.
                                </Typography>
                                <Typography variant="h6" gutterBottom sx={{ fontSize: '1.6rem' }}><b>Introduction</b></Typography>
                                <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem' }}>
                                    Welcome to Quantum Share’s Privacy Policy. Quantum Paradigm, Inc. (“Quantum Paradigm,” “we,” “us,” or “our”) values the privacy of our users and has developed this Privacy Policy to demonstrate our commitment to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use Quantum Share (the “Service”). Please read this Privacy Policy carefully. By using the Service, you consent to the practices described in this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not access the Service.
                                </Typography>
                                <Typography variant="h6" gutterBottom sx={{ fontSize: '1.6rem' }}><b>1. Information We Collect</b></Typography>
                                <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.5rem' }}><b>Personal Data :</b></Typography>
                                <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem' }}>
                                    Personally identifiable information, such as your name, email address, and telephone number, and demographic information, and interests, that you voluntarily give to us when you register with the Service or when you choose to participate in various activities related to the Service like sharing files. You are under no obligation to provide us with personal information of any kind; however, your refusal to do so may prevent you from using certain features of the Service.
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.5rem' }}><b>Usage Data :</b></Typography>
                                <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem' }}>
                                    Information about your interactions with the Service, such as the files you upload, download, share, and any other activities performed on the Service.
                                </Typography>
                                <Typography variant="h6" gutterBottom sx={{ fontSize: '1.6rem' }}><b>2. Use of Your Information</b></Typography>
                                <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem' }}>
                                    Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Service to:
                                </Typography>
                                <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem', margin: '1rem 3rem' }}>
                                    • Create and manage your account.<br />
                                    • Facilitate file sharing.<br />
                                    • Communicate with you about your account or activities on the Service.<br />
                                    • Enable user-to-user communications.<br />
                                    • Generate a personal profile about you to make future visits to the Service more personalized.<br />
                                    • Increase the efficiency and operation of the Service.<br />
                                    • Monitor and analyze usage and trends to improve your experience with the Service.<br />
                                    • Upcoming features like Notifications of updates to the Service.<br />
                                    • Prevent fraudulent transactions, monitor against theft, and protect against criminal activity.
                                </Typography>
                                <Typography variant="h6" gutterBottom sx={{ fontSize: '1.6rem' }}><b>3. Disclosure of Your Information</b></Typography>
                                <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem' }}>
                                    We may share information we have collected about you in certain situations. Your information may be disclosed as follows :
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.5rem' }}><b>By Law or to Protect Rights :</b></Typography>
                                <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem' }}>
                                    If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation. This includes exchanging information with other entities for fraud protection and credit risk reduction.
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.5rem' }}><b>Business Transfers :</b></Typography>
                                <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem' }}>
                                    We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.5rem' }}><b>Third-Party Service Providers :</b></Typography>
                                <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem' }}>
                                    We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.5rem' }}><b>Marketing Communications :</b></Typography>
                                <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem' }}>
                                    With your consent, or with an opportunity for you to withdraw consent, we may share your information with third parties for marketing purposes, as permitted by law.
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.5rem' }}><b>Interactions with Other Users :</b></Typography>
                                <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem' }}>
                                    If you interact with other users of the Service, those users may see your name, profile photo, and descriptions of your activity, including shared files, comments, and other collaborative activities.
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.5rem' }}><b>Online Postings :</b></Typography>
                                <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem' }}>
                                    When you post comments, contributions, or other content to the Service, your posts may be viewed by all users and may be publicly distributed outside the Service in perpetuity.
                                </Typography>
                                <Typography variant="h6" gutterBottom sx={{ fontSize: '1.6rem' }}><b>4. Security of Your Information</b></Typography>
                                <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem' }}>
                                    We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse. Any information disclosed online is vulnerable to interception and misuse by unauthorized parties. Therefore, we cannot guarantee complete security if you provide personal information.
                                </Typography>
                                <Typography variant="h6" gutterBottom sx={{ fontSize: '1.6rem' }}><b>5. Policy for Children</b></Typography>
                                <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem' }}>
                                    We do not knowingly solicit information from or market to children under the age of 13. If we learn that we have collected personal information from a child under age 13 without verification of parental consent, we will delete that information as quickly as possible. If you believe we might have any information from or about a child under 13, please contact us at info@quantumparadigm.in.
                                </Typography>
                                <Typography variant="h6" gutterBottom sx={{ fontSize: '1.6rem' }}><b>6. Options Regarding Your Information</b></Typography>
                                <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem' }}>
                                    You may at any time review or change the information in your account or terminate your account by:
                                </Typography>
                                <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem', margin: '1rem 3rem' }}>
                                    • Logging into your account settings and updating your account.<br />
                                    • Contacting us using the contact information provided below.
                                </Typography>
                                <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem' }}>
                                    Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, some information may be retained in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our Terms of Use and/or comply with legal requirements.
                                </Typography>

                                <Typography variant="h6" gutterBottom sx={{ fontSize: '1.6rem' }}><b>7. Explicit User Consent for AI Models</b></Typography>
                                <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem' }}>
                                    Quantum Share utilizes third-party AI models for enhancing user experience and providing personalized content recommendations. The following outlines our use of AI models:
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.5rem' }}><b>Third-Party AI Models Used:</b></Typography>
                                <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem' }}>
                                    [List of AI models or services used, e.g., Google's AI models, OpenAI, etc.]
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.5rem' }}><b>Data Shared:</b></Typography>
                                <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem' }}>
                                    User interaction data, content preferences, and usage patterns are shared with these models to generate personalized content recommendations and improve service delivery.
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.5rem' }}><b>Purpose:</b></Typography>
                                <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem' }}>
                                    To offer personalized recommendations and enhance the overall user experience by understanding user preferences and behaviors.
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.5rem' }}><b>Usage of Data:</b></Typography>
                                <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem' }}>
                                    The AI models analyze the shared data to generate insights and recommendations tailored to each user.
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.5rem' }}><b>User Control and Opt-Out Options:</b></Typography>
                                <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem' }}>
                                    Users can opt out of data sharing with AI models through the account settings at any time.
                                    Detailed instructions on opting out are provided in the account settings section.
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.5rem' }}><b>Responsible and Ethical Use:</b></Typography>
                                <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem' }}>
                                    We ensure that data shared with AI models is used responsibly and ethically, adhering to industry standards and best practices to protect user privacy.
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.5rem' }}><b>User Consent:</b></Typography>
                                <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem' }}>
                                    Users are explicitly informed about the use of AI models and the potential data sharing involved.
                                    Explicit consent is obtained from users before any data is shared with third-party AI models. Users must actively consent through a clear action, such as clicking a button, before data sharing occurs.
                                </Typography>

                                <Typography variant="h6" gutterBottom sx={{ fontSize: '1.6rem' }}><b>8. Limited Use Disclosure</b></Typography>
                                <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem' }}>
                                    Quantum Share’s use and transfer of information received from Google APIs will adhere to the Google API Services User Data Policy, including the Limited Use requirements.
                                </Typography>

                                <Typography variant="h6" gutterBottom sx={{ fontSize: '1.6rem' }}><b>9. Contact Us</b></Typography>
                                <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem' }}>
                                    If you have questions or comments about this Privacy Policy, please contact us at :
                                </Typography>
                                <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem' }}>
                                    <b>Quantum Paradigm, Inc.</b><br />
                                    <b>Email : </b><a href="mailto:info@quantumparadigm.in">info@quantumparadigm.in</a> <br />
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </div >
            <Footer />
        </>
    );
}

const Footer = () => {
    return (
        <Box p={2} textAlign="center" bgcolor="#ba343b">
            <Typography variant="body1" color='#fff' textAlign="center">
                &copy; {new Date().getFullYear()} Quantum Share. All rights reserved | <Link to='/privacy-policy' id="privacy">Privacy Policy</Link>
            </Typography>
        </Box>
    );
}

export default PrivacyPolicy;