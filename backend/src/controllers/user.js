import * as userServices from '../services/user.js';

export async function createUser (req, res, next) {
    try {
        const { name, email, password } = req.body;

        const userData = await userServices.createUser(name, email, password);

        res.status(201).json({
            message: 'User created successfully!',
            data: userData
        });
    } catch (err) {
        next(err);
    }
}

export async function getCurrentUser (_req, res, next) {
    try{
        const user = res.locals.user;
    
        res.status(200).json({
            message: 'User found succesfully',
            data: user
        });
    } catch (err) {
        next(err);
    }
}

export async function updateUserById (req, res, next) {
    try {
        const user = res.locals.user;
        const { name, phoneNumber } = req.body;
      
        const userData = await userServices.updateUserById(user.id, {
          name,
          phoneNumber
        });
      
        res.status(200).json({
          message: 'Update user successfully',
          data: userData
        });
    } catch (err) {
        next(err);
    }
}