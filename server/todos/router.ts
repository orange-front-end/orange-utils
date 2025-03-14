import { Hono } from "hono"
import { getAllTodos } from "./get-all-todos/get-all-todos"
import type { TodoModel } from "./interface"
import { model } from "./model"
import { createTodo } from "./create-todo/create-todo"

export const todos = new Hono()

todos
  .get("/", (c) => {
    let { pageIndex, pageSize } = c.req.query()

    return c.json(
      getAllTodos({
        model,
        pageIndex: pageIndex ? Number(pageIndex) : undefined,
        pageSize: pageSize ? Number(pageSize) : undefined
      })
    )
  })

  .post("/", async (c) => {
    const { content } = await c.req.json()
    return c.json(createTodo({ model, todo: { content } }))
  })