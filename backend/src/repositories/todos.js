import { prisma } from '../utils/db.js';

export function createTodo (payload) {
    return prisma.todos.create({
        data: {
            title: payload.title,
            description: payload.description,
            priority: payload.priority,
            dueDate: new Date(payload.dueDate),
            userId: payload.userId
        }
    })
}

export async function getAllTodos () {
    return prisma.todos.findMany();
}

export function getTodoByUserId (userId) {
    return prisma.todos.findMany({
        where:{
            userId
        }
    })
}

export function getTodoById (id) {
    return prisma.todos.findUnique({
        where: {
            id
        }
    })
}

export function getTodoByStatusIsNotCompleted (userId) {
    return prisma.todos.findMany({
        where: {
            isCompleted: false,
            userId
        }
    })
}

export function getTodoByStatusIsCompleted (userId) {
    return prisma.todos.findMany({
        where: {
            isCompleted: true,
            userId
        }
    })
}

export function updateTodoById (todoId, payload) {
    return prisma.todos.update({
        where: {
            id: todoId,
            userId: payload.userId
        },
        data: {
            title: payload.title,
            description: payload.description,
            priority: payload.priority,
            dueDate: new Date(payload.dueDate),
        }
    })
}

export function updateTodoStatus (todoId, userId) {
    return prisma.todos.update({
        where: {
            id: todoId,
            userId
        },
        data: {
            isCompleted: true,
        }
    })
}

export function deleteTodoById (todoId) {
    return prisma.todos.delete({
        where: {
            id: todoId
        }
    })
}