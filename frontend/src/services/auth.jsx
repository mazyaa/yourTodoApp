import api from './api.jsx';

export async function signUp (name, email, password) {
    const response = await api.post('/auth/register', {
        name,
        email,
        password
    });

    return response.data;
}

export async function signIn (email, password) {
    const response = await api.post('/auth/login', {
        email,
        password
    });

    return response.data;
}

export async function otpVerify (email, otp) {
    const response = await api.post('/auth/otp/verify', {
        email,
        otp
    });

    return response.data;
}

export async function sendOtp (email) {
    const response = await api.post('/auth/otp' , {
        email
    });

    return response.data;
}

export async function refreshTokenAuth () {
    const response = await api.get('/auth/refresh-token')

    return response.data.accessToken;
}