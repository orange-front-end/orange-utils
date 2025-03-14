import { expect, test } from "bun:test"
import { getAllTodos } from "../get-all-todos"
import type { TodoModel } from "../interface"
test("should model is empty, should return an empty array", async () => {
  const model: TodoModel = {
    getAllTodos: () => {
      return []
    }
  }

  expect(getAllTodos({model})).toEqual([])
})

test("should model is not empty, should return correct results", async () => {
  const model: TodoModel = {
    getAllTodos: () => {
      return [
        {
          id: 1,
          content: "todo 1",
          completed: false
        }
      ]
    }
  }

  expect(getAllTodos({model})).toEqual([{
    id: 1,
    content: "todo 1",
    completed: false
  }])
})

test("should give the first page", async () => {
  const model: TodoModel = {
    getAllTodos: ({pageIndex, pageSize}) => {
      let data = [
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

      if (pageIndex && pageSize) {
        data = data.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
      }

      return data
    }
  }

  expect(getAllTodos({model, pageIndex: 1, pageSize: 2})).toEqual([{
    id: 1,
    content: "todo 1",
    completed: false
  }, {
    id: 2,
    content: "todo 2",
    completed: true
  }])
})

test("should give the second page", async () => {
  const model: TodoModel = {
    getAllTodos: ({pageIndex, pageSize}) => {
      let data = [
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

      if (pageIndex && pageSize) {
        data = data.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
      }

      return data
    }
  }

  expect(getAllTodos({model, pageIndex: 2, pageSize: 2})).toEqual([{
    id: 3,
    content: "todo 3",
    completed: false
  }])
})