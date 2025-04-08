import * as userRepository from '../repositories/user.js';
import { HttpError } from '../utils/error.js';
import { generateRefreshToken, generateAccessToken, verifyAccessToken, verifyRefreshToken } from '../utils/jwt.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function isPasswordMatch (password, hashedPassword) {
    const isMatch = await bcrypt.compare(password, hashedPassword);

    return isMatch;
}

export async function login (email, password) {
    try {
        const user = await userRepository.getUserByEmail(email);
    
        if (!user) {
            throw new HttpError('Email Not Found', 404);
        }

        if(!user.verified) {
            throw new HttpError('Email is not verified', 401);
        }

        const isPasswordValid = await isPasswordMatch(password, user.password);

        if (!isPasswordValid) {
            throw new HttpError('Invalid password!', 401);
        }

        const refreshToken = generateRefreshToken({
            id: user.id,
            name: user.name,
            email: user.email
        });

        const accessToken = generateAccessToken({
            id: user.id
        });
        
        await userRepository.updateRefreshToken(user.id, refreshToken);

        return {
            name: user.name,
            email: user.email,
            refreshToken,
            accessToken
        }
    } catch (error) {
        throw error;
    }
}

export async function verifyAccessTokenAndUser (token) {
    try {
        const { id } = verifyAccessToken(token);

        const user = userRepository.getUserById(id);

        if (!user) {
            throw new HttpError('User not found', 404);
        }

        return user;
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            throw new HttpError('Forbidden', 403);
        }

        throw error;
    }
}

export async function refreshAccessToken (rerfreshToken) {
    try {
        const user = verifyRefreshToken(rerfreshToken);

        const newAccessToken = generateAccessToken({
            id: user.id,
            email: user.email
        });

        return {
            accessToken: newAccessToken
        };
    } catch (error) {
        throw new HttpError('Invalid refresh token', 401);
    }
}

export async function logout (refreshToken) {
    const user = verifyRefreshToken(refreshToken);

    await userRepository.updateRefreshToken(user.id, null);
}


