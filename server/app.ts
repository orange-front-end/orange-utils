import { Hono } from "hono"
import { todos } from "./todos/router"
import { logger } from "hono/logger"

export const app = new Hono()

app.use(logger())

app.onError((err, c) => {
  if (err instanceof Error) {
    return c.json({
      message: err.message,
    }, 400)
  }
  return c.json({
    message: "Internal Server Error",
  }, 500)
})

const api = app.basePath("/api")

api.get("/ping", (c) => c.text("pong"))

api.route("/todos", todos)