import Joi from 'joi';
import { generateJoiError } from '../../utils/helper.js';

const createUserSchema = Joi.object({
    name: Joi.string().min(1).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

const updateUserSchema = Joi.object({
    name: Joi.string().min(1).max(50),
    email: Joi.string().email(),
});

export async function createUserValidation (req, res, next) {
    try{
        await createUserSchema.validateAsync(req.body, { abortEarly: false });

        next();
    } catch (error){
        const errorMessages = generateJoiError(error);
        return res.status(400).json({ message: errorMessages})
    }
}

export async function updateUserValidation (req, res, next) {
    try{
        await updateUserSchema.validateAsync(req.body, { abortEarly: false });

        next();
    } catch (error){
        const errorMessages = generateJoiError(error);
        return res.status(400).json({ message: errorMessages})
    }
}
