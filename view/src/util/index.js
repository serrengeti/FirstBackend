import axios from 'axios';

export const createTodo = async (description) => { 
    try {
        const response = await axios.post('http://localhost:6543/todo/create', {description}); 
        console.log('Todo created:', response.data);  
        const { todo } = response.data;  
        return todo; 
    } catch (error) { 
        console.error('Error creating todo:', error);
    }
};

export const getTodos = async (id) => {
    try{
        const response = await axios.get('http://localhost:6543/todo/'); 
        console.log('Todos found:', response.data);
        const { todos } = response.data;  
        return todos; 
    } catch (error) {
        console.error('Errror fetching todos:', error);
    }
};

export const removeTodo = async (id) => { 
    try {
        const response = await axios.delete(`http://localhost:6543/todo/${id}`); 
        console.log('Todo deleted:', response.data); 
    } catch(error){
        console.error('Error deleteing todo:', error); 
    }
}; 

