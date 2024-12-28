"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const bodyParser = require('body-parser');
const errorhandler_1 = __importDefault(require("errorhandler"));
//import { errorHandler } from './controller/errorHandler'; 
const todoRoutes_1 = __importDefault(require("./routes/todoRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(['/todo/create'], bodyParser.json());
app.use(express_1.default.json());
app.use('/todo', todoRoutes_1.default);
if (process.env.NODE_ENV === 'development') {
    app.use((0, errorhandler_1.default)());
}
exports.default = app;
