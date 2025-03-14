import type { TodoModel } from "./interface"

const data = [
  {
    id: 1,
    content: "todo 1",
    completed: false
  },
  {
    id: 2,
    content: "todo 2",
    completed: true
  },
  {
    id: 3,
    content: "todo 3",
    completed: false
  }
]

export const model: TodoModel = {
  getAllTodos: ({pageIndex, pageSize}) => {
    if (pageIndex && pageSize) {
      return data.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
    }

    return data
  },
  createTodo(todo) {
    const res = {
      ...todo,
     id: data.length + 1,
     completed: false
    }
    data.push(res)

    return res
  },
}