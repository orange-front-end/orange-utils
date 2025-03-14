import { Hono } from "hono"
import { todos } from "./todos/router"

export const app = new Hono()

const api = app.basePath("/api")

api.get("/ping", (c) => c.text("pong"))

api.route("/todos", todos)