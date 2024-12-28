"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTodo = addTodo;
exports.getTodos = getTodos;
exports.deleteTodo = deleteTodo;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function addTodo(description) {
    try {
        const newTodo = await prisma.todo.create({
            data: { description },
        });
        console.log("Todo added:", newTodo);
        return newTodo;
    }
    catch (error) {
        console.error("Error adding todo:", error);
        throw error;
    }
}
async function getTodos() {
    try {
        const allTodos = await prisma.todo.findMany();
        console.log("Todos found:", allTodos);
        return allTodos;
    }
    catch (error) {
        console.error("Error:", error.message);
        throw error;
    }
}
async function deleteTodo(id) {
    try {
        const todo = await prisma.todo.delete({
            where: { todo_id: id, },
        });
        console.log("Todo deleted:", todo);
        return todo;
    }
    catch (error) {
        console.error("Error:", error.message);
        throw error;
    }
}
