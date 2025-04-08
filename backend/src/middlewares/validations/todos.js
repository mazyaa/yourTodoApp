import Joi from 'joi';
import { generateJoiError } from '../../utils/helper.js';

const ALLOWED_PRIORITY = [
    'LOW',
    'MEDIUM',
    'HIGH'
];

const createTodoSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    priority: Joi.string().valid(...ALLOWED_PRIORITY),
    dueDate: Joi.date().required()
});

const updateTodoSchema = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    priority: Joi.string().valid(...ALLOWED_PRIORITY),
    dueDate: Joi.date()
});

export async function createTodoValidation (req, res, next) {
    try {
        await createTodoSchema.validateAsync(req.body, { abortEarly: false });

        next();
    } catch (error) {
        const errorMessages = generateJoiError(error);
        return res.status(400).json({ message: errorMessages });
    }
}

export async function updateTodoValidation (req, res, next) {
    try  {
        await updateTodoSchema.validateAsync(req.body, { abortEarly: false });

        next();
    } catch (error) {
        const errorMessages = generateJoiError(error);
        return res.status(400).json({ message: errorMessages });
    }
}