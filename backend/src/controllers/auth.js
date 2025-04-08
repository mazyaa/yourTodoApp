import * as authServices from '../services/auth.js';

export async function login (req, res, next) {
    try{
        const { email, password } = req.body;

        const result = await authServices.login(email, password);

        const refreshToken = result.refreshToken;
        
        const accessToken = result.accessToken;

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        });

        res.status(200).json({
            message: 'Login Successfully',
            data: {
                name: result.name,
                email: result.email,
                // refreshToken, // Do not send refreshToken to the client (only send to database or cookie)
                accessToken
            }
        });
    } catch (err) {
        next(err);
    }
} 

export async function refreshAccessToken (req, res, next) {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const result = await authServices.refreshAccessToken(refreshToken);

        if (!result) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        return res.status(200).json({
            message: 'Token Refreshed',
            accessToken: result.accessToken
        });
    } catch (err) {
        next(err);
    }
}

export async function logout (req, res, next) {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) { 
            return res.sendStatus(204); // if refreshToken is not found, return 204 (no content)
        }

        await authServices.logout(refreshToken);

        res.clearCookie('refreshToken');

        return res.sendStatus(200);
    } catch (err) {
        next(err);
    }
}