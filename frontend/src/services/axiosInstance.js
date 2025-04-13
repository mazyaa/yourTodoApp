import axios from 'axios';
import { accessTokenAtom, expiredAtom } from '../atoms/tokenAtoms';
import { refreshToken } from './authServices';
import { useAtom } from 'jotai';

const axiosJWT = axios.create();

axiosJWT.interceptors.request.use(
    async (config) => {
        const [accessToken] = useAtom(accessTokenAtom);
        const [expired] = useAtom(expiredAtom);
        const currentDate = new Date();

        if (accessToken && expired < currentDate.getTime()) {
            await refreshToken();
            config.headers.Authorization = `Bearer ${accessToken}`
        }     
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosJWT;
