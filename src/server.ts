#!/root/.bun/bin/bun
import app from "./index.ts";

Bun.serve({
  fetch: app.fetch,
  port: app.port,
});
