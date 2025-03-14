import type { Todo } from "./type";

export interface TodoModel {
  getAllTodos: ({
    pageIndex,
    pageSize,
  }: {
    pageIndex?: number,
    pageSize?: number,
  }) => Todo[]
}