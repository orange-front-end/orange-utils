import type { TodoModel } from "./interface"
import type { Todo } from "./type"

export function getAllTodos({
  model,
  pageIndex,
  pageSize,
}: {
  model: TodoModel,
  pageIndex?: number,
  pageSize?: number,
}): Todo[] {
  const data = model.getAllTodos({pageIndex, pageSize})

  return data
}