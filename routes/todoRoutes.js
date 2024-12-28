"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../controller/index");
const router = (0, express_1.Router)();
router.post('/create', index_1.createTodo);
router.get('/', index_1.readTodo);
router.delete('/:id', index_1.validateId, index_1.removeTodo);
exports.default = router;
