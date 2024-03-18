import puppeteer from "puppeteer";
import { handleSuccess, handleError } from "@/lib/api";
import { v4 as generateKey } from "uuid";
import { decode } from "base64-arraybuffer";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
	const { website_url } = await req.json();

	try {
		// opening a browser
		const browser = await puppeteer.launch({
			headless: true,
		});
		const page = await browser.newPage();
		await page.setViewport({ width: 1280, height: 720 });
		await page.goto(website_url, { waitUntil: "networkidle0" });

		// Generating screenshot
		const key = generateKey();
		const file = await page.screenshot({
			encoding: "base64",
			optimizeForSpeed: false,
			quality: 70,
			type: "jpeg",
		});
		//todo: go thru supabase security

		//* saving to bucket

		const { data } = await supabase.storage
			.from("links")
			.upload(`public/0123.jpg`, decode(file), {
				contentType: "image/jpg",
			});

		await browser.close();
		return handleSuccess("Successfully created image", data?.path || "");
	} catch (e) {
		return handleError("Could not create image", e);
	}
}
