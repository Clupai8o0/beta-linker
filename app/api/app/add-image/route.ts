import { handleError, handleSuccess } from "@/lib/api";
import { supabase } from "@/lib/supabase";
import chromium from "chrome-aws-lambda";
import { NextRequest } from "next/server";
import playwright from "playwright-core";
import { decode } from "base64-arraybuffer";

export async function POST(req: NextRequest) {
	try {
		const browser = await playwright.chromium.launch({
			args: [...chromium.args, "--font-render-hinting=none", "--hide-scrollbars"], // This way fix rendering issues with specific fonts
			executablePath: await chromium.executablePath,
			// process.env.NODE_ENV === "production"
			// 	? await chromium.executablePath
			// 	: "/chrome/win64-123.0.6312.58",

			// headless:
			// 	process.env.NODE_ENV === "production" ? chromium.headless : true,
			headless: true
		});

		const context = await browser.newContext();

		const page = await context.newPage();
		console.log("page created")

		await page.setViewportSize({ width: 1280, height: 720 })
		await page.goto("https://github.com/", {
			waitUntil: "load",
		});

		const buffer = await page.screenshot({
			type: "jpeg",
			quality: 70
		})
		const file = buffer.toString("base64")

		const { data, error } = await supabase.storage.from("links").upload(`public/test.jpg`, decode(file), {
			contentType: "image/jpg"
		})

		//! incase
		console.log(data, error)

		await browser.close();

		return handleSuccess("Successfully created image", data?.path || "")
	} catch (e) {
		return handleError("Could not create image", e)
	}
}
