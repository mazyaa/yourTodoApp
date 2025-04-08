import * as todosRepositories from '../repositories/todos.js';

export async function createTodo (payload) {
    const data = await todosRepositories.createTodo(payload);

    return data;
}

export async function getAllTodos (userId) {
    const data = await todosRepositories.getAllTodos(userId);

    return data;
}

export async function getTodoByUserId (userId) {
    const data = await todosRepositories.getTodoByUserId(userId);

    return data;
}

export async function getTodoById (id) {
    const data = await todosRepositories.getTodoById(id);

    return data;
}

export async function getTodoByStatusIsNotCompleted (userId) {
    const data = await todosRepositories.getTodoByStatusIsNotCompleted(userId);

    return data;
}

export async function getTodoByStatusIsCompleted (userId) {
    const data = await todosRepositories.getTodoByStatusIsCompleted(userId);

    return data;
}

export async function updateTodoById (id, payload) {
    const data = await todosRepositories.updateTodoById(id, payload);

    return data;
}

export async function updateTodoStatus (id, userId) {
    const data = await todosRepositories.updateTodoStatus(id, userId);

    return data;
}

export async function deleteTodoById (id) {
    const data = await todosRepositories.deleteTodoById(id);

    return data;
}