import fs from "fs";
import path from "path";

import deleteLink from "@/db/deleteLink";
import { response } from "@/utils/response";

export async function DELETE(req: Request) {
	try {
		const id = new URL(req.url).searchParams.get("id") || "";
		await deleteLink(id);
		fs.unlinkSync(
			path.join(process.cwd(), "/public/screenshots/", `${id}.jpg`)
		);

		return new Response(response(true, "Successfully deleted link"));
	} catch (e) {
		return new Response(
			response(false, "There was a problem while deleting the link", e)
		);
	}
}
