export type Todo = {
  id: number
  content: string
  completed: boolean
}

export type CreateTodoBody = Omit<Todo, "id"|"completed">
