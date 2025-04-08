import * as userRepositories from '../repositories/user.js';
import { generateOtp } from '../utils/helper.js';
import { sendEmail } from '../utils/email/mail.js';
import bcrypt from 'bcrypt';

export async function createUser (name, email, password) {
    const hashedPassword = await bcrypt.hash(
        password, 
        Number(process.env.SALT_ROUNDS)
    );

    const otp = generateOtp();
    const expiredAt = new Date( Date.now() + 1000 * 60 * 5 ); // 5 minutes

    const payload = {
        name,
        email,
        password: hashedPassword,
        otp,
        expiredAt
    };

    const data = await userRepositories.createUser(payload);

    await sendEmail(email, 'OTP Verification', 'otp', { otp });

    return data;
}

export async function getUserById(userId) {
    const userData = await userRepositories.getUserById(userId);

    return userData;
}

export async function getUserByEmail(email) {
    const userData = await userRepositories.getUserByEmail(email);

    return userData;
}

export async function updateUserById(userId, payload) {
    const userData = await userRepositories.updateUserById(userId, payload);

    return userData;
}

export async function deleteUserById(userId) {
    const userData = await userRepositories.deleteUserById(userId);

    return userData;
} 