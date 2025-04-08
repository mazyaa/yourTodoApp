import * as otpServices from '../services/otp.js';

export async function sendOtp(req, res, next) {
    try{
        const { email } = req.body; // only get email from request body (destructuring)
    
        await otpServices.sendOtp(email);
    
        res.status(200).json({
            message: 'Otp sent successfully'
        });
    } catch (err) {
        next(err);
    }
}

export async function verifyOtp(req, res, next) {
    try{
        const { email, otp } = req.body; // only get email and otp from request body (destructuring)
    
        await otpServices.verifyOtp(email, otp);
    
        res.status(200).json({
            message: 'Otp verified successfully'
        });
    } catch (err) {
        next(err); // get error from services and pass it to error handler
    }
}
