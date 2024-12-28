import React, { useState, useEffect } from 'react';
import './App.css';
import { getTodos, createTodo, removeTodo } from './util/index';

const App = () => {
  const [todo, setTodo] = useState({
    description: '',
  });
  const [todoList, setTodoList] = useState([]);
  const [error, setError] = useState(null);

  // Create a fetchTodos() function
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todos = await getTodos();

        if (!todos) {
          setError('No todos found');
          return;
        }
        setTodoList(todos);
      } catch (err) {
        setError(`Error fetching todos: ${err.message}`);
      }
    };

    fetchTodos();
  }, []);

  // Create a handleDelete() function to remove to-do list with matching id
  const handleDelete = async (id) => {
    try {
      await removeTodo(id);
      console.log('Todo deleted successfully');
      setTodoList((prevTodos) => prevTodos.filter((item) => item.todo_id !== id));
      
    } catch (error) {
      console.error('Failed to delete todo:', error);
      setError(`Failed to delete todo: ${error.message}`);
    }
  };

  // Create a handleSubmit() function to add new to-do list
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!todo.description) {
      setError('Todo description is required');
      return;
    }

    try {
      const newTodo = await createTodo(todo.description); 
      setTodoList((prevTodos) => [...prevTodos, newTodo]);
      setTodo({ description: '' });
      setError('');
    } catch (error) {
      console.error('Error adding todo:', error.message);
      setError(`Error adding todo: ${error.message}`);
    }
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          value={todo.description}
          onChange={(event) =>
            setTodo({ ...todo, description: event.target.value })
          }
        />
        <button type="submit">Add Todo</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ol>
        {todoList && todoList.length > 0 ? (
          todoList.map((todoItem, index) => (
            <li
              key={todoItem.todo_id}
              onClick={() => handleDelete(todoItem.todo_id)}
            >
              {todoItem.description}
            </li>
          ))
        ) : (
          <p>No todos to display</p>
        )}
      </ol>

  
    </div>
  );
};

export default App;
