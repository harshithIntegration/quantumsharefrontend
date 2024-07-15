/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './global.css';
import Dashboard from './Sidebar/Dashboard';
import Home from './Pages/Home';
import Login from './Navbar/Login';
import SignUp from './Navbar/SignUp';
import Verification from './Navbar/Verification';
import About from './Pages/About';
import Features from './Pages/Features';
import Pricing from './Pages/Pricing';
import AccountOverview from './Sidebar/AccountOverview';
import Analytics from './Sidebar/Analytics';
import QI from './Pages/QI';
import SocialMediaLogin from './SocialMediaLogin/SocialMediaLogin';
import YoutubeCallback from './SocialMediaLogin/YoutubeCallback';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import ConnectSocialMedia from './ConnectionInfo/ConnectSocialMedia';
import PrivateRoute from './Helper/PrivateRoute';
import ReferenceVideo from './Pages/ReferenceVideo';
import LinkedInCallback from './SocialMediaLogin/LinkedInCallback';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/verify' element={<Verification />} />
                <Route path='/signUp' element={<SignUp />} />
                <Route path='/about' element={<About />} />
                <Route path='/feature' element={<Features />} />
                <Route path='/QAi' element={<QI />} />
                <Route path='/pricing' element={<Pricing />}/>
                <Route path='/privacy-policy' element={<PrivacyPolicy />} />
                <Route path='/reference-video' element={<ReferenceVideo />} />
                <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path='/social-integration' element={<PrivateRoute><SocialMediaLogin /></PrivateRoute>} />
                <Route path='/account-overview' element={<PrivateRoute><AccountOverview /></PrivateRoute>} />
                <Route path='/analytics' element={<PrivateRoute><Analytics /></PrivateRoute>} />
                <Route path='/connect-socialmedia' element={<PrivateRoute><ConnectSocialMedia /></PrivateRoute>} />
                <Route path='/youtube/callback/getChannelDetails' element={<PrivateRoute><YoutubeCallback /></PrivateRoute>} />
                <Route path='/quantum-share/callback/success' element={<PrivateRoute><LinkedInCallback /></PrivateRoute>} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;