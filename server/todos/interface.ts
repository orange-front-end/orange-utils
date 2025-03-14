import type { CreateTodoBody, Todo } from "./type";

export interface TodoModel {
  getAllTodos: ({
    pageIndex,
    pageSize,
  }: {
    pageIndex?: number,
    pageSize?: number,
  }) => Todo[],

  createTodo: (todo: CreateTodoBody) => Todo,
}