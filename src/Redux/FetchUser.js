import { fetchDataRequest, fetchDataSuccess, fetchDataFailure } from './action/dataslice';
import axiosInstance from '../Helper/AxiosInstance';

export const FetchUser = async (dispatch) => {
    dispatch(fetchDataRequest());
    let token = sessionStorage.getItem('token');
    try {
        const response = await axiosInstance.get('quantum-share/user/info', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data);
        dispatch(fetchDataSuccess(response.data));
    } catch (err) {
        dispatch(fetchDataFailure(err.message));
    }
};