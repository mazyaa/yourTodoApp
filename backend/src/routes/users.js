import { Router } from 'express';
import * as userController from '../controllers/user.js';
import * as userMiddleware from '../middlewares/user.js';
import * as authMiddleware from '../middlewares/auth.js';
import * as userValidationMiddleware from '../middlewares/validations/user.js';

export default (app) => { 
    const router = Router();

    app.use('/users', router);

    router.get(
        '/me',
        authMiddleware.isAuthorized,
        userController.getCurrentUser
    );

    router.put(
        '/me',
        authMiddleware.isAuthorized,
        userValidationMiddleware.updateUserValidation,
        userMiddleware.checkUserEmailExist,
        userController.updateUserById
    );



}