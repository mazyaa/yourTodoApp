import { Router } from 'express';
import * as userController from '../controllers/user.js';
import * as authController from '../controllers/auth.js';
import * as otpController from '../controllers/otp.js';
import * as userMiddleware from '../middlewares/user.js';
import * as authMiddleware from '../middlewares/auth.js';
import * as authValidationMiddleware from '../middlewares/validations/auth.js';
import * as otpValidationMiddleware from '../middlewares/validations/otp.js';
import * as userValidatioMiddleware from '../middlewares/validations/user.js';

export default (app) => {
    const router = Router();

    app.use('/auth', router);

    router.post(
        '/register',
        userValidatioMiddleware.createUserValidation,
        userMiddleware.checkUserEmailExist,
        userController.createUser
    );

    router.post(
        '/login',
        authValidationMiddleware.loginValidation,
        authController.login
    );

    router.post(
        '/otp',
        otpValidationMiddleware.sendOtpValidation,
        otpController.sendOtp
    );

    router.post(
        '/otp/verify',
        otpValidationMiddleware.verifyOtpValidation,
        otpController.verifyOtp
    );

    router.get(
        '/refresh-token',
        // authMiddleware.isAuthorized,
        // authMiddleware.validateMethod,
        authController.refreshAccessToken
    );

    router.delete(
        '/logout',
        // authMiddleware.isAuthorized,
        authController.logout
    )

    
}