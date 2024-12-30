import { fetchDataRequest, fetchDataSuccess, fetchDataFailure } from './action/dataslice';
import axiosInstance from '../Helper/AxiosInstance';

export const FetchUser = async (dispatch, onSessionExpired) => {
    dispatch(fetchDataRequest());

    let token = localStorage.getItem('token');
    try {
        const response = await axiosInstance.get('/quantum-share/user/info', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('User Data:', response.data); // Debugging purpose
        dispatch(fetchDataSuccess(response.data));
    } catch (err) {
        console.error('Error fetching user info:', err.response); // Debugging purpose
        if (err.response && err.response.data.code === 121) {
            console.log('Session expired, triggering callback'); // Debugging purpose
            localStorage.removeItem('token');
            onSessionExpired(); // Trigger the callback to show the dialog
        } else {
            dispatch(fetchDataFailure(err.message || 'An error occurred'));
        }
    }
};

