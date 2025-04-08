import { Router } from 'express';
import users from './users.js';
import auth from './auth.js';
import todos from './todos.js';

export default function routes (app) { 
    const router = Router();

    app.use('/', router);
    
    auth(router);
    users(router);
    todos(router);


};