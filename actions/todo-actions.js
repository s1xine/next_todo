"use server";

import dbConnect from "@/lib/db";
import todo from "@/model/todo";
import { createTodoSchema } from "@/validations/todo-validations";
import { revalidatePath } from "next/cache";

export async function createToDo(data) {
  try {
    const validatedData = createTodoSchema.parse(data);
    await dbConnect();

    const ToDo = await todo.create(validatedData);
    revalidatePath("/");

    return { success: true, data: JSON.parse(JSON.stringify(ToDo)) };
  } catch (error) {
    console.error("Error creating todo: ", error);
    return {
      success: false,
      error: error ? error.message : "Failed to create todo",
    };
  }
}

export async function getTodos() {
  try {
    await dbConnect();
    const todos = await todo.find({}).sort({ createdAt: -1 });
    return { success: true, data: JSON.parse(JSON.stringify(todos)) };
  } catch (error) {
    console.error("Error fetching todos: ", error);
    return {
      success: false,
      error: error ? error.message : "Failed to fetch todos",
    };
  }
}

export async function toggleTodo(id) {
  try {
    await dbConnect();
    const todoItem = await todo.findById(id);

    if (!todoItem) {
      return { success: false, error: "Todo not found" };
    }

    todoItem.completed = !todoItem.completed;
    await todoItem.save();
    revalidatePath("/");
    return {
      success: true,
      data: JSON.parse(JSON.stringify(todoItem)),
    };
  } catch (error) {
    console.error("Error toggeling todo: ", error);
    return {
      success: false,
      error: "Failed to toggle todo",
    };
  }
}

export async function deleteTodo(id) {
  try {
    await dbConnect();
    const todoItem = await todo.findByIdAndDelete(id);

    if (!todoItem) {
      return { success: false, error: "Todo not found" };
    }

    revalidatePath("/");
    return {
      success: true,
      message: "Todo Deleted",
      data: JSON.parse(JSON.stringify(todoItem)),
    };
  } catch (error) {
    console.error("Error deleting Todo: ", error);
    return {
      success: false,
      error: "Failed to delete todo",
    };
  }
}
