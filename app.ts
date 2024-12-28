import express from 'express'; 
import cors from 'cors';
import morgan from 'morgan';
const bodyParser = require('body-parser');
import errorhandler from 'errorhandler'; 
import { createTodo, readTodo, removeTodo} from './controller/index';
//import { errorHandler } from './controller/errorHandler'; 
import todoRoutes from './routes/todoRoutes'

const app = express(); 

app.use(cors());
app.use(morgan('dev'));
app.use(['/todo/create'], bodyParser.json()); 
app.use(express.json());

app.use('/todo', todoRoutes);

if (process.env.NODE_ENV === 'development') {
    app.use(errorhandler());
  }
  
export default app
