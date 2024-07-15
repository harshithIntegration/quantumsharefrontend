import React, { useEffect, useContext, useState } from 'react';
import axiosInstance from '../Helper/AxiosInstance';
import { AppContext } from '../Context/AppContext';

const RemainingDaysChecker = () => {
    const { setRemainingDays, setRemainingCredits } = useContext(AppContext);
    const [loading, setLoading] = useState(true);

    const fetchRemainingDays = async () => {
        setLoading(true);
        try {
            console.log('Fetching remaining days...');
            const response = await axiosInstance.get('/quantum-share/user/access/remainingdays', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log('Fetch successful:', response.data);
            const days = response.data.data.remainingdays;
            const credits = response.data.data.credits;
            setRemainingCredits(credits);
            setRemainingDays(days);
            localStorage.setItem('remainingDays', days);
            localStorage.setItem('remainingCredits', credits);
        } catch (error) {
            console.error('Error fetching remaining days:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const initialize = () => {
            const days = localStorage.getItem('remainingDays');
            const credits = localStorage.getItem('remainingCredits');
            setRemainingDays(days);
            setRemainingCredits(credits);
            setLoading(false);
            console.log('Initialized with local storage values:', { days, credits });
        };

        const checkTime = () => {
            const now = new Date();
            console.log(`Current time: ${now.toTimeString()}`);
            if (now.getHours() === 0 && now.getMinutes() === 0) {
                console.log('Fetching remaining days at 12:00 AM');
                fetchRemainingDays();
            } else {
                console.log('Not 12:00 AM yet.');
            }
        };
        initialize();
        checkTime();
        const intervalId = setInterval(checkTime, 60000); 

        return () => clearInterval(intervalId);
    }, [setRemainingDays, setRemainingCredits]);

    return null; // This component does not render anything
};

export default RemainingDaysChecker;