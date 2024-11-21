import React from 'react';
import Nav from '../Navbar/Nav';
import Sidenav from '../Navbar/Sidenav';
import { Link } from 'react-router-dom';
import { Box, Typography, Grid } from '@mui/material';
import { t } from 'i18next';

const PrivacyPolicy = () => {
    const token = sessionStorage.getItem('token');

    return (
        <>
            <div>
                <Nav />
                <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex' }}>
                        {token && <Sidenav />}
                        <Box sx={{ marginTop: token ? '-1rem' : '-1.2rem' }}>
                            <Grid container justifyContent="center">
                                <Grid item xs={10} md={10}>
                                    <Box mt={4} mb={4}>
                                        <Typography variant="h4" gutterBottom sx={{ color: '#b4232a', fontSize: '2.2rem', fontWeight: '600' }}><b>{t('privacyPolicy')}</b></Typography>
                                        <Typography variant="h6" gutterBottom sx={{ fontSize: '2rem', fontWeight: '600' }}>{t('quantumShare')} </Typography>
                                        <Typography variant="body1" paragraph sx={{ fontSize: '1.3rem' }}>
                                            {t('lastUpdated')}
                                            Last Updated November 7, 2024
                                        </Typography>
                                        <Typography variant="h6" gutterBottom sx={{ fontSize: '1.6rem' }}><b>{t('whatDoesQuantumShareDo')}</b></Typography>
                                        <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem' }}>
                                           {t('quantumShareDescriptions')}
                                        </Typography>
                                        <Typography variant="h6" gutterBottom sx={{ fontSize: '1.6rem' }}><b>{t('introduction')}</b></Typography>
                                        <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem' }}>
                                           {t('welcomeToPrivacyPolicy')}
                                        </Typography>
                                        <Typography variant="h6" gutterBottom sx={{ fontSize: '1.6rem' }}><b>{t('informationWeCollect')}</b></Typography>
                                        <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.5rem' }}><b>{t('personalData')}</b></Typography>
                                        <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem' }}>
                                            {t('personalDataDescription')}
                                        </Typography>
                                        <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.5rem' }}><b>{t('usageData')}</b></Typography>
                                        <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem' }}>
                                            {t('usageDataDescription')}
                                        </Typography>
                                        <Typography variant="h6" gutterBottom sx={{ fontSize: '1.6rem' }}><b>{t('useOfYourInformation')}</b></Typography>
                                        <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem' }}>
                                            {t('useOfYourInformationDescription')}
                                        </Typography>
                                        <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem', margin: '1rem 3rem' }}>
                                            {t('createAndManageYourAccount')}<br />
                                            {t('facilitateFileSharing')} <br />
                                            {t('communicateWithYou')} <br />
                                            {t('enableUserToUserCommunications')} <br />
                                            {t('generatePersonalProfile')} <br />
                                            {t('increaseEfficiency')} <br />
                                            {t('monitorAndAnalyzeUsage')} <br />
                                            {t('upcomingFeatures')} <br />
                                            {t('preventFraudulentTransactions')}
                                        </Typography>
                                        <Typography variant="h6" gutterBottom sx={{ fontSize: '1.6rem' }}><b>{t('disclosureOfYourInformation')}</b></Typography>
                                        <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem' }}>
                                           {t('disclosureOfYourInformationDescription')}
                                        </Typography>
                                        <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.5rem' }}><b>{t('byLawOrToProtectRights')}</b></Typography>
                                        <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem' }}>
                                           {t('byLawOrToProtectRightsDescription')}
                                        </Typography>
                                        <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.5rem' }}><b>{t('businessTransfers')}</b></Typography>
                                        <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem' }}>
                                            {t('businessTransfersDescription')}   
                                        </Typography>
                                        <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.5rem' }}><b>{t('thirdPartyServiceProviders')}</b></Typography>
                                        <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem' }}>
                                            {t('thirdPartyServiceProvidersDescription')}
                                        </Typography>
                                        <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.5rem' }}><b>{t('marketingCommunications')}</b></Typography>
                                        <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem' }}>
                                           {t('marketingCommunicationsDescription')}
                                        </Typography>
                                        <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.5rem' }}><b>{t('interactionsWithOtherUsers')}</b></Typography>
                                        <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem' }}>
                                           {('interactionsWithOtherUsersDescription')}    
                                        </Typography>
                                        <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.5rem' }}><b>{('onlinePostings')}</b></Typography>
                                        <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem' }}>
                                            {t('onlinePostingsDescription')}
                                        </Typography>
                                        <Typography variant="h6" gutterBottom sx={{ fontSize: '1.6rem' }}><b>{t('securityOfYourInformation')}</b></Typography>
                                        <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem' }}>
                                            {t('securityOfYourInformationDescription')}
                                        </Typography>
                                        <Typography variant="h6" gutterBottom sx={{ fontSize: '1.6rem' }}><b>{t('policyForChildren')}</b></Typography>
                                        <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem' }}>
                                            {('policyForChildrenDescription')}
                                        </Typography>
                                        <Typography variant="h6" gutterBottom sx={{ fontSize: '1.6rem' }}><b>{t('optionsRegardingYourInformation')}</b></Typography>
                                        <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem' }}>
                                           {t('optionsRegardingYourInformationDescription')}
                                        </Typography>
                                        <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem', margin: '1rem 3rem' }}>
                                            {t('options1')}<br />
                                            {t('options2')}
                                        </Typography>
                                        <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem' }}>
                                            {t('accountTermination')}
                                        </Typography>

                                        <Typography variant="h6" gutterBottom sx={{ fontSize: '1.6rem' }}><b>{t('explicitUserConsentForAIModels')}</b></Typography>
                                        <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem' }}>
                                           {t('explicitUserConsentForAIModelsDescription')}
                                        </Typography>
                                        <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.5rem' }}><b>{t('thirdPartyAIModelsUsed')}</b></Typography>
                                        <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem' }}>
                                            {t('thirdPartyAIModelsUsedDescription')}
                                        </Typography>
                                        <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.5rem' }}><b>{t('dataShared')}</b></Typography>
                                        <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem' }}>
                                            {t('dataSharedDescription')}
                                        </Typography>
                                        <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.5rem' }}><b>{t('purpose')}</b></Typography>
                                        <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem' }}>
                                           {t('purposeDescription')}
                                        </Typography>
                                        <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.5rem' }}><b>{t('usageOfData')}</b></Typography>
                                        <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem' }}>
                                            {t('usageOfDataDescription')}
                                        </Typography>
                                        <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.5rem' }}><b>{t('userControlAndOptOutOptions')}</b></Typography>
                                        <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem' }}>
                                           {t('userControlAndOptOutOptionsDescription')}
                                        </Typography>
                                        <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.5rem' }}><b>{t('responsibleAndEthicalUse')}</b></Typography>
                                        <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem' }}>
                                           {t('responsibleAndEthicalUseDescription')}
                                        </Typography>
                                        <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.5rem' }}><b>{t('userConsent')}</b></Typography>
                                        <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem' }}>
                                            {t('userConsentDescription')}
                                        </Typography>

                                        <Typography variant="h6" gutterBottom sx={{ fontSize: '1.6rem' }}><b>{t('limitedUseDisclosure')}</b></Typography>
                                        <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem' }}>
                                           {t('limitedUseDisclosureDescription')}
                                         </Typography>

                                        <Typography variant="h6" gutterBottom sx={{ fontSize: '1.6rem' }}><b>{t('contactUs')}</b></Typography>
                                        <Typography variant="h6" gutterBottom sx={{ fontSize: '1.6rem' }}><b>8. Limited Use Disclosure</b></Typography>
                                        <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem' }}>
                                            Quantum Share’s use and transfer of information received from Google APIs will adhere to the Google API Services User Data Policy, including the Limited Use requirements.
                                        </Typography>
                                        <Typography variant="h6" gutterBottom sx={{ fontSize: '1.6rem' }}><b>9. Google Privacy Policy</b></Typography>
                                        <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem' }}>
                                            We utilize the Google API for YouTube integration to enhance our service offerings. This integration allows users to access and share YouTube content seamlessly within the Quantum Share platform.<br />
                                            <b>For more information, you can also review Google's Privacy Policy :</b> <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a>
                                        </Typography>
                                        <Typography variant="h6" gutterBottom sx={{ fontSize: '1.6rem' }}><b>10. Contact Us</b></Typography>
                                        <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem' }}>
                                            {t('contactUsDescription')}
                                        </Typography>
                                        <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem' }}>
                                            <b>{t('companyName')}</b><br />
                                            <b>{t('email')}</b><a href="mailto:info@quantumparadigm.in">{t('emailAddress')}</a> <br />
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
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