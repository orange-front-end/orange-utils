import { Hono } from "hono"
import { getAllTodos } from "./get-all-todos"
import type { TodoModel } from "./interface"

export const todos = new Hono()

todos
  .get("/", (c) => {
    let { pageIndex, pageSize } = c.req.query()

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

    return c.json(
      getAllTodos({
        model,
        pageIndex: pageIndex ? Number(pageIndex) : undefined,
        pageSize: pageSize ? Number(pageSize) : undefined
      })
    )
  })