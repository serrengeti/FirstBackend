"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTodo = exports.readTodo = exports.createTodo = exports.validateId = void 0;
const todo_1 = require("../model/todo");
const validateId = (req, res, next) => {
    const { id } = req.params;
    if (!id || isNaN(Number(id))) {
        res.status(400).json({ message: 'Invalid or miising ID' });
        return;
    }
    next();
};
exports.validateId = validateId;
const createTodo = async (req, res, next) => {
    try {
        const { description } = req.body;
        if (!description) {
            const error = new Error('Description is required');
            error.status = 400;
            return next(error);
        }
        const newTodo = await (0, todo_1.addTodo)(description);
        res.status(201).json({ message: 'Todo created successfully', todo: newTodo });
    }
    catch (error) {
        next(error);
    }
};
exports.createTodo = createTodo;
const readTodo = async (req, res, next) => {
    try {
        const todos = await (0, todo_1.getTodos)();
        res.status(200).json({ message: 'Todos Found', todos: todos });
    }
    catch (error) {
        next(error);
    }
};
exports.readTodo = readTodo;
const removeTodo = async (req, res, next) => {
    const todoId = req.params.id;
    try {
        const deletedTodo = await (0, todo_1.deleteTodo)(Number(todoId));
        res.status(200).json({ message: "Todo deleted successfully", todo: deletedTodo });
    }
    catch (error) {
        next(error);
    }
};
exports.removeTodo = removeTodo;
