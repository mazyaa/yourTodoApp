import { Router } from 'express';
import * as todosController from '../controllers/todos.js';
import * as authMiddleware from '../middlewares/auth.js';
import * as todosValidation from '../middlewares/validations/todos.js';
import * as todosMiddleware from '../middlewares/todos.js';
import * as commonValidationMiddleware from '../middlewares/validations/common.js';


export default (app) =>{
    const router = Router();

    app.use('/todos', router);

    router.post(
        '/',
        authMiddleware.isAuthorized,
        todosValidation.createTodoValidation,
        todosController.createTodo  
    )

    router.get(
        '/',
        authMiddleware.isAuthorized,
        todosController.getTodoByUserId
    )

    router.get(
        '/all',
        authMiddleware.isAuthorized,
        authMiddleware.isAdmin,
        todosController.getAllTodos
    )

    router.get(
        '/not-completed',
        authMiddleware.isAuthorized,
        todosController.getTodoByStatusIsNotCompleted
    )

    router.get(
        '/completed',
        authMiddleware.isAuthorized,
        todosController.getTodoByStatusIsCompleted
    )


    router.put(
        '/:id',
        authMiddleware.isAuthorized,
        commonValidationMiddleware.validateIdParams,
        todosMiddleware.checkTodoIdAndUserIdExist,
        todosValidation.updateTodoValidation,
        todosController.updateTodoById
    )

    router.put(
        '/status/:id',
        authMiddleware.isAuthorized,
        commonValidationMiddleware.validateIdParams,
        todosMiddleware.checkTodoIdAndUserIdExist,
        todosController.updateTodoStatus
    )

    router.delete(
        '/:id',
        authMiddleware.isAuthorized,
        commonValidationMiddleware.validateIdParams,
        todosMiddleware.checkTodoIdAndUserIdExist,
        todosController.deleteTodoById
    )
}