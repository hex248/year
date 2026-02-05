import { createCanvas } from "@napi-rs/canvas";
import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => c.text("go to /width/height to get a placeholder image"));

app.get("/:width/:height", async (c) => {
	const width = Number.parseInt(c.req.param("width"), 10);
	const height = Number.parseInt(c.req.param("height"), 10);
	const canvas = createCanvas(width, height);
	const ctx = canvas.getContext("2d");

	ctx.fillStyle = "#ded6c4";
	ctx.fillRect(0, 0, width, height);

	const buffer = new Uint8Array(canvas.toBuffer("image/png"));

	return c.body(buffer, 200, { "Content-Type": "image/png" });
});

export default app;
