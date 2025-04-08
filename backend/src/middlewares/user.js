import * as userServices from '../services/user.js';
import { HttpError } from "../utils/error.js";

export async function checkUserEmailExist(req, res, next) {
    try{
        const { email } = req.body;
        const currentUser = res.locals.user;

        const SkipUniqueCheckEmail = currentUser?.email === email;

        if (email && !SkipUniqueCheckEmail) {
            const userEmail = await userServices.getUserByEmail(email);

           if (userEmail) {
                throw new HttpError('Email already exist', 400);
           }
        }
        next();
    }
    catch (err) {
        next(err);
    }
    
}

export async function checkUserExist(_req, res, next) {
    try {
        const user = res.locals.user;

        if (!user.id )

        next();
    } catch (err) {
        next(err);
    }
}