import jwt from 'jsonwebtoken';

export function generateRefreshToken(payload) {
    return jwt.sign(payload, process.env.REFRESH_TOKEN, { expiresIn: '7d' });
}

export function generateAccessToken(payload) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: '3m' });
}

export function verifyAccessToken(token) {
    return jwt.verify(token, process.env.ACCESS_TOKEN);
}

export function verifyRefreshToken(token) {
    return jwt.verify(token, process.env.REFRESH_TOKEN);
}