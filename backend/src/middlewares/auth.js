import { HttpError } from "../utils/error.js";
import { verifyAccessTokenAndUser } from "../services/auth.js";

export async function isAuthorized(req, res, next) {
    try {
        const authorization = req.get('Authorization');

        if (!authorization) {
            throw new HttpError('Authorization header is required!', 401);
        }

        const [type, token] = authorization.split(' ');

        if (type.toLowerCase() !== 'bearer') {
            throw new HttpError('Authorization type Bearer is required!', 401);
        }

        const user = await verifyAccessTokenAndUser(token);

        if (!user) {
            throw new HttpError('User not found', 404);
        }

        res.locals.user = user;

        next();
    } catch (error) {
        next(error);
    }
}

export async function isAdmin (_req, res, next) {
    try {
        const user = res.locals.user;

        if (!user) {
            throw new HttpError('User not found', 404);
        }
        
        if (user.role !== 'ADMIN') {
            throw new HttpError('Not Authorized!', 403);
        }

        next();
    } catch (error) {
        next(error);
    }
}

export async function validateMethod (req, _res, next) {
    try{
        if (req.method !== 'POST') {
            throw new HttpError('Method not allowed', 405);
        }
    
        next();
    } catch (error) {
        next(error);
    }
}