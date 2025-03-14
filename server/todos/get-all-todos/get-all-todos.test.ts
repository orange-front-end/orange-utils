import { expect, test } from "bun:test"
import { getAllTodos } from "./get-all-todos"
import type { TodoModel } from "../interface"
import type { Todo } from "../type"

const data: Todo[] = [
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

const emptyData: Todo[] = []

const model: TodoModel = {
  getAllTodos: ({pageIndex, pageSize}) => {
    if (pageIndex && pageSize) {
      return data.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
    }

    return data
  },
  createTodo: (todo) => { return {} as Todo }
}

const modelEmpty: TodoModel = {
  getAllTodos: ({pageIndex, pageSize}) => {
    if (pageIndex && pageSize) {
      return emptyData.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
    }

    return emptyData
  },
  createTodo: () => { return {} as Todo }
}

test("should model is empty, should return an empty array", async () => {
  expect(getAllTodos({model: modelEmpty})).toEqual([])
})

test("should give all results when there are no page-index and page-size", async () => {
  expect(getAllTodos({model})).toEqual(data)
})

test("should give the first page", async () => {
  expect(getAllTodos({model, pageIndex: 1, pageSize: 2})).toEqual(data.slice(0, 2))
})

test("should give the second page", async () => {
  expect(getAllTodos({model, pageIndex: 2, pageSize: 2})).toEqual([data[2]!])
})