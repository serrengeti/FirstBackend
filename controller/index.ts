import { addTodo, getTodos, deleteTodo } from '../model/todo';
import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
    status?: number;
}

export const validateId = (req: Request, res: Response, next: NextFunction): void => {
    const { id } = req.params; 

    if(!id || isNaN(Number(id))) { 
   
      res.status(400).json({message:'Invalid or miising ID'}); 
      return;
    }

    next(); 
}

export const createTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { description } = req.body;

    if (!description) {
      const error: CustomError  = new Error('Description is required');
      error.status = 400;
      return next(error);  
    }

    const newTodo = await addTodo(description);
    
    res.status(201).json({ message: 'Todo created successfully', todo: newTodo });
  } catch (error) {
    next(error);  
   }
};

export const readTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {

     const todos = await getTodos();
     res.status(200).json({message: 'Todos Found', todos: todos});

    } catch (error) {
       next(error);
     }
}

export const removeTodo = async (req: Request, res: Response, next: NextFunction) => {
   
   const todoId = req.params.id; 

   try {
      
    const deletedTodo = await deleteTodo(Number(todoId));
    
    res.status(200).json({ message: "Todo deleted successfully", todo: deletedTodo })
    
    } catch(error) {
        next(error);
    }
}


