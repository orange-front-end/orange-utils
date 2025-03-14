import { app } from "./app"

const serve = Bun.serve({
  port: process.env.PORT || 3000,
  fetch: app.fetch
})

console.log(`🚀 Listening on localhost:${serve.port} 🎉`)