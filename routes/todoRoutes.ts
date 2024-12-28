import { Router } from 'express'; 
import { createTodo, removeTodo, readTodo, validateId } from '../controller/index';

const router = Router();

router.post('/create', createTodo); 

router.get('/', readTodo); 

router.delete('/:id', validateId, removeTodo)

export default router;


