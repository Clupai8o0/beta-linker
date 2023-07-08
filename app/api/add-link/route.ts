import puppeteer from "puppeteer";
import { v4 as generateKey } from "uuid";

import addLink from "@/db/addLink";
import { response } from "@/utils/response";

export async function POST(req: Request) {
	const { name, github_url, website_url, desc, tags } = await req.json();

	try {
		// opening a browser
		const browser = await puppeteer.launch({
			headless: "new",
		});
		const page = await browser.newPage();
		await page.setViewport({ width: 1280, height: 720 });
		await page.goto(website_url, { waitUntil: "networkidle0" });

		// Generating screenshot
		const key = generateKey();
		await page.screenshot({
			path: `public/screenshots/${key}.jpg`,
		});
		await browser.close();

		// Adding link
		await addLink(
			key,
			name,
			desc,
			tags.join(" "),
			github_url,
			website_url,
			`/${key}.jpg`
		);

		return new Response(response(true, "Successfully added link and image"))
	} catch (e) {
		console.error(e);
		return new Response(response(false, "Could not add link or image", e));
	}
}
