import { expect, test } from "bun:test"
import type { TodoModel } from "../interface"
import { createTodo } from "./create-todo"
import { getAllTodos } from "../get-all-todos/get-all-todos"

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

const model: TodoModel = {
  getAllTodos: ({pageIndex, pageSize}) => {
    if (pageIndex && pageSize) {
      return data.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
    }

    return data
  },
  createTodo: (todo) => { 
    const res = {
      ...todo,
     id: data.length + 1,
     completed: false
    }
    data.push(res)

    return res
  }
}
test("create todo without `content`", () => {
  try {
    createTodo({ model, todo: { content: "" } })
    expect(false).toBeTruthy()
  } catch(e) {
    expect(e instanceof Error).toBeTruthy()
    expect(e.message).toEqual("content is required")
    expect(getAllTodos({ model })).toEqual(data)
  }
})

test("create todo with `content`", () => {
  const content = "test"
  const createRes = createTodo({ model, todo: { content } })
  expect(createRes.content).toEqual(content)
  expect(getAllTodos({ model }).length).toEqual(4)
  expect(getAllTodos({ model }).includes(createRes)).toBeTruthy()
})


