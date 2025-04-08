import * as otpRepositories from '../repositories/otp.js';
import * as userRepositories from '../repositories/user.js';
import { sendEmail } from '../utils/email/mail.js';
import { generateOtp } from '../utils/helper.js';
import { HttpError } from '../utils//error.js';

export async function sendOtp (email) {
    const user = await userRepositories.getUserByEmail(email); //search user by email

    if (!user) {
        throw new HttpError('User not found', 404);
    }

    if(user.verified) { // check if user is already verified (atribut verified di tabel user)
        throw new HttpError('User already verified', 400);
    }

    const activeOtp = await otpRepositories.findActiveOtp(user.id); //search active otp by user id

    if (activeOtp) {
        throw new HttpError('An active OTP already exsist', 400);
    }

    const otp = generateOtp();
    const expiredAt = new Date( Date.now() + 1000 * 60 * 5 ); // expired in 5 minutes

    const data = await otpRepositories.createOtp(user.id, otp, expiredAt); //create new otp

    await sendEmail(email, 'OTP Verification', 'otp', { otp });

    return data;

}

export async function verifyOtp (email, otp) {
    const user = await userRepositories.getUserByEmail(email);

    if (!user) {
        throw new HttpError('User not found', 404);
    }

    const validOtp = await otpRepositories.findValidOtp(user.id, otp);

    if (!validOtp) {
        throw new HttpError('Invalid or expired OTP', 400);
    }

    const data = await userRepositories.updateUserVerificationAndMarkOtpAsUsed(user.id, validOtp.id);

    return data;
}
