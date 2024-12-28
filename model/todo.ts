import { PrismaClient, Todo } from "@prisma/client";  
const prisma = new PrismaClient();

export async function addTodo(description: string): Promise<Todo> {
  try {
    const newTodo = await prisma.todo.create({
      data: { description: description },
    });
    console.log("Todo added:", newTodo);
    return newTodo;
  } catch (error) {
    console.error("Error adding todo:", error);
    throw error;
  } finally { 
    await prisma.$disconnect(); 
  }
}

export async function getTodos(): Promise<Todo[]> {
  try {
    const allTodos = await prisma.todo.findMany();

    console.log("Todos found:", allTodos);
    return allTodos;
  } catch (error) {
    console.error("Error:", (error as Error).message);
    throw error;
  } finally { 
    await prisma.$disconnect(); 
  }
}

export async function deleteTodo(id: number): Promise<Todo> {
  try {
    const todo = await prisma.todo.delete({
      where: { todo_id: id, },
    });
    console.log("Todo deleted:", todo);
    return todo;
  } catch (error) {
    console.error("Error:", (error as Error).message);
    throw error;
  } finally { 
    await prisma.$disconnect(); 
  }
}
