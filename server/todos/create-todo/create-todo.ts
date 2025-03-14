import type { TodoModel } from "../interface";
import type { CreateTodoBody } from "../type";

export function createTodo({ model, todo}: { model: TodoModel, todo: CreateTodoBody }) {
  if (!todo.content) {
    throw new Error("content is required")
  }

  return model.createTodo(todo)
}