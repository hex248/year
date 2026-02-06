/** biome-ignore-all assist/source/organizeImports: <> */
import { createCanvas, loadImage, type Image } from "@napi-rs/canvas";
import { Hono } from "hono";
import { readFileSync } from "node:fs";

let emptyDay: Image;
let currentDay: Image;
let pastDay: Image;
let lockScreen: Image;
(async () => {
	emptyDay = await loadImage(readFileSync("./src/assets/empty-day.png"));
	currentDay = await loadImage(readFileSync("./src/assets/current-day.png"));
	pastDay = await loadImage(readFileSync("./src/assets/past-day.png"));
	lockScreen = await loadImage(readFileSync("./src/assets/lock-screen.png"));
})();

const app = new Hono();

app.get("/", async (c) => {
	const width = 1080;
	const height = 2342;
	const canvas = createCanvas(width, height);
	const ctx = canvas.getContext("2d");

	ctx.fillStyle = "#ded6c4";
	ctx.fillRect(0, 0, width, height);

	const now = new Date();
	const start = new Date(now.getFullYear(), 0, 0);
	const diff = now.getTime() - start.getTime();
	const oneDay = 1000 * 60 * 60 * 24;
	const today = Math.floor(diff / oneDay) - 1;

	const columns = 16;
	const size = 40;
	const padx = 70;
	const pady = 550;
	const gap = 20;
	let x = padx;
	let y = pady;
	for (let i = 0; i < 365; i++) {
		if (i % columns === 0) {
			x = padx;
			y += size + gap;
		}

		if (today > i) ctx.drawImage(pastDay, x, y);
		else if (today === i) ctx.drawImage(currentDay, x, y);
		else ctx.drawImage(emptyDay, x, y);

		x += size + gap;
	}

	// opacity 0.3 lock screen for reference
	// ctx.globalAlpha = 0.3;
	// ctx.drawImage(lockScreen, 0, 0, width, height);

	const buffer = new Uint8Array(canvas.toBuffer("image/png"));

	return c.body(buffer, 200, { "Content-Type": "image/png" });
});

export default {
	fetch: app.fetch,
	port: 7345,
};
