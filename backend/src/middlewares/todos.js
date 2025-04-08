import * as todosServices from '../services/todos.js';

export async function checkTodoIdAndUserIdExist (req, res, next) {
    const { id } = req.params;
    const userId = res.locals.user.id;

    const todo = await todosServices.getTodoById(id);

    if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
    }

    if (todo.userId !== userId) {
        return res.status(403).json({ message: 'You are not authorized to access this todo' });
    }

    res.locals.todo = todo;

    next();
}
